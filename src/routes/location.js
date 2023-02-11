module.exports = {
  getAllLocations: {
    method: 'get',
    route: '/',
    private: false,
    handler: async (req, res) => {},
  },

  postLocation: {
    method: 'post',
    route: '/',
    private: true,
    handler: async (req, res) => {},
  },

  updateLocation: {
    method: 'post',
    route: '/location/:id',
    private: true,
    handler: async (req, res) => {},
  },

  deleteLocation: {
    method: 'delete',
    route: '/location/:id',
    private: true,
    handler: async (req, res) => {},
  },
}
