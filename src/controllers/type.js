const { getAllTypes, insertType, updateType, deleteType } = require('../db')

module.exports = {
  getAllTypes: async (req, res) => {
    const types = await getAllTypes()
    return res.status(200).json({ data: types })
  },

  postType: async (req, res) => {
    const type = req.body
    const insertedType = await insertType(type)
    return res.status(201).json({ data: insertedType })
  },

  updateType: async (req, res) => {
    const { id } = req.params
    const type = req.body
    const updatedType = await updateType(id, type)
    return res.status(200).json({ data: updatedType })
  },

  deleteType: async (req, res) => {
    const { id } = req.params
    const deletedType = await deleteType(id)
    return res.status(200).json({ data: deletedType })
  },
}
