Notes for converting zonemap2008.txt to zonemap2008.geojson

Opened file in sublime and removed empty lines (replaced: '^\n' with '').
Opened file in Excel, converted text to columns, then swapped lat and lon columns (lon needs to be first in GeoJSON).
After swapping, first value appears to be FDRA code and second value is the number of points in the polygon?
Saved file from excel.
Used a couple of different regexes to get the coordinates into the GeoJSON format.
Added the extra GeoJSON key/values (properties, type, geometry, etc.).
The order of the coordinates needs to be reversed and the first point needs to be duplicated at the end.
The python script geojson_reverser.py should take care of this (but the file names are hardcoded).
Tested final geojson at: http://geojsonlint.com/

In FDRA 508, there is a weird straight line out in the ocean.
Removed the following 4 points: [-120.666, 34.91523], [-120.6658, 34.9152], [-120.6658, 34.91538], [-120.666, 34.91523]