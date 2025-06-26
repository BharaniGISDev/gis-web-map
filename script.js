// Assumes geojsonData is already defined from geojsonData.js

// Initialize the map
const map = L.map('map').setView([10.5, 78.5], 7); // Adjust view as needed

// Add OpenStreetMap base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let markersLayer = L.layerGroup().addTo(map); // To hold station markers

// Function to update the map based on dropdown selection
function updateMap() {
  const selectedRiver = document.getElementById('riverSelect').value;
  const selectedMonth = document.getElementById('monthSelect').value;

  markersLayer.clearLayers(); // Clear old markers

  geojsonData.features.forEach(feature => {
    const props = feature.properties;
    const coords = feature.geometry.coordinates;

    const matchesRiver = selectedRiver === "All" || props["River Name"] === selectedRiver;
    const matchesMonth = selectedMonth === "All" || props["Month"] === selectedMonth;

    if (matchesRiver && matchesMonth) {
      const marker = L.marker([coords[1], coords[0]]).bindPopup(`
        <strong>${props["Name of Stations"]}</strong><br>
        <strong>River:</strong> ${props["River Name"]}<br>
        <strong>Month:</strong> ${props["Month"]}<br>
        <strong>pH:</strong> ${props["pH"]}<br>
        <strong>TDS:</strong> ${props["TDS"]}
      `);
      markersLayer.addLayer(marker);
    }
  });
}

// Initial load
updateMap();

// Add event listeners
document.getElementById('riverSelect').addEventListener('change', updateMap);
document.getElementById('monthSelect').addEventListener('change', updateMap);
