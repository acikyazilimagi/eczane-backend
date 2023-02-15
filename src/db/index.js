const {
  getAllLocations,
  getAllLocationsAdmin,
  insertLocation,
  updateLocation,
  deleteLocation,
  validateLocation,
} = require('./queries/location')

const {
  getAllTypes,
  insertType,
  updateType,
  deleteType
} = require('./queries/type')

const {
  getAllSubtypes,
  insertSubtype,
  updateSubtype,
  deleteSubtype
} = require('./queries/subtype')

module.exports = {
  getAllLocations,
  getAllLocationsAdmin,
  insertLocation,
  updateLocation,
  deleteLocation,
  getAllTypes,
  insertType,
  updateType,
  deleteType,
  getAllSubtypes,
  insertSubtype,
  updateSubtype,
  deleteSubtype,
  validateLocation,
}
