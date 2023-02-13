const { getAllSubtypes, insertSubtype, updateSubtype, deleteSubtype } = require('../db')

module.exports = {
  getAllSubtypes: async (req, res) => {
    const subtypes = await getAllSubtypes()
    return res.status(200).json({ data: subtypes })
  },

  postSubtype: async (req, res) => {
    const subtype = req.body
    const insertedSubtype = await insertSubtype(subtype)
    return res.status(201).json({ data: insertedSubtype })
  },

  updateSubtype: async (req, res) => {
    const { id } = req.params
    const subtype = req.body
    const updatedSubtype = await updateSubtype(id, subtype)
    return res.status(200).json({ data: updatedSubtype })
  },

  deleteSubtype: async (req, res) => {
    const { id } = req.params
    const deletedSubtype = await deleteSubtype(id)
    return res.status(200).json({ data: deletedSubtype })
  },
}
