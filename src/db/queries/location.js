const { query } = require('express')
const { sql } = require('../connect')

exports.getAllLocations = async () => {
  const query = await sql`select * from locations where "isValidated"=true`
  return query || false
}

exports.getAllLocationsAdmin = async () => {
  const query = await sql`select * from locations`
  return query || false
}

exports.insertLocation = async (locations) => {
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
  return query || false
}

exports.validateLocation = async (locationId) => {
  try {
    return await sql`update locations set isValidated = true
    where id = ${locationId}`
  } catch (e) {
    console.log(e)
    return null
  }
}

exports.updateLocation = async (locationId, location) => {
  const keys = Object.keys(location)
  if (!keys.length) {
    return false
  }

  const query = await sql`update locations set ${sql(location, ...keys)}
    where id = ${locationId}`
  return query || false
}

exports.deleteLocation = async (locationId) => {
  const query = await sql`delete from locations where id = ${locationId}`
  return query || false
}