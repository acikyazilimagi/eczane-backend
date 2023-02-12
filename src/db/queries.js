const { query } = require('express')
const { sql } = require('./connect')

exports.getAllLocations = async () => {
  const query = await sql`select * from locations`
  if (!query) return false
  return query
}

exports.insertLocation = async (locations) => {
<<<<<<< HEAD
  const locationsMapped = locations.map((l) => ({
    ...l,
    workingHours: l.workingHours || '',
    additionalAddressDetails: l.addressDetails,
  }))

  const query = await sql`insert into locations ${sql(
    locationsMapped,
    'name',
    'phone',
    'address',
    'additionalAddressDetails',
    'workingHours',
    'latitude',
    'longitude',
    'cityId',
    'districtId',
    'typeId',
    'code',
    'subTypeId',
  )}`
=======
  const locationsMapped = {
    ...locations,
    workingHours: locations.workingHours || '',
    additionalAddressDetails: locations.addressDetails || '',
  }
  delete locationsMapped.addressDetails

  const keys = Object.keys(locationsMapped)
  if (!keys.length) {
    return false
  }

  const query = await sql`insert into locations ${sql(locationsMapped, ...keys)}`

>>>>>>> f734da958fba8fbbdf09462e20ecd6002cae393e
  if (!query) return false
  return query
}

exports.updateLocation = async (locationId, location) => {
  const keys = Object.keys(location)
  if (!keys.length) {
    return false
  }

  const query = await sql`update locations set ${sql(location, ...keys)}
    where id = ${locationId}`
  if (!query) return false
  return query
}

exports.deleteLocation = async (locationId) => {
  const query = await sql`delete from locations where id = ${locationId}`
  if (!query) return false
  return query
}

exports.getAllTypes = async () => {
  const query = sql`select * from types`
  if (!query) return false
  return query
}

exports.insertType = async (type) => {
  const query = sql`insert into types ${sql(type, 'name')}`
  if (!query) return false
  return query
}

exports.updateType = async (typeId, type) => {
  const typeKeys = Object.keys(type)

  const query = sql`update types set ${sql(type, ...typeKeys)} where id = ${typeId}`
  if (!query) return false
  return query
}

exports.deleteType = async (typeId) => {
  const query = sql`delete from types where id = ${typeId}`
  if (!query) return false
  return query
}
<<<<<<< HEAD
=======

exports.getAllSubtypes = async () => {
  const query = sql`select * from subtypes`
  if (!query) return false
  return query
}

exports.insertSubtype = async (subtype) => {
  const query = sql`insert into subtypes ${sql(subtype, 'typeId', 'name')}`
  if (!query) return false
  return query
}

exports.updateSubtype = async (subtypeId, subtype) => {
  const subtypeKeys = Object.keys(type)

  const query = sql`update subtypes set ${sql(subtype, ...subtypeKeys)} where id = ${subtypeId}`
  if (!query) return false
  return query
}

exports.deleteSubtype = async (subtypeId) => {
  const query = sql`delete from subtypes where id = ${subtypeId}`
  if (!query) return false
  return query
}
>>>>>>> f734da958fba8fbbdf09462e20ecd6002cae393e
