const router = require('express').Router()
const { getAllLocations, insertLocation, updateLocation } = require('./db/')
const types = require('../data/types.json')
const subtypes = require('../data/subtypes.json')
const cityData = require('../data/city-data.json')
const { deleteLocation } = require('./db/queries')

// get all locations
router.get('/', async (req, res) => {
  const typeParam = req.query.type

  let locations = await getAllLocations()

  if (typeParam) {
    const type = types.find((t) => t.name == typeParam)

    if (type === undefined) {
      return res.json({
        ok: false,
        message: 'Geçersiz tip',
        code: 400,
      })
    }

    locations = locations.filter((l) => l.typeId == type.id)
  }

  return res.json({
    ok: true,
    data: locations.map((l) => {
      const type = types.find((t) => t.id == l.typeId)
      const subType = subtypes.find((t) => t.id == l.subTypeId)
      const city = cityData.find((c) => c.id == l.cityId)
      const district = city ? city.districts.find((d) => d.id == l.districtId) : null
      return {
        ...l,
        type: type ? type.name : '',
        subType: subType ? subType.name : '',
        city: city ? city.key : '',
        district: district ? district.key : '',
      }
    }),
  })
})

router.get('/cityWithDistricts', async (req, res) => {
  return res.json({
    ok: true,
    data: cityData && cityData.length ? cityData : [],
  })
})

router.get('/types', async (req, res) => {
  return res.json({
    ok: true,
    data: types && types.length ? types : [],
  })
})

router.get('/subtypes', async (req, res) => {
  return res.json({
    ok: true,
    data: subtypes && subtypes.length ? subtypes : [],
  })
})

// write public
router.post('/', async (req, res) => {
  let { location } = req.body
  const { districtId, cityId, name } = location

  // validate all keys exist
  location = {
    ...location,
    workingHours: location.workingHours || '',
    additionalAddressDetails: location.additionalAddressDetails || '',
  }

  const keys = Object.keys(location)
  const requiredKeys = ['name', 'code', 'latitude', 'longitude', 'phone', 'districtId', 'cityId', 'address', 'additionalAddressDetails', 'typeId', 'subTypeId']
  const missingKeys = requiredKeys.filter((k) => !keys.includes(k))
  if (missingKeys.length) {
    return res.json({
      ok: false,
      message: `Eksik anahtarlar: ${missingKeys.join(', ')}`,
      code: 400,
    })
  }

  try {
    await insertLocation([location])
    return res.json({ ok: true })
  } catch (e) {
    return res.json({ ok: false, msg: 'Bir hata oluştu', code: 500 })
  }
})

router.post('/location/:id', async (req, res) => {
  const { id } = req.params
  const { location } = req.body

  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return res.json({ ok: false, msg: 'Yetkiniz yok', code: 401 })
  }

  try {
    await updateLocation(id, location)
    return res.json({ ok: true })
  } catch (e) {
    console.log(e)
    return res.json({ ok: false, msg: 'Bir hata oluştu', code: 500 })
  }
})

router.delete('/location/:id', async (req, res) => {
  const { id } = req.params
  
  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return res.json({ ok: false, msg: 'Yetkiniz yok', code: 401 })
  }

  try {
    await deleteLocation(id);
    return res.json({ ok: true })
  } catch (e) {
    console.log(e)
    return res.json({ ok: false, msg: 'Bir hata oluştu', code: 500 })
  }
})

router.get('/health', (req, res) => {
  res.status(200).send()
})

exports.router = router
