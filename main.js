
let graz = {
  lat: 47.05,
  lng: 15.45,
  title: "Graz"
};

let startLayer = L.tileLayer.provider("BasemapAT.grau");

let map = L.map("map", {
    center: [ graz.lat, graz.lng ],
    zoom: 12,
    layers: [
        startLayer
    ],
});

let layerControl = L.control.layers({
    "BasemapAT Grau": startLayer,
    "Basemap Standard": L.tileLayer.provider("BasemapAT.basemap"),
    "Basemap High-DPI": L.tileLayer.provider("BasemapAT.highdpi"),
    "Basemap Gelände": L.tileLayer.provider("BasemapAT.terrain"),
    "Basemap Oberfläche": L.tileLayer.provider("BasemapAT.surface"),
    "Basemap Orthofoto": L.tileLayer.provider("BasemapAT.orthofoto"),
    "Basemap Beschriftung": L.tileLayer.provider("BasemapAT.overlay"),
    "Basemap mit Orthofoto und Beschriftung": L.layerGroup([
        L.tileLayer.provider("BasemapAT.orthofoto"),
        L.tileLayer.provider("BasemapAT.overlay"),
    ])
}).addTo(map);

// Maßstab hinzufügen
L.control.scale({
    imperial: false,
}).addTo(map);

let miniMap = new L.Control.MiniMap(
    L.tileLayer.provider("BasemapAT"), {
        toggleDisplay: true
    }
).addTo(map);

// TODO: hier aus CSV konvertierte JSON Datei laden und anzeigen

async function loadDrillData(url) {
    let response = await fetch(url);
    let data = await response.json();
    // console.log('Drill data: ' , data);
    let overlay = L.markerClusterGroup();
    overlay.addTo(map);
    layerControl.addOverlay(overlay, "Bohrungen Graz");
    for (let drill of data) {
        let marker = L.marker([drill.PHI, drill.LAMBDA]);
        marker.bindPopup(`<h3>${drill.ADRESSE}</h3>
        ${drill.AUFNDATUM}: ${drill.TIEFE_M} m
        `);
        overlay.addLayer(marker);
    }
}
loadDrillData("data/csvjson.json");