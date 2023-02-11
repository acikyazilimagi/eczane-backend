const request = require('supertest')
const { app } = require('../../src/app')
const sinon = require('sinon')
const queries = require('../../src/db')
const faker = require('@faker-js/faker')

const location = {
  name: 'Location 2',
  typeId: 2,
  subTypeId: 2,
  cityId: 2,
  districtId: 2,
  latitude: 2.0,
  longitude: 2.0,
  phone: '1234567890',
  address: '123 Main St',
  additionalAddressDetails: '',
  workingHours: '',
  code: 'LOC2',
}

describe('/', () => {
  beforeAll(() => {
    sinon.stub(queries, 'getAllLocations').resolves([{}, {}, {}])
    sinon.stub(queries, 'insertLocation').resolves({})
  })
  afterAll(() => {
    // app.close()
    // done()
  })

  it('should get all data', async () => {
    const response = await request(app).get('/api').expect(200)
  })

  it('should get all data with queries', async () => {
    const response = await request(app).get('/api?limit=5&offset=5').expect(200)
  })
})

describe('cityWithDistricts', () => {
  it('should get all data', async () => {
    const { body } = await request(app).get('/api/cityWithDistricts').expect(200)

    expect(typeof body).toBe('object') && expect(Array.isArray(body.data)).toBe(true)
  })
})

describe('types', () => {
  it('should get all data', async () => {
    const { body } = await request(app).get('/api/types').expect(200)

    expect(typeof body).toBe('object') && expect(Array.isArray(body.data)).toBe(true)
  })
})

describe('subtypes', () => {
  it('should get all data', async () => {
    const { body } = await request(app).get('/api/subtypes').expect(200)

    expect(typeof body).toBe('object') && expect(Array.isArray(body.data)).toBe(true)
  })
})

describe('insert', () => {
  it('should insert data', async () => {
    const { body } = await request(app).post('/api').send({ location }).expect(200)

    expect(typeof body).toBe('object') && expect(body.ok).toBe(true)
  })

  it('missing fields', async () => {
    const results = Object.keys(location).map((key) => {
      // remove this key from a temp obj location
      const tempLocation = { ...location }
      delete tempLocation[key]

      return request(app).post('/api').send({ location: tempLocation }).expect(400)
    })
  })
})

describe('update', () => {
  it('should send unauthorized', async () => {
    const { body } = await request(app).post('/api/location/1').send({ location }).expect(401)

    console.log(body)

    expect(typeof body).toBe('object') && expect(body.ok).toBe(true)
  })
})
