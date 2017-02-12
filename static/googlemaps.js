function mapInit() {
    var mapCenter = {lat: 37.5, lng: -120};
    var mapZoom = 6;

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: mapZoom,
        center: mapCenter
        //mapTypeId: 'terrain'
    });

    // Hardcoding the Fire Danger values, colors, and labels here for now
    var legend_title = 'CEFA Hourly Fire Danger'
    var values = [1, 2, 3, 4, 5, -99, 0]
    var colors = {
        '1': '#00ff00',
        '2': '#0000ff',
        '3': '#ffff00',
        '4': '#ffa500',
        '5': '#ff0000',
        '-99': '#bebebe',
        '0': '#9acd32',
    };
    var labels = {
        '1': 'Low [1]',
        '2': 'Medium [2]',
        '3': 'High [3]',
        '4': 'Very High [4]',
        '5': 'Extreme [5]',
        '-99': 'Missing [-99]',
        '0': 'No Staff Val [0]',
    }
    var nodata = -99;

    // // Read in feature geometries from the GeoJSON file
    var featureNameField = 'FDRA'
    map.data.loadGeoJson('/data/zonemap2008.geojson');

    // var featureData = {
    //     '385': [1, 2, 1, 2],
    //     '460': [2, 3, 4, 5],
    //     '461': [3, 3, 2, 1],
    // };

    // Read feature values from a json file
    var featureData;
    $.getJSON('/data/data.json', function(json) {
        featureData = json;
    });

    // Set the initial/default feature style
    function setStyle(feature){
        //var layer_color = colors[nodata]
        var layer_id = feature.getProperty(featureNameField);
        if (layer_id in featureData) {
            var layer_color = colors[featureData[layer_id][0]];
        } else {
            var layer_color = colors[nodata];
        }

        return {
            fillColor: layer_color,
            fillOpacity: 0.80,
            strokeWeight: 0.5
        };
    }
    map.data.setStyle(setStyle);

    // Set the legend colors and labels
    var legend = document.getElementById('legend');
    var div = document.createElement('h3');
    div.innerHTML = legend_title;
    legend.appendChild(div);
    for (var key in values) {
        var li = document.createElement('li');
        li.innerHTML = '<span class="swatch" style="background:' + colors[key] + ';"></span>' +
                        '<label>' + labels[key] + '</label>';
        legend.appendChild(li);
    }
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(legend);

    // // Assume we will have a time or slider index at some point
    // var i = 0;

    // // Initialize the polygons to the default value
    // featureLayer.on('ready', function() {
    //     styleFeatures(i)
    // })
}
