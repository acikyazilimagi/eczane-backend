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