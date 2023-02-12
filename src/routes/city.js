const cityData = require('../../data/city-data.json')

module.exports = {
  cityWithDistricts: {
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
}
