# Eczane Backend

Kullanılabilir durumdaki eczane ve hastanelerin datasını gönderen API.

## API

### Get All Locations

GET `https://apieczane.afetharita.com/api`

#### Query Parametreleri

Type: integer

Örnek: GET `https://apieczane.afetharita.com/api?type=1`

Possible values: hastaneler için `1`, eczaneler için `2`

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
            "typeId": 2,
            "subTypeId": 4
        },
        ...
]}
```

`typeId`: 1 ise hastane, 2 ise eczane

`subTypeId`: 1 ise acil hastane, 2 ise genel eczane, 3 ise acil eczane, 4 ise genel eczane, 5 ise sahre hastanesi, 6 ise sahra eczanesi

`cityId ve districtId`: aşağı bakın

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
