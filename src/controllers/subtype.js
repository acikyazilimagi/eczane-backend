const { getAllSubtypes } = require('../db')

module.exports = {
  getAllSubtypes: async (req, res, next) => {
    const subtypes = await getAllSubtypes()
    return res.status(200).json({ data: subtypes })
  },

  postLocation: async (req, res, next) => {
    // const location = req.body
    res.data = 'mock'
    next()
  },

  updateLocation: async (req, res, next) => {
    // const { id } = req.params
    // const location = req.body
    res.data = 'mock'
    next()
  },

  deleteLocation: async (req, res, next) => {
    // const { id } = req.params
    res.data = 'mock'
    next()
  },
}
