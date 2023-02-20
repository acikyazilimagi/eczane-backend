const { getAllLocations, getAllLocationsAdmin, insertLocation, updateLocation, deleteLocation } = require('../db')

module.exports = {
  getAllLocations: async (req, res, next) => {
    res.data = await getAllLocations()
    next()
  },

  getAllLocationsAdmin: async (req, res, next) => {
    res.data = await getAllLocationsAdmin()
    next()
  },

  postLocation: async (req, res, next) => {
    const location = req.body
    res.data = await insertLocation(location)
    next()
  },

  updateLocation: async (req, res, next) => {
    const { id } = req.params
    const location = req.body
    res.data = await updateLocation(id, location)
    next()
  },

  deleteLocation: async (req, res, next) => {
    const { id } = req.params
    res.data = await deleteLocation(id)
    next()
  },
}
