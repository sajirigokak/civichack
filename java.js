var map = L.map('map').setView([42.326, -71.122], 14);

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
                    weight: 7,
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
        case 'Good':         return "#272f21";
        case 'Satisfactory': return "#518f50";
        case 'Fair':         return "#e3dcba";
        case 'Poor':         return "#cba158";
        case 'Very Poor':    return "#c7522a";
        case 'Serious':      return "#7b0b09";
        case 'Failed':       return "#4f0404";
        case 'Not Scored':   return "#808080";
        default:             return "#999999";
    }
};
addEventListener(getElementByTagName('h2'), function(){
    h2.style.position = 1 - (window.scrollY / 100) * 0.5;
});
