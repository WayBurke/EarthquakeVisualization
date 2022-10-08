/*************************************************************************************/
//                           GEOJSON URL
// URL for the past 7 Days of earthquake data
/*************************************************************************************/
const url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";



/*************************************************************************************/
//                          SETTING UP THE MAP OBJECT
/*************************************************************************************/
// Create our map, giving it the streetmap and earthquakes layers to display on load.

var myMap = L.map("map", {
  center: [
    41.15,-116.65 // someplace in Nevada
  ],
  zoom: 5.4
});


// street Base Layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);



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
//                          GET REQUEST FROM THE URL
// This block calls the create features with the data features as a parameter
/*************************************************************************************/

d3.json(url).then(function(data) {
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data,{
    pointToLayer: function (data, latlng) {
      return L.circleMarker(latlng, {
        radius: (data.properties.mag) *5,
        fillColor: chooseColor(data.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        fillOpacity: 0.8
      });
    }
  }).bindPopup(function (layer) {
      var place =`<h3>${layer.feature.properties.place}</h3><hr>`;
      var time =`<li>Date/Time: ${new Date(layer.feature.properties.time)}</li> `;
      var depth = `<li>Depth: ${layer.feature.geometry.coordinates[2]} km</li>`;
      var mag = `<li>Magnitude: ${layer.feature.properties.mag} ml</li>`;
      var textPop = place+"<p><ul>"+time+depth+mag +"</ul></p>";
    return textPop;
   
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

});

