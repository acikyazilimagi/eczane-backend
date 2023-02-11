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

  try {
    return sql`update locations set ${sql(location, ...keys)}
    where id = ${locationId}`
  } catch (e) {
    console.log(e)
    return null
  }
}

exports.deleteLocation = async (locationId) => {
  try {
    return sql`delete from locations where id = ${locationId}`
  } catch (e) {
    console.log(e)
    return null
  }
}

exports.getAllTypes = async () => {
  try {
    return sql`select * from types`;
  } catch (e) {
    console.log(e);
    return null;
  }
};

exports.insertType = async (type) => {
  try{
    return sql`insert into types ${sql(
      type,
      'name'
      )}`;
  } catch (e){
    console.log(e);
    return null;
  }
};

exports.updateType = async (typeId, type) => {
  try {
    const typeKeys = Object.keys(type);
    return sql`update types set ${sql(type, ...typeKeys)} where id = ${typeId}`;
  } catch (e) {
    console.log(e);
    return null;
  }
};

exports.deleteType = async (typeId) => {
  try {
    return sql`delete from types where id = ${typeId}`;
  } catch (e) {
    console.log(e);
    return null;
  }
};