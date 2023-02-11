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
