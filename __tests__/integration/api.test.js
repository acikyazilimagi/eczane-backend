const request = require('supertest')
const { deleteAllLocations } = require('../../src/db/queries')
const app = require('../../src/app')
const server = app.express

const API_END_POINT = '/api'

describe('API tests', () => {
  afterAll(() => {})

  describe('Health API', () => {
    it('health responds with 200', async () => {
      const res = await request(server).get(`${API_END_POINT}/health`)
      expect(res.statusCode).toBe(200)
    })
  })

  describe('citites API', () => {
    it('should return all cities with their districts', async () => {
      const { statusCode, body } = await request(server).get(`${API_END_POINT}/cityWithDistricts`)

      expect(statusCode).toBe(200)
      expect(body.ok).toBe(true)
      expect(body.data[0].id).toBe(1)
      expect(body.data[0].key).toBe('Adana')
      expect(body.data[0].districts.length).toBe(15)
    })

    it('should return all active cities', async () => {
      const { statusCode, body } = await request(server).get(`${API_END_POINT}/cities`)

      expect(statusCode).toBe(200)
      expect(body.data[0].id).toBeDefined()
      expect(typeof body.data[0].name).toBe('string')
      expect(typeof body.data[0].isActive).toBe('boolean')
    })

    it('should update the name property of a city and take it back', async () => {
      // get a city from /cities
      const { statusCode, body } = await request(server).get(`${API_END_POINT}/cities`)

      const city = body.data[0]
      const newCity = {
        ...city,
        name: 'New City Name',
        isActive: city.isActive,
      }

      // delete the id field
      delete newCity.id

      // update the city
      const { statusCode: updateStatusCode } = await request(server).put(`${API_END_POINT}/city/${city.id}`).send(newCity)
      expect(updateStatusCode).toBe(200)

      // get the city again
      const { statusCode: getStatusCode, body: getBody } = await request(server).get(`${API_END_POINT}/cities`)
      expect(getStatusCode).toBe(200)

      // check if the city is updated
      const updatedCity = getBody.data.find((c) => c.id === city.id)

      expect(updatedCity.name).toBe(newCity.name)
      expect(updatedCity.isActive).toBe(city.isActive)

      // take the city back
      const { statusCode: takeBackStatusCode } = await request(server).put(`${API_END_POINT}/city${city.id}`).send(city)
      expect(takeBackStatusCode).toBe(200)
    })

    it('should update the isActive property of a city and take it back', async () => {
      // get a city from /cities
      const { statusCode, body } = await request(server).get(`${API_END_POINT}/cities`)

      const city = body.data[0]
      const newCity = {
        ...city,
        name: city.name,
        isActive: !city.isActive,
      }

      // delete the id field
      delete newCity.id

      // update the city
      const { statusCode: updateStatusCode } = await request(server).put(`${API_END_POINT}/city/${city.id}`).send(newCity)
      expect(updateStatusCode).toBe(200)

      // get the city again
      const { statusCode: getStatusCode, body: getBody } = await request(server).get(`${API_END_POINT}/cities`)

      // make sure the city does not exist here
      const updatedCity = getBody.data.find((c) => c.id === city.id)
      expect(updatedCity).toBeUndefined()

      // take the city back
      const { statusCode: takeBackStatusCode } = await request(server).put(`${API_END_POINT}/city/${city.id}`).send(city)
      expect(takeBackStatusCode).toBe(200)

      // make sure the city now exists in get
      const { statusCode: getStatusCode2, body: getBody2 } = await request(server).get(`${API_END_POINT}/cities`)
      expect(getStatusCode2).toBe(200)

      // filter the city
      const updatedCity2 = getBody2.data.find((c) => c.id === city.id)
      expect(updatedCity2).toBeDefined()
    })
  })

  describe('types API', () => {
    it('should return all types', async () => {
      const { body } = await request(server).get(`${API_END_POINT}/types`)

      expect(body.data[0].id).toBe(1)
      expect(body.data[0].name).toBe('Hastane')
    })
  })

  describe('subtypes API', () => {
    it('should return all types', async () => {
      const { body } = await request(server).get(`${API_END_POINT}/subtypes`)

      expect(body.data[0].id).toBe(2)
      expect(body.data[0].typeId).toBe(1)
      expect(body.data[0].name).toBe('Genel')
    })
  })

  describe('locations API', () => {
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
      isValidated: true,
    }

    beforeAll(async () => {
      await deleteAllLocations()
    })

    afterAll(async () => {
      await deleteAllLocations()
    })

    it('should be able to insert a location', async () => {
      const { statusCode } = await request(server).post(`${API_END_POINT}/location`).send(location)
      expect(statusCode).toBe(201)
    })

    it('should be able to delete a location', async () => {
      const { statusCode, body } = await request(server).post(`${API_END_POINT}/location`).send(location)
      expect(statusCode).toBe(201)

      const deletedRecord = await request(server).delete(`${API_END_POINT}/location/${body.data.id}`)
      expect(deletedRecord.statusCode).toBe(200)
    })

    it('should list only validated locations', async () => {
      const { statusCode, body } = await request(server).post(`${API_END_POINT}/location`).send(location)
      expect(statusCode).toBe(201)

      const all = await request(server).get(`${API_END_POINT}/locations`)

      // Check all.data has newly created location
      expect(all.statusCode).toBe(200)
      expect(all.body.data.length).toBeGreaterThan(0)
      expect(all.body.data.some((loc) => loc.id === body.data.id)).toBe(true)
    })

    it('should NOT list unvalidated locations', async () => {
      var unvalidatedLocation = location
      unvalidatedLocation.isValidated = false
      const { statusCode, body } = await request(server).post(`${API_END_POINT}/location`).send(unvalidatedLocation)

      expect(statusCode).toBe(201)

      const all = await request(server).get(`${API_END_POINT}/locations`)

      expect(all.statusCode).toBe(200)
      expect(all.body.data.length).toBeGreaterThan(0)
      expect(all.body.data.some((loc) => loc.id === body.data.id)).toBe(false)
    })

    it('Admin should be able to list unvalidated locations', async () => {
      var unvalidatedLocation = location
      unvalidatedLocation.isValidated = false
      const { statusCode, body } = await request(server).post(`${API_END_POINT}/location`).send(unvalidatedLocation)

      expect(statusCode).toBe(201)

      const all = await request(server).get(`${API_END_POINT}/locations/admin`)

      expect(all.statusCode).toBe(200)
      expect(all.body.data.length).toBeGreaterThan(0)
      expect(all.body.data.some((loc) => loc.id === body.data.id)).toBe(true)
    })

    it('should be able to update a location', async () => {
      const { statusCode, body } = await request(server).post(`${API_END_POINT}/location`).send(location)

      expect(statusCode).toBe(201)

      const updatedLocation = {
        name: 'Updated Location',
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
        isValidated: true,
      }

      const updatedRecord = await request(server).put(`${API_END_POINT}/location/${body.data.id}`).send(updatedLocation)

      expect(updatedRecord.statusCode).toBe(200)

      const updatedLocationFromDb = await request(server).get(`${API_END_POINT}/location/${body.data.id}`)

      expect(updatedLocationFromDb.statusCode).toBe(200)
      expect(updatedLocationFromDb.body.data.name).toBe(updatedLocation.name)
    })

    it('should allow additional JSON data to be added to a location', async () => {
      const additional = {
        ...location,
        additional_data: {
          foo: 'bar',
          baz: 'qux',
          list: [1, 2, 3],
        },
      }

      const { statusCode, body } = await request(server).post(`${API_END_POINT}/location`).send(additional)

      expect(statusCode).toBe(201)
      expect(body.data.id).toBeGreaterThan(0)
      expect(body.data.additional_data.foo).toBe(additional.additional_data.foo)
      expect(body.data.additional_data.baz).toBe(additional.additional_data.baz)
      expect(body.data.additional_data.list).toEqual(additional.additional_data.list)
    })

    it('should not allow to SQL injection', async () => {
      const { statusCode, body } = await request(server).post(`${API_END_POINT}/location`).send(location)

      expect(statusCode).toBe(201)
      expect(body.data.id).toBeGreaterThan(0)

      const injectionRequest = await request(server).delete(`${API_END_POINT}/location/${body.data.id}; DROP TABLE locations;`)

      expect(injectionRequest.statusCode).toBe(500)
    })
  })
})
