"use client"
import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import "./HeatMap.css";
const Heatmap = ({ data }) => {
  useEffect(() => {
    // Check if map is already initialized
    const container = L.DomUtil.get('mapid');
    if(container != null){
      container._leaflet_id = null;
    }

    // Create a map instance
    var map = L.map('mapid').setView([14.724,78.610], 13);

    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // Prepare the heatmap layer configuration
    var cfg = {
      radius: 0.005,
      maxOpacity: 0.5,
      scaleRadius: true,
      useLocalExtrema: true,
      latField: 'lat',
      lngField: 'lng',
      valueField: 'count'
    };

    // Create the heatmap layer
    var heatmapLayer = new HeatmapOverlay(cfg);

    // Add the heatmap layer to the map
    map.addLayer(heatmapLayer);

    // Set the heatmap data
    heatmapLayer.setData({ max: 128, data });

  }, [data]);

  return <div id="mapid" style={{ height: "80vh", width: "94%" }}></div>;
};

export default Heatmap;
