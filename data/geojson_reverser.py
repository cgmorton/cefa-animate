import json

def json_reverse_func(json_geom):
    """Reverse the point order from counter-clockwise to clockwise
    json_geom is modified in place
    Args:
        json_geom (dict): The geometry sub dictionar of a geojson.
    Returns:
        dict
    """
    if json_geom['type'].lower() == 'multipolygon':
        for i in range(len(json_geom['coordinates'])):
            for j in range(len(json_geom['coordinates'][i])):
                json_geom['coordinates'][i][j] = list(reversed(
                    json_geom['coordinates'][i][j]))
                # Repeat first coordinate at end
                if json_geom['coordinates'][i][j][0] != json_geom['coordinates'][i][j][-1]:
                    json_geom['coordinates'][i][j].append(json_geom['coordinates'][i][j][0])
    elif json_geom['type'].lower() == 'polygon':
        for i in range(len(json_geom['coordinates'])):
            json_geom['coordinates'][i] = list(reversed(
                json_geom['coordinates'][i]))
            # Repeat first coordinate at end
            if json_geom['coordinates'][i][0] != json_geom['coordinates'][i][-1]:
                json_geom['coordinates'][i].append(json_geom['coordinates'][i][0])
    return json_geom

with open('zonemap2008.geojson') as input_f:
    input_json = json.load(input_f)
with open('zonemap2008.geojson') as input_f:
    output_json = json.load(input_f)

for i, feature in enumerate(input_json['features']):
    output_json['features'][i]['geometry'] = json_reverse_func(feature['geometry'])

with open('zonemap2008_v2.geojson', "w") as output_f:
    json.dump(output_json, output_f)



