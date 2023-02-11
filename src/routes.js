const router = require('express').Router()
const { getAllLocations, insertLocation, updateLocation, deleteLocation, getAllTypes, insertType, updateType, deleteType } = require('./db/')
const types = require('../data/types.json')
const subtypes = require('../data/subtypes.json')
const cityData = require('../data/city-data.json')

// get all locations
router.get('/', async (req, res) => {
  const typeParam = req.query.type
  if (!typeParam) {
    return res
      .json({
        ok: false,
        message: 'Tip parametresi eksik',
        code: 400,
      })
      .status(400)
  }
  let locations = await getAllLocations()
  if (!locations) {

    return res.json({ ok: false, msg: 'Bir hata oluştu', code: 500 }).status(500);
  }

  const type = types.find((t) => t.name == typeParam)
  locations = locations.filter((l) => l.typeId == type.id)


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

router.get('/subtypes', async (req, res) => {
  return res.json({
    ok: true,
    data: subtypes && subtypes.length ? subtypes : [],
  })
})

// write public
router.post('/', async (req, res) => {
  const { location } = req.body
  if (!location) {
    return res
      .json({
        ok: false,
        message: `Eksik anahtar`,
        code: 400,
      })
  }

  location = {
    ...location,
    workingHours: location.workingHours || '',
    additionalAddressDetails: location.additionalAddressDetails || '',
  }

  const keys = Object.keys(location)
  const requiredKeys = ['name', 'code', 'latitude', 'longitude', 'phone', 'districtId', 'cityId', 'address', 'additionalAddressDetails', 'typeId', 'subTypeId']
  const missingKeys = requiredKeys.filter((k) => !keys.includes(k))
  if (missingKeys.length) {
    return res
      .json({
        ok: false,
        message: `Eksik anahtarlar: ${missingKeys.join(', ')}`,
        code: 400,
      })
      .status(400)
  }

  try {
    await insertLocation([location])
    return res.json({ ok: true })
  } catch (e) {
    return res.json({ ok: false, msg: 'Bir hata oluştu', code: 500 }).status(500)
  }
})

router.post('/location/:id', async (req, res) => {

  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return res.json({ ok: false, msg: 'Yetkiniz yok', code: 401 }).status(401)
  }
  const { id } = req.params
  const { location } = req.body
  if (!location || !id) {
    return res
      .json({
        ok: false,
        message: `Eksik Key`,
        code: 400,
      })
  }
  try {
    await updateLocation(id, location)
    return res.json({ ok: true })
  } catch (e) {
    console.log(e)
    return res.json({ ok: false, msg: 'Bir hata oluştu', code: 500 }).status(500)
  }
})

router.delete('/location/:id', async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res
      .json({
        ok: false,
        message: `Eksik Key`,
        code: 400,
      })
  }
  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return res.json({ ok: false, msg: 'Yetkiniz yok', code: 401 }).status(401)
  }

  try {
    await deleteLocation(id)
    return res.json({ ok: true })
  } catch (e) {
    console.log(e)
    return res.json({ ok: false, msg: 'Bir hata oluştu', code: 500 }).status(500)
  }
})

router.get('/types', async (req, res) => {
  try {
    let types = getAllTypes()
    return res.json({
      ok: true,
      data: types,
    })
  } catch (e) {
    console.log(e)
    return res.json({ ok: false, msg: 'Bir hata oluştu', code: 500 }).status(500)
  }
})

router.post('/types', async (req, res) => {
  try {
    if (req.headers['authorization'] !== process.env.SEED_KEY) {
      return res.json({ ok: false, msg: 'Yetkiniz yok', code: 401 }).status(401)
    }

    const { type } = req.body
    if (!type) {
      return res
        .json({
          ok: false,
          message: 'Tip parametresi eksik',
          code: 400,
        })
        .status(400)
    }

    const keys = Object.keys(type)
    const requiredKeys = ['name']
    const missingKeys = requiredKeys.filter((key) => !keys.includes(key))
    if (missingKeys.length) {
      return res
        .json({
          ok: false,
          message: `Eksik anahtarlar: ${missingKeys.join(', ')}`,
          code: 400,
        })
        .status(400)
    }

    await insertType(type)
    return res.json({ ok: true })
  } catch (e) {
    console.log(e)
    return res.json({ ok: false, msg: 'Bir hata oluştu', code: 500 }).status(500)
  }
})

router.post('/types/:id', async (req, res) => {

  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return res.json({ ok: false, msg: 'Yetkiniz yok', code: 401 }).status(401)
  }
  const { id } = req.params
  const { type } = req.body
  if (!type || !id) {
    return res
      .json({
        ok: false,
        message: `Eksik Key`,
        code: 400,
      })
  }
  try {

    await updateType(id, type)
    return res.json({ ok: true })
  } catch (e) {
    console.log(e)
    return res.json({ ok: false, msg: 'Bir hata oluştu', code: 500 }).status(500)
  }
})

router.delete('/types/:id', async (req, res) => {
  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return res.json({ ok: false, msg: 'Yetkiniz yok', code: 401 }).status(401)
  }
  const { id } = req.params
  if (!id) {
    return res
      .json({
        ok: false,
        message: `Eksik Key`,
        code: 400,
      })
  }
  try {
    await deleteType(id)
    return res.json({ ok: true })
  } catch (e) {
    console.log(e)
    return res.json({ ok: false, msg: 'Bir hata oluştu', code: 500 }).status(500)
  }
})

router.get('/health', (req, res) => {
  res.status(200).send()
})

exports.router = router
