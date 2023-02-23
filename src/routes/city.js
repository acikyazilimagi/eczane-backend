const cityData = require('../../data/cities-with-districts.json')
const { auth } = require('../middleware/auth')
const CONTROLLER = require('../controllers/city')

module.exports = {
  getAllCitiesWithDistricts: {
    method: 'get',
    path: '/cityWithDistricts',
    middleware: [],
    handler: async (req, res) => {
      return res.json({
        ok: true,
        data: cityData && cityData.length ? cityData : [],
      })
    },
  },

  listCities: {
    method: 'get',
    path: '/cities',
    middleware: [],
    handler:  (req, res, next) => CONTROLLER.listCities(req, res, next),
  },

  updateCity: {
    method: 'put',
    path: '/city/:id',
    middleware: [auth],
    handler: (req, res, next) => CONTROLLER.updateCity(req, res, next),
  },
}
