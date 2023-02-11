module.exports = {
  health: {
    method: 'get',
    route: '/health',
    private: false,
    handler: async (req, res) => {
      res.status(200).send()
    },
  },
}
