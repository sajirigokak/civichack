var map = L.map('map').setView([42.326, -71.122], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Load and display GeoJSON data with color-coding
fetch('pavements.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            style: function(feature) {
                //style for each line segment 
                return {
                    //call our function to get color based on label
                    color: getColorByLabel(feature.properties.label),
                    weight: 3,
                    opacity: 0.8
                };
            },
            onEachFeature: function(feature, layer) {
                let props = feature.properties;
                let popupText = `<strong>${props.address_st}</strong><br/>
                    Label: ${props.label}<br/>
                    Score: ${props.score}<br/>
                    Length: ${props.length_ft} ft`;
                layer.bindPopup(popupText);
            }
        }).addTo(map);
    })
    .catch(error => console.error('Error loading GeoJSON:', error));

    //change color based on pavement condition
getColorByLabel = function(label) {
    switch (label) {
        case 'Good':         return "#255b0e";
        case 'Satisfactory': return "#6dd44b";
        case 'Fair':         return "#f6ff00";
        case 'Poor':         return "#f3ce2b";
        case 'Very Poor':    return "#da641a";
        case 'Serious':      return "#f63310";
        case 'Failed':       return "#990909";
        case 'Not Scored':   return "#808080";
        default:             return "#999999";
    }
};

