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
    '0': '#ffffff',
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


// Load the test data from the JSON file
// This could eventually be moved to a dedicated "data" script
var featureData;
$.getJSON('/data/data.json', function(json) {
    featureData = json;
});


// GeoJSON data
var featureNameField = 'FDRA'
var featureGeoJSON = '/data/zonemap2008.geojson';


// Initialize the slider
var default_i = 0;
var min_i = 0;
var max_i = 11;
$('#slider').slider({value: default_i, min: min_i, max: max_i, step: 1,});
$('#slider').on('slide', function( event, ui ) {
    setFeatureStyle(ui.value);
    $('#timeLabel').html(ui.value)} );


// Link the control buttons to the slider
$('#step-backward-btn').click(function() {
    // This sets slider to beginning
    $('#slider').slider("value", min_i)
});

$('#step-forward-btn').click(function() {
    // This sets slider to the end
    $('#slider').slider("value", max_i)
});

