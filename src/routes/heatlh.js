module.exports = {
  health: {
    method: 'get',
    path: '/health',
    handler: (req, res) => {
      return res.status(200).send()
    },
  },
}
