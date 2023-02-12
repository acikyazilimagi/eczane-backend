const router = require('express').Router()
const {
  getAllLocations,
  insertLocation,
  updateLocation,
  deleteLocation,
  getAllTypes,
  insertType,
  updateType,
  deleteType,
  getAllSubtypes,
  insertSubtype,
  updateSubtype,
  deleteSubtype,
} = require('./db/')
const { validateData } = require('./db/validation/')
const types = require('../data/types.json')
const subtypes = require('../data/subtypes.json')
const cityData = require('../data/city-data.json')
const { locationValidationSchema, typeValidationSchema, subTypeValidationSchema } = require('./db/validation/validationSchemas')

// get all locations
router.get('/', async (req, res) => {
  const typeParam = req.query.type

  let locations = await getAllLocations()

  if (!locations) {
    return res.json({ ok: false, msg: 'Bir hata oluştu', code: 500 }).status(500)
  }

  if (typeParam) {
    const type = types.find((t) => t.name == typeParam)
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
    return res.json({
      ok: false,
      message: `Eksik anahtar`,
      code: 400,
    })
  }

  const locationData = {
    ...location,
    workingHours: location.workingHours || '',
    additionalAddressDetails: location.additionalAddressDetails || '',
  }

  try {
    validateData(locationData, locationValidationSchema)
  } catch (e) {
    return res.status(400).json({
      ok: false,
      message: e.message,
      code: 400,
    })
  }

  try {
    await insertLocation(locationData)
    return res.json({ ok: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ ok: false, msg: 'Bir hata oluştu', code: 500 })
  }
})

router.post('/location/:id', async (req, res) => {
  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return res.status(401).json({ ok: false, msg: 'Yetkiniz yok', code: 401 })
  }
  const { id } = req.params
  const { location } = req.body
  if (!location || !id) {
    return res.json({
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
    return res.status(500).json({ ok: false, msg: 'Bir hata oluştu', code: 500 })
  }
})

router.delete('/location/:id', async (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.json({
      ok: false,
      message: `Eksik Key`,
      code: 400,
    })
  }
  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return res.status(401).json({ ok: false, msg: 'Yetkiniz yok', code: 401 })
  }

  try {
    await deleteLocation(id)
    return res.json({ ok: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ ok: false, msg: 'Bir hata oluştu', code: 500 })
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
    return res.status(500).json({ ok: false, msg: 'Bir hata oluştu', code: 500 })
  }
})

router.post('/types', async (req, res) => {
  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return res.status(401).json({ ok: false, msg: 'Yetkiniz yok', code: 401 })
  }

  const { type } = req.body

  try {
    validateData(type, typeValidationSchema)
  } catch (e) {
    return res.status(400).json({
      ok: false,
      message: e.message,
      code: 400,
    })
  }

  try {
    await insertType(type)
    return res.json({ ok: true })
  } catch (err) {
    return res.status(400).json({
      ok: false,
      message: 'Bir hata oluştu',
      code: 400,
    })
  }
})

router.post('/types/:id', async (req, res) => {
  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return res.json({ ok: false, msg: 'Yetkiniz yok', code: 401 }).status(401)
  }
  const { id } = req.params
  const { type } = req.body
  if (!type || !id) {
    return res.json({
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
    return res.status(500).json({ ok: false, msg: 'Bir hata oluştu', code: 500 })
  }
})

router.delete('/types/:id', async (req, res) => {
  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return res.json({ ok: false, msg: 'Yetkiniz yok', code: 401 }).status(401)
  }
  const { id } = req.params
  if (!id) {
    return res.json({
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
    return res.status(500).json({ ok: false, msg: 'Bir hata oluştu', code: 500 })
  }
})

//----------------------------------------------------------------

router.get('/subtypes', async (req, res) => {
  try {
    let types = getAllSubtypes()
    return res.json({
      ok: true,
      data: types,
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ ok: false, msg: 'Bir hata oluştu', code: 500 })
  }
})

router.post('/subtypes', async (req, res) => {
  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return res.status(401).json({ ok: false, msg: 'Yetkiniz yok', code: 401 })
  }

  const { subType } = req.body

  try {
    validateData(subType, subTypeValidationSchema)
  } catch (e) {
    return res.status(400).json({
      ok: false,
      message: e.message,
      code: 400,
    })
  }

  try {
    await insertSubtype(subType)
    return res.json({ ok: true })
  } catch (err) {
    return res.status(400).json({
      ok: false,
      message: 'Bir hata oluştu',
      code: 400,
    })
  }
})

router.post('/subtypes/:id', async (req, res) => {
  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return res.json({ ok: false, msg: 'Yetkiniz yok', code: 401 }).status(401)
  }

  const { id } = req.params
  const { subtype } = req.body
  if (!subtype || !id) {
    return res.json({
      ok: false,
      message: `Eksik Key`,
      code: 400,
    })
  }
  try {
    await updateSubtype(id, subtype)
    return res.json({ ok: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ ok: false, msg: 'Bir hata oluştu', code: 500 })
  }
})

router.delete('/subtypes/:id', async (req, res) => {
  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return res.json({ ok: false, msg: 'Yetkiniz yok', code: 401 }).status(401)
  }
  const { id } = req.params
  if (!id) {
    return res.json({
      ok: false,
      message: `Eksik Key`,
      code: 400,
    })
  }
  try {
    await deleteSubtype(id)
    return res.json({ ok: true })
  } catch (e) {
    console.log(e)
    return res.status(500).json({ ok: false, msg: 'Bir hata oluştu', code: 500 })
  }
})

router.get('/health', (req, res) => {
  res.status(200).send()
})

exports.router = router
