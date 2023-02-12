// todo :: psql connection

exports.response = (req, res) => {
  res.status(200).json({ data: res.data })
}
