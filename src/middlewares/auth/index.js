module.exports = function (req, res, next) {
  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    return res.unauthorized()
  }

  next()
}
