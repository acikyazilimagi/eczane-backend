# Eczane Backend

Kullanılabilir durumdaki sağlık birimlerinin datasını gönderen API.

## Setup

### Requirements

Latest version of Node.js and PostgreSQL.

### Installation

1. Clone the repository.

```bash
git clone {YOUR_FORKED_REPOSITORY_URL}
```

2. Install dependencies.

```bash
npm install
```

3. Run a PostgreSQL server on your machine, preferably with Docker.

```bash
docker run -p 127.0.0.1:5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=eczane-backend-dev -e POSTGRES_USER=postgres -e POSTGRES_ROOT_PASSWORD=postgres -d postgres

# Create another instance for test purpose if you want
docker run -p 127.0.0.1:5455:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=eczane-backend-test -e POSTGRES_USER=postgres -e POSTGRES_ROOT_PASSWORD=postgres -d postgres

```

4. Create a `.env` file in the root directory of the project and fill it with the following variables.

```bash

# Dev database
ECZ_DB_HOST=localhost
ECZ_DB_PORT=5432
ECZ_DB_USER=postgres
ECZ_DB_PASSWORD=postgres
ECZ_DB_NAME=eczane-backend-dev

# Test database (needed if you will run tests)
ECZ_TEST_DB_HOST=localhost
ECZ_TEST_DB_PORT=5455
ECZ_TEST_DB_USER=postgres
ECZ_TEST_DB_PASSWORD=postgres
ECZ_TEST_DB_NAME=eczane-backend-test

# Server
ECZ_PORT=3000

```

5. Load the environment variables.

```bash
source .env
```

6. Run the migrations.

```bash
#  Run the migration on dev / prod database
DATABASE_URL=postgres://$ECZ_DB_USER:$ECZ_DB_PASSWORD@$ECZ_DB_HOST:$ECZ_DB_PORT/$ECZ_DB_NAME npm run migrate up
# Downgrade the db
DATABASE_URL=postgres://$ECZ_DB_USER:$ECZ_DB_PASSWORD@$ECZ_DB_HOST:$ECZ_DB_PORT/$ECZ_DB_NAME npm run migrate down

#  Run the migration on test database
DATABASE_URL=postgres://postgres:postgres@localhost:5455/eczane-backend-test npm run migrate up
# Downgrade the db on test database
DATABASE_URL=postgres://postgres:postgres@localhost:5455/eczane-backend-test npm run migrate down
```

7. Run the server.

```bash
npm run dev
```

## API

### Get All Locations

GET `https://eczaneapi.afetharita.com/api/locations`

```
{
    "data": [
        {
            "id": 94,
            "code": "91",
            "name": "Duygu Eczanesi",
            "phone": "+904145033503",
            "address": "Seyrantepe Mh, 63002 Karaköprü/Şanlıurfa, Türkiye",
            "additionalAddressDetails": "FuarMerkezi Yukarısı,naturel Park,Yükseliş Koleji Civarı,Asm Karşısı, Bim Altı",
            "workingHours": "",
            "latitude": 37.2186236,
            "longitude": 38.7755897,
            "cityId": 63,
            "districtId": 830,
            "typeId": 2,
            "subTypeId": 4,
            "createdAt": "2023-02-10T17:18:59.978Z",
            "source": "haberler.com",
            "isValidated": true,
            "isvalidatedapi": true,
            "additional_data": { }
        },
        ...
]}
```

### Get Types

GET `https://eczaneapi.afetharita.com/api/types`

```
{
  "data": [
    {
      "id": 1,
      "name": "Hastane",
      "createdAt": "2023-02-10T17:13:53.579Z"
    },
    {
      "id": 2,
      "name": "Eczane",
      "createdAt": "2023-02-10T17:13:53.579Z"
    },
    {
      "id": 4,
      "name": "Veteriner",
      "createdAt": "2023-02-12T12:17:16.639Z"
    },
    {
      "id": 3,
      "name": "Psikolojik Destek",
      "createdAt": "2023-02-12T12:17:16.639Z"
    }
  ]
}
```

### Get Subtypes

GET `https://eczaneapi.afetharita.com/api/subtypes`

```
{
  "data": [
    {
      "id": 6,
      "typeId": 2,
      "name": "Sahra Eczanesi",
      "createdAt": "2023-02-10T17:13:55.265Z"
    },
    {
      "id": 5,
      "typeId": 1,
      "name": "Sahra Hastanesi",
      "createdAt": "2023-02-10T17:13:55.265Z"
    },
    {
      "id": 1,
      "typeId": 1,
      "name": "Gemi Hastanesi",
      "createdAt": "2023-02-10T17:13:55.265Z"
    },
    ...
  ]
}
```

### Get All Cities and Districts

GET `https://eczaneapi.afetharita.com/api/cityWithDistricts`

```
{
   "ok": true
   "data": [
           {
               "id": 1,
               "key": "Adana",
               "districts": [
                   {
                       "id": 1,
                       "key": "Yüreğir"
                   },
                   {
                       "id": 2,
                       "key": "Yumurtalık"
                   },
                   ...
            ]}]
}
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
