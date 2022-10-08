/*Credits
Used the tectonicplates GeoJSON file from https://github.com/fraxen/tectonicplates
*/

/*************************************************************************************/
//                           GEOJSON URL
// URL for the past 7 Days of earthquake data
/*************************************************************************************/

// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


/*************************************************************************************/
//                          CHOOSE COLOR FUNCTION
/*************************************************************************************/
function chooseColor(depth) {
  if (depth < 10) return "rgb(163,246,0)";
  else if (depth <30 ) return "rgb(230,244,0)"; //"rgb(200,244,0)";
  else if (depth <50) return "rgb(247,219,17)";
  else if (depth<70) return"rgb(253,183,42)";
  else if (depth <90) return "rgb(252,155,75)"; //"rgb(252,163,93)";
  else return "rgb(225,87,91)";
};


/*************************************************************************************/
// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

/*************************************************************************************/
function createFeatures(earthquakeData) {
  
  // Function that will run once for each feature in the features array.
  // Give each feature a popup that describes the place, time, depth and magnitude of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(function (layer) {
      var place =`<h3>${layer.feature.properties.place}</h3><hr>`;
      var time =`<li>Date/Time: ${new Date(layer.feature.properties.time)}</li> `;
      var depth = `<li>Depth: ${layer.feature.geometry.coordinates[2]} km</li>`;
      var mag = `<li>Magnitude: ${layer.feature.properties.mag} ml</li>`;
      var textPop = place+"<p><ul>"+time+depth+mag +"</ul></p>";
    return textPop;
   
  });
  }
  /*************************************************************************************/
  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function (earthquakeData, latlng) {
      return L.circleMarker(latlng, {
        radius: (earthquakeData.properties.mag) *5,
        fillColor: chooseColor(earthquakeData.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        fillOpacity: 0.8
      });
    },
    onEachFeature: onEachFeature
  });

  // Send earthquakes layer to the createMap function
  createMap(earthquakes);
}
/*************************************************************************************/
function createMap(earthquakes) {

  // Create the base layers: Street, Topograhic and Satellite with Tectonic Plate Maps respectively.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  var satellite = L.tileLayer('https://api.mapbox.com/styles/v1/wayburke/cl8z3ms0w000q15o6jqqk1cat/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoid2F5YnVya2UiLCJhIjoiY2w1dTk4eGJhMnQ4ZjNkcGlvNnBxNXpvaSJ9.vsHlK3wEdl0eSMILwRJxvA',{
    attribution: '&copy; <a href="https://www.mapbox.com/about/maps/"> &copy;Mapbox</a> <a href= "http://www.openstreetmap.org/about/">&copy;OpenStreetMap</a> <a href="https://www.mapbox.com/map-feedback/#/-74.5/40/10"> Improve this map</a>'
  });

   
  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo,
    "Satellite with Tectonic Plates": satellite
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
    
  };

  //Default view of the Map Object on loading
  var myMap = L.map("map", {
    center: [
      41.15,-116.65 // someplace in Nevada
    ],
    zoom: 5.4,
    layers: [street, earthquakes]
  });

  //Add the Base Maps and the Overlay Maps to the Control Layer
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);


/*************************************************************************************/
//                          SETTING UP THE LEGEND
/*************************************************************************************/

  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function(myMap) {
      var div = L.DomUtil.create("div", "info legend"),
          depthRange = [-10,10,30,50,70,90];
          
      //Legend Header
      div.innerHTML ="<strong>Depth (km)</strong><br>";
     
      //Legend Key
      for(var i=0; i<depthRange.length;i++){
        div.innerHTML +=
        '<i style="background:' + chooseColor(depthRange[i] + 1) + '"></i> ' +
            depthRange[i] + (depthRange[i + 1] ? ' &ndash; ' + depthRange[i + 1] + '<br>' : '+');
      }

      return div;
  };

  // Adding the legend to the map
  legend.addTo(myMap);

}// end of create Map

