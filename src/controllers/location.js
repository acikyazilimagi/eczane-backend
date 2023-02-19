const { getAllLocations, getLocation, getAllLocationsAdmin, insertLocation, updateLocation, deleteLocation } = require('../db')

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
    const data = await insertLocation(location)
    const failed = data === false
    res.data = data
    res.statusCode = failed ? 500 : 201
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

  getLocation: async (req, res, next) => {
    const { id } = req.params
    res.data = await getLocation(id)
    next()
  },

}
