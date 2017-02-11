# cefa-animate


Initial polygons came from the Census Bureau 2015 Cartographic Boundary Shapefiles at 500k.

Converted to geojson using ogr2ogr:
```
ogr2ogr -f GeoJSON test.geojson cb_2015_us_county_500k_ca.shp
```