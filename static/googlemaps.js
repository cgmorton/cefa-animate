function mapInit() {
    var mapCenter = {lat: 37.5, lng: -120};
    var mapZoom = 6;

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: mapZoom,
        center: mapCenter,
        mapTypeId: 'satellite',
        //mapTypeId: 'terrain',
        streetViewControl: false
    });

    // Hardcoding the Fire Danger values, colors, and labels here for now
    var legend_title = 'CEFA Hourly Fire Danger';
    var fd_values = ['1', '2', '3', '4', '5', '-99', '0'];
    var fd_colors = {
        '1': '#00ff00',
        '2': '#0000ff',
        '3': '#ffff00',
        '4': '#ffa500',
        '5': '#ff0000',
        '-99': '#bebebe',
        '0': '#9acd32',
    };
    var fd_labels = {
        '1': 'Low [1]',
        '2': 'Medium [2]',
        '3': 'High [3]',
        '4': 'Very High [4]',
        '5': 'Extreme [5]',
        '-99': 'Missing [-99]',
        '0': 'No Staff Val [0]',
    }
    var fd_nodata = -99;


    // Read in feature geometries from the GeoJSON file
    var featureNameField = 'FDRA'
    //map.data.loadGeoJson('/data/zonemap2008.geojson');
    map.data.loadGeoJson('/data/zonemap2008.geojson', { idPropertyName: featureNameField });
    //map.data.loadGeoJson('/data/zonemap2008.geojson', { 'idPropertyName': featureNameField });
    //var feature = map.data.getFeatureById(508);
    //console.log(feature.getProperty('FDRA'));
    //console.log(feature.getProperty('POINTS'));


    // Set the control box (slider, play, pause, etc.) on the map
    var controls = document.getElementById('controls');
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(controls);


    // Set the default slider position
    var default_i = 0
    // Set the slider control
    $( function() {
        $('#slider').slider({value: default_i, min: 0, max: 11, step: 1});
    });


    function setFeatureStyle(slider_i) {
        map.data.setStyle(function setStyle(feature){
            var fdra = feature.getProperty(featureNameField);

            // If the value is not set, use the default value
            //if (fdra in featureData) {
            if (fdra in featureData & slider_i in featureData[fdra]) {
                var ftr_color = fd_colors[featureData[fdra][slider_i]];
            } else {
                var ftr_color = fd_colors[fd_nodata];
            }

            return {
                fillColor: ftr_color,
                fillOpacity: 0.80,
                strokeWeight: 0.5
            };
        });
    };


    // Link the slider to the features
    $('#slider').on('slide', function( event, ui ) {
        $('#timeLabel').html(ui.value);
        setFeatureStyle(ui.value)
    });


    // Read feature values from a separate json file
    // Set default feature style from values
    var featureData;
    $.getJSON('/data/data.json', function(json) {
        featureData = json;
        setFeatureStyle(default_i)
    });


    // // Update the feature styling based on the slider position
    // document.getElementById('slider').addEventListener('input', function(e) {
    //     slider_i = parseInt(e.target.value, 10);
    //     var timeLabel = document.getElementById('timeLabel')
    //     timeLabel.textContent = slider_i;
    //     map.data.setStyle(function setStyle(feature){
    //         var fdra = feature.getProperty(featureNameField);

    //         // If the value is not set, use the default value
    //         //if (fdra in featureData) {
    //         if (fdra in featureData & slider_i in featureData[fdra]) {
    //             var ftr_color = fd_colors[featureData[fdra][slider_i]];
    //         } else {
    //             var ftr_color = fd_colors[fd_nodata];
    //         }

    //         return {
    //             fillColor: ftr_color,
    //             fillOpacity: 0.80,
    //             strokeWeight: 0.5
    //         };
    //     });
    // });


    // Set the legend colors and labels
    var legend = document.getElementById('legend');
    var title = document.createElement('h4');
    title.innerHTML = legend_title;
    legend.appendChild(title);
    for (var i = 0; i < fd_values.length; i++) {
        fd_value = fd_values[i]
        var row = document.createElement('li');
        row.innerHTML =
            '<span class="swatch" style="background:' + fd_colors[fd_value] + ';"></span>' +
            '<label>' + fd_labels[fd_value] + '</label>';
        legend.appendChild(row);
    }
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(legend);


    // Update lower left info-box when a user clicks on a region
    // Eventually try making info box move to region/clock location?
    map.data.addListener('click', function(event) {
        // Needed this to get the line breaks to format correctly for "textContent"
        document.getElementById('info-box').setAttribute('style', 'white-space: pre;');
        fdra = event.feature.getProperty('FDRA')
        document.getElementById('info-box').textContent = fdra + '\r\n' + fdra;
    });


    // Highlight each region on mouseover
    map.data.addListener('mouseover', function(event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, {strokeWeight: 2});
    });
    // Turn off highlighting needed when cursor is not over any regions
    map.data.addListener('mouseout', function (event) {
        map.data.revertStyle();
        //map.data.overrideStyle(event.feature, {strokeWeight: 0.5});
    });


    // Write data to an InfoWindow that pops up on the clicked feature
    // This is currently using the clicked position
    // I think it would look nicer using pre-computed feature centroids
    var infoWindow = new google.maps.InfoWindow();
    map.data.addListener('click', function(event) {
        fdra = event.feature.getProperty('FDRA');
        infoWindow.setContent('FDRA: ' + fdra);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
    });


    // Keep map position centered when window resizes
    google.maps.event.addDomListener(window, 'resize', function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });
}


//google.maps..event.addDomListener(window, 'load', initialize);


