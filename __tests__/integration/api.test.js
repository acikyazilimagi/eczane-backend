const request = require('supertest');
const app = require('../../src/app');
const server = app.express;

const API_END_POINT = '/api';

describe('Health API', () => {
  it('health responds with 200', async () => {
    const res = await request(server).get(`${API_END_POINT}/health`)
    expect(res.statusCode).toBe(200)
  });
});

describe('cityWithDistricts API', () => {
  it('should return all cities with their districts', async () => {
    const { statusCode, body } = await request(server).get(`${API_END_POINT}/cityWithDistricts`)

    expect(statusCode).toBe(200)
    expect(body.ok).toBe(true)
    expect(body.data[0].id).toBe(1)
    expect(body.data[0].key).toBe("Adana")
    expect(body.data[0].districts.length).toBe(15)
  })
});

describe('types API', () => {
  it('should return all types', async () => {
    const { body } = await request(server).get(`${API_END_POINT}/types`)

    expect(body.data[0].id).toBe(1)
    expect(body.data[0].name).toBe("Hastane")
  })
});

describe('subtypes API', () => {
  it('should return all types', async () => {
    const { body } = await request(server).get(`${API_END_POINT}/subtypes`)

    expect(body.data[0].id).toBe(1)
    expect(body.data[0].typeId).toBe(1)
    expect(body.data[0].name).toBe("Acil")
  })
});

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
  }


  it('should be able to insert a location', async () => {
    const { statusCode } = await request(server).post(`${API_END_POINT}/location`)
      .send(location)

    expect(statusCode).toBe(201)
  });

  it('should be able to delete a location', async () => {
    const { statusCode, body } = await request(server).post(`${API_END_POINT}/location`)
      .send(location)

    expect(statusCode).toBe(201)

    const deletedRecord = await request(server).delete(`${API_END_POINT}/location/${body.data.id}`)

    expect(deletedRecord.statusCode).toBe(200)
  });
});