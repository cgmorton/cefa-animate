function mapInit() {
    var mapCenter = [37.5, -120];
    var mapZoom = 6;

    // This will limit how far away the user can pan
    var southWest = L.latLng(25, -140),
        northEast = L.latLng(45, -100),
        mapBounds = L.latLngBounds(southWest, northEast)

    // Public Key
    L.mapbox.accessToken = 'pk.eyJ1IjoiY2dtb3J0b24iLCJhIjoiY2luNmM3d3V4MGVuendrbHV2OW5wN3RuaSJ9.rjjVnT1cLUI2VwUm8yprSQ';
    var map = L.mapbox.map('map', 'mapbox.streets', {
        // id: 'mapbox.streets',
        // id: 'mapbox.light',
        // id: 'mapbox.dark',
        // id: 'mapbox.satellite',
        zoomControl: false,
        maxBounds: mapBounds,
        maxZoom: 10,
        minZoom: 5,
        fadeAnimation: true
    });
    map.setView(mapCenter, mapZoom);
    new L.Control.Zoom({ position: 'topright' }).addTo(map);

    //var layerGroup = L.layerGroup().addTo(map);

    // Hardcoding the Fire Danger values, colors, and labels here for now
    var legend = 'CEFA Hourly Fire Danger'
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
    // var featureNameField = 'NAME'
    // var featureLayer = L.mapbox.featureLayer()
    //     .loadURL('/data/test.geojson')
    //     .addTo(map);

    // var featureData = {
    //     'Kern': [0, 1, 2],
    //     'Inyo': [1, 2, 3],
    //     'Mono': [2, 3, 4]
    // };

    // // Style the features based on the index
    // function styleFeatures(i) {
    //     featureLayer.eachLayer(function(layer) {
    //         var layer_id = layer.feature.properties[featureNameField];

    //         if (layer_id in featureData) {
    //             var layer_color = colors[featureData[layer_id][0]];
    //         } else {
    //             var layer_color = colors[nodata];
    //         }

    //         layer.setStyle({
    //             fillColor: layer_color,
    //             fillOpacity: 0.80,
    //             weight: 0.5
    //         });
    //     });
    // }

    // // Assume we will have a time or slider index at some point
    // var i = 0;

    // // Initialize the polygons to the default value
    // featureLayer.on('ready', function() {
    //     styleFeatures(i)
    // })

    // // Add a basic legend
    // function buildLegendHTML() {
    //     legendLabels = [];
    //     for (var i = 0; i < values.length; i++) {
    //       value = values[i];

    //       legendLabels.push(
    //         '<li><span class="swatch" style="background:' + colors[value] + ';"></span>' +
    //         labels[value] + '</li>');
    //     }

    //     return '<h3>' + legend + '</h3>' +
    //            '<ul class="legend labels">' + legendLabels.join('') + '</ul>';
    // }
    // map.legendControl
    //     .addLegend(buildLegendHTML())
    //     .setPosition('topright');
}
