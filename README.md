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

## AppEngine

#### Dependencies

Before running or deploying this application, install the dependencies to the "lib" folder using pip:
```
pip install -t lib -r requirements.txt
```

#### GCloud

After initializing and activating the conda environment, the development server can be started from within the project folder.  The port only needs to be specificied if not using the default value of 8080.
```
dev_appserver.py --port 8080 ./
```

The app can be then be deployed from within the project folder (the project and version flags may not be necessary).
```
gcloud app deploy --project PROJECT --version 1
```
