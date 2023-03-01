const { updateCity, listCities } = require('../db')

module.exports = {
  updateCity: async (req, res) => {
    const { id } = req.params
    const city = req.body
    const updated = await updateCity(id, city)
    return res.status(200).json({ data: updated })
  },

  listCities: async (_, res) => {
    const cities = await listCities()
    return res.status(200).json({ data: cities })
  },
}
