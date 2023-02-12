module.exports = {
  health: {
    method: 'get',
    path: '/health',
    handler: (req, res) => {
      console.log('abc')
      return res.status(200).send()
    },
  },
}
