//var map = L.map('map').setView([12.96972795, 79.16069432788137], 13);
//L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//    maxZoom: 19,
//    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//}).addTo(map);

var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.Routing.control({
    waypoints: [
      L.latLng(0,0),
     L.latLng(0,0)
    ],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.nominatim()
  }).addTo(map);