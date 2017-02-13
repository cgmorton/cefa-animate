# CEFA California Hourly Fire Danger

Basic Google AppEngine page for displaying CEFA Hourly Fire Danger maps for California.

## Data

The feature geometry data is stored in data/zonemap2008.geojson.  
The hourly fire danger rating is being read from data/data.json.  This file currently only has 12 made up entries for each FDRA.

## Notes
The slider is currently hardcoded to only support 12 time steps.

The control buttons don't do anything yet.  Eventually combine the play & pause into a single button?

If you click on a polygon, a small info window should appear at the position clicked showing the FDRA number.  The box in the lower left should also display the FDRA number.

Need to link slider position to an actual date/time and then update the slider label with this value.
