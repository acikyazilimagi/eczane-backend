module.exports = {
  getAllTypes: {
    method: 'get',
    route: '/types',
    private: false,
    handler: async (req, res) => {},
  },

  postType: {
    method: 'post',
    route: '/types',
    private: true,
    handler: async (req, res) => {},
  },

  updateType: {
    method: 'post',
    route: '/types/:id',
    private: true,
    handler: async (req, res) => {},
  },
}
