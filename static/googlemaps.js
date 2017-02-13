var map;

function mapInit() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {lat: 37.5, lng: -120},
        mapTypeId: 'satellite',
        //mapTypeId: 'terrain',
        streetViewControl: false
    });

    // Read in feature geometries from the GeoJSON file
    map.data.loadGeoJson(featureGeoJSON, { idPropertyName: featureNameField });

    // Wait for the request to complete by listening for the first feature to be added
    // https://developers.google.com/maps/documentation/javascript/combining-data
    google.maps.event.addListenerOnce(map.data, 'addfeature', function() {
        setFeatureStyle(default_i);
    });
    // Apply initial styling to the features
    //setFeatureStyle(default_i);

    // Position the control box (slider, play, pause, etc.) on the map
    var controls = document.getElementById('controls');
    map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(controls);

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


function setFeatureStyle(slider_i) {
    map.data.setStyle(function (feature) {
        var fdra = feature.getProperty(featureNameField);

        // If the value is not set, use the default value
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
