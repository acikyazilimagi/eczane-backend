const { sql } = require('./connect')

exports.getAllLocations = async () => {
  try {
    return sql`select * from locations`
  } catch (e) {
    return null
  }
}

exports.insertLocation = async (locations) => {
  const locationsMapped = locations.map((l) => ({
    ...l,
    workingHours: l.workingHours || '',
    additionalAddressDetails: l.addressDetails,
  }))

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
    )}`
    return result
  } catch (e) {
    return null
  }
}

exports.updateLocation = async (locationId, location) => {
  const keys = Object.keys(location)
  console.log(JSON.stringify(sql(location, ...keys)))

  try {
    return sql`update locations set ${sql(location, ...keys)}
    where id = ${locationId}`
  } catch (e) {
    console.log(e)
    return null
  }
}
