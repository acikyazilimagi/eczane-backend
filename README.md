# Eczane Backend

Kullanılabilir durumdaki sağlık birimlerinin datasını gönderen API.

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
            "isValidated": true
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
