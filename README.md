# Earthquake Web Visualization using JavaScript Leaflet

## Overview
The purpose of this project is to use JavaScript Leaflet to create web data visualization of the United States Geological Survey (USGS) earthquake dataset that was accessed via a GeoJSON Object. In addition Tectonic Plates (source below) was applied to plot additional data to the map.

**Webpage:** The webpage can be viewed at: [USGS Earthquake Visualizations Page](https://wayburke.github.io/EarthquakeVisualization)

## How to use
By clicking on the active deployment page, [USGS Earthquake Visualizations Page](https://wayburke.github.io/EarthquakeVisualization), you will be taken to a landing page for which you can select from either image below. Each image represents the Parts of this project. Please note that the visulization is based on data of earthquakes that occurred in the past 7days of when this site is accessed.

  * **Part 1: Create the Earthquake Visualization**
      <img src="https://github.com/WayBurke/EarthquakeVisualization/blob/main/images/Part1.png" width=70%>
    * Using the dataset obtained from USGS of earthquakes in the past 7 days, a leaflet map is created to plot the earthquakes based on their longitude and latitude
    * The data marker represents 
      * the magnitude of the earthquake by their size (that is, higher magnitudes will appear larger)
      * the depth of the earthquke by the color (that is, greater depth will appear darker in color, see the legend on the map)
    * In addition, by clicking on an earthquake's marker, you will see specific information about that earthquake to include: location, date/time, depth and magnitude.

  * **Part 2: Gather and Plot More Data (optional)**
      <img src="https://github.com/WayBurke/EarthquakeVisualization/blob/main/images/Part2.png" width=70%>
    * This version features the same map as in Part 1 with the added benefit of selecting from three types of map
      1. Street Map (_same as Part 1_)
      2. Topographical Map
      3. Satellite View with Tectonic Plates
    * In addition to the maps available for selection, you have the option of also removing the earthquake markers

## Files and Resources used
* JavaScript code for the manipulation of the HTML file
* HTML files used to launch the webpages illustrating the map visualizations
* Tectonic Plates which was found at https://github.com/fraxen/teconicplates
* MapBox for the Satellite imagery with the Tectonic Plates
* OpenStreetMap for the Street and Topographic Map

