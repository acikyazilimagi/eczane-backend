const { updateCity } = require('../db')

module.exports = {
  updateCity: async (req, res) => {
    const { id } =  req.params
    const city = req.body
    const updated = await updateCity(id, city)
    return res.status(200).json({ data: updated })
  },
}
