const { query } = require('express')
const { sql } = require('../connect')

exports.getAllSubtypes = async () => {
  const query = await sql`select * from subtypes`
  return query || false
}

exports.insertSubtype = async (subtype) => {
  const query = await sql`insert into subtypes ${sql(subtype, 'typeId', 'name')}`
  return query || false
}

exports.updateSubtype = async (subtypeId, subtype) => {
  const subtypeKeys = Object.keys(type)
  const query = await sql`update subtypes set ${sql(subtype, ...subtypeKeys)} where id = ${subtypeId}`
  return query || false
}

exports.deleteSubtype = async (subtypeId) => {
  const query = await sql`delete from subtypes where id = ${subtypeId}`
  return query || false
}