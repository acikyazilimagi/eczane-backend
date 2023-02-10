# Eczane Backend

Kullanılabilir durumdaki eczane ve hastanelerin datasını gönderen API.

## API

### Get All Locations

GET `https://apieczane.afetharita.com/api`

#### Query Parametreleri

Type: integer

Örnek: GET `https://apieczane.afetharita.com/api?type=Hastane`

Possible values: hastaneler için `Hastane`, eczaneler için `Eczane`

```
{   "ok": true,
    "data": [
        {
            "id": 1,
            "name": "CENGİZTOPEL ECZANESİ",
            "phone": "+904223213305",
            "address": "İSTİKLAL MAH. Cengiz Topel Cad. ÜÇGEN PARK KARŞISI MEYDAN APT. ALTI No:12/A, 44200 Battalgazi/Malatya, Türkiye",
            "addressDetails": "",
            "cityId": 44,
            "districtId": 608,
            "latitude": 38.38724298287497,
            "longitude": 38.32032953088737,
            "type": "Eczane",
            "subType": "Genel",
            "city": "Malatya",
            "district: "Battalgaazi",
            "typeId": 2,
            "subTypeId": 4
        },
        ...
]}
```

### Get All Cities and Districts

GET `https://apieczane.afetharita.com/api/cityWithDistricts`

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
