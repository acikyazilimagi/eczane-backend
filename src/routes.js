const router = require('express').Router()
const { getAll, write, seed } = require('./db/')

const locations = require('../data/locations.json')
const types = require('../data/types.json')
const cityData = require('../data/city-data.json')
const { turkishToEnglish } = require('../lib/language')

router.get('/', async (req, res) => {
  const typeParam = req.query.type

  let locationData = locations && locations.length ? locations : []

  if (typeParam) {
    const type = types.find((t) => t.name == typeParam)

    if (type === undefined) {
      return res.json({
        ok: false,
        message: 'Geçersiz tip',
        code: 400,
      })
    }

    locationData = locationData.filter((l) => l.typeId == type.id)
  }

  return res.json({
    ok: true,
    data: locationData,
  })
})

router.get('/cityWithDistricts', async (req, res) => {
  return res.json({
    ok: true,
    data: cityData && cityData.length ? cityData : [],
  })
})

// write public
router.post('/', async (req, res) => {
  let { location } = req.body
  const { districtId, cityId, name } = location

  // validate that all keys exist
  location = {
    ...location,
    workingHours: location.workingHours || '',
    additionalAddressDetails: location.additionalAddressDetails || '',
  }
  const keys = Object.keys(location)
  const requiredKeys = ['name', 'code', 'latitude', 'longitude', 'phone', 'districtId', 'cityId', 'address', 'additionalAddressDetails', 'workingHours', 'typeId', 'subTypeId']
  const missingKeys = requiredKeys.filter((k) => !keys.includes(k))
  if (missingKeys.length) {
    return res.json({
      ok: false,
      message: `Eksik anahtarlar: ${missingKeys.join(', ')}`,
      code: 400,
    })
  }

  // check for duplicates
  if (
    locations.some((l) => l.cityId == cityId && l.districtId == districtId && turkishToEnglish(name).toLowerCase().split(' ').join('') == turkishToEnglish(l.name).toLowerCase().split(' ').join(''))
  ) {
    return res.json({
      ok: true,
      message: 'Adres mevcut',
      code: 409,
    })
  }

  try {
    // add to local
    locations.push(location)

    // add to db - no wait
    write([location])
    return res.json({ ok: true })
  } catch (e) {
    return res.json({ ok: false, msg: 'Bir hata oluştu', code: 500 })
  }
})

router.get('/seed', async (req, res) => {
  try {
    if (req.query.key == process.env.SEED_KEY) {
      await seed.cityData()
      await seed.typeData()
      await seed.locationData()
      return res.json({ ok: true })
    } else {
      return res.json({ ok: false, msg: 'İzniniz bulunmamaktadır.', code: 401 })
    }
  } catch (e) {
    return res.json({ ok: false, msg: 'Bir hata oluştu', code: 500 })
  }
})

router.get('/health', (req, res) => {
  res.status(200).send()
})

exports.router = router
