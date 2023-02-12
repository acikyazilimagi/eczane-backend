# Eczane Backend

Kullanılabilir durumdaki eczane ve hastanelerin datasını gönderen API.

## API

### Get All Locations

GET `https://eczaneapi.afetharita.com/api/locations`

```
{   "ok": true,
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
