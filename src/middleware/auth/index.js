exports.auth = (req, res, next) => {
  if (req.headers['authorization'] !== process.env.SEED_KEY) {
    throw new Error('Unauthorized')
  }

  next()
}
