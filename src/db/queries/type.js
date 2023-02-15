const { query } = require('express')
const { sql } = require('../connect')

exports.getAllTypes = async () => {
  const query = await sql`select * from types`
  return query || false
}

exports.insertType = async (type) => {
  const query = await sql`insert into types ${sql(type, 'name')}`
  return query || false
}

exports.updateType = async (typeId, type) => {
  const typeKeys = Object.keys(type)
  const query = await sql`update types set ${sql(type, ...typeKeys)} where id = ${typeId}`
  return query || false
}

exports.deleteType = async (typeId) => {
  const query = await sql`delete from types where id = ${typeId}`
  return query || false
}