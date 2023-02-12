module.exports = {
  getAllLocations: async (req, res, next) => {
    res.data = 'mock'
    next()
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
