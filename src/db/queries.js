const { sql } = require('./connect')

exports.getAllLocations = async () => {
  try {
    return await sql`select * from locations`
  } catch (e) {
    return null
  }
}

exports.insertLocation = async (locations) => {
  const locationsMapped = locations.map((l) => ({
    ...l,
    workingHours: l.workingHours || ' ',
    additionalAddressDetails: l.addressDetails,
  }))
  console.log(locationsMapped[0]);


  try {
    let result = await sql`insert into locations ${sql(
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
      'source'
    )}`
    return result
  } catch (e) {
    console.log(e);
    return null
  }
}

exports.updateLocation = async (locationId, location) => {
  const keys = Object.keys(location)

  try {
    return await sql`update locations set ${sql(location, ...keys)}
    where id = ${locationId}`
  } catch (e) {
    console.log(e)
    return null
  }
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

exports.deleteLocation = async (locationId) => {
  try {
    return await sql`delete from locations where id = ${locationId}`
  } catch (e) {
    console.log(e)
    return null
  }
}
