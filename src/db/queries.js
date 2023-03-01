const { sql } = require('./connect')

exports.getAllLocations = async () => {
  const query = await sql`select l.* from locations as l inner join cities as c on l."cityId" = c.id where l."isValidated"=true and c."isActive"=true`
  return query || false
}

exports.getLocation = async (id) => {
  const query = await sql`select * from locations where id = ${id} AND "isValidated" = true`
  const location = query[0]

  if (!location) {
    const error = new Error('Location not found')
    error.status = 404
    throw error
  }

  return location
}

exports.getAllLocationsAdmin = async () => {
  return await sql`select * from locations`
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

  const query = await sql`insert into locations ${sql(locationsMapped, ...keys)} returning *`
  return query[0] || false
}
exports.validateLocation = async (locationId) => {
  return await sql`update locations set isValidated = true where id = ${locationId}`
}

exports.updateLocation = async (locationId, location) => {
  const keys = Object.keys(location)
  if (!keys.length) {
    throw new Error('No keys to update')
  }

  return await sql`update locations set ${sql(location, ...keys)}
    where id = ${locationId}`
}

exports.disableHatay = async (locationId) => {
  return await sql`update locations set isValidated = false where cityId = 31`
}

exports.deleteLocation = async (locationId) => {
  return await sql`delete from locations where id = ${locationId}`
}

exports.getAllTypes = async () => {
  return await sql`select * from types`
}

exports.insertType = async (type) => {
  return await sql`insert into types ${sql(type, 'name')}`
}

exports.updateType = async (typeId, type) => {
  const typeKeys = Object.keys(type)
  return await sql`update types set ${sql(type, ...typeKeys)} where id = ${typeId}`
}

exports.deleteType = async (typeId) => {
  const query = await sql`delete from types where id = ${typeId}`
  if (!query) {
    throw new Error('Type not found')
  }
  return query
}

exports.getAllSubtypes = async () => {
  return await sql`select * from subtypes`
}

exports.insertSubtype = async (subtype) => {
  return await sql`insert into subtypes ${sql(subtype, 'typeId', 'name')}`
}

exports.updateSubtype = async (subtypeId, subtype) => {
  const subtypeKeys = Object.keys(type)
  return await sql`update subtypes set ${sql(subtype, ...subtypeKeys)} where id = ${subtypeId}`
}

exports.deleteSubtype = async (subtypeId) => {
  return await sql`delete from subtypes where id = ${subtypeId}`
}

exports.deleteAllLocations = async () => {
  return await sql`delete from locations`
}

exports.updateCity = async (cityId, city) => {
  const cityKeys = Object.keys(city)
  return await sql`update cities set ${sql(city, ...cityKeys)} where id = ${cityId}`
}

exports.listCities = async () => {
  return await sql`select * from cities where "isActive" = true`
}