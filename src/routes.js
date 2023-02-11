const router = require('express').Router()
const { getAllLocations, insertLocation, updateLocation, deleteLocation, getAllTypes, insertType, updateType, deleteType } = require('./db/')
const types = require('../data/types.json')
const subtypes = require('../data/subtypes.json')
const cityData = require('../data/city-data.json')
const response = new (require("../lib/Response"))();

// get all locations
router.get('/', async (req, res) => {
  const typeParam = req.query.type

  let locations = await getAllLocations()

  if (typeParam) {
    const type = types.find((t) => t.name == typeParam)

    if (type === undefined) {
      return response.error(res, 400, "Geçersiz tip");
    }

    locations = locations.filter((l) => l.typeId == type.id)
  }

  return response.success(res, locations.map((l) => {
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
  }));
})

router.get('/cityWithDistricts', async (req, res) => {
  return response.success(res, cityData && cityData.length ? cityData : []);
})

router.get('/subtypes', async (req, res) => {
  return response.success(res, subtypes && subtypes.length ? subtypes : []);
})

// write public
router.post('/', async (req, res) => {
  let { location } = req.body

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
    return response.error(res, 400, `Eksik anahtarlar: ${missingKeys.join(', ')}`);
  }

  try {
    await insertLocation([location])
    return res.json({ ok: true })
  } catch (e) {
    return response.error(res, 500, 'Bir hata oluştu');
  }
})

router.post('/location/:id', async (req, res) => {
  const { id } = req.params
  const { location } = req.body

  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return response.error(res, 401, 'Yetkiniz yok');
  }

  try {
    await updateLocation(id, location)
    return res.json({ ok: true })
  } catch (e) {
    console.log(e)
    return response.error(res, 500, 'Bir hata oluştu');
  }
})

router.delete('/location/:id', async (req, res) => {
  const { id } = req.params

  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return response.error(res, 401, 'Yetkiniz yok');
  }

  try {
    await deleteLocation(id)
    return res.json({ ok: true })
  } catch (e) {
    console.log(e)
    return response.error(res, 500, 'Bir hata oluştu');
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
    return response.error(res, 500, 'Bir hata oluştu');
  }
})

router.post('/types', async (req, res) => {
  try {
    if (req.headers['authorization'] !== process.env.SEED_KEY) {
      return response.error(res, 401, 'Yetkiniz yok');
    }

    let { type } = req.body

    const keys = Object.keys(type)
    const requiredKeys = ['name']
    const missingKeys = requiredKeys.filter((key) => !keys.includes(key))
    if (missingKeys.length) {
      return response.error(res, 400, `Eksik anahtarlar: ${missingKeys.join(', ')}`);
    }

    await insertType(type)
    return res.json({ ok: true })
  } catch (e) {
    console.log(e)
    return response.error(res, 500, 'Bir hata oluştu');
  }
})

router.post('/types/:id', async (req, res) => {
  try {
    if (req.headers['authorization'] !== process.env.SEED_KEY) {
      return response.error(res, 401, 'Yetkiniz yok');
    }

    let { id } = req.params
    let { type } = req.body

    await updateType(id, type)
    return res.json({ ok: true })
  } catch (e) {
    console.log(e)
    return response.error(res, 500, 'Bir hata oluştu');
  }
})

router.delete('/types/:id', async (req, res) => {
  try {
    if (req.headers['authorization'] !== process.env.SEED_KEY) {
      return response.error(res, 401, 'Yetkiniz yok');
    }

    let { id } = req.params

    await deleteType(id)
    return res.json({ ok: true })
  } catch (e) {
    console.log(e)
    return response.error(res, 500, 'Bir hata oluştu');
  }
})

router.get('/health', (req, res) => {
  res.status(200).send()
})

exports.router = router
