# Konvertieren von CSV nach GeoJSON

Datensatz von Bohrungen in Graz: <https://www.data.gv.at/katalog/dataset/e6e3d973-afcd-4f5c-b515-2554643bdc63>

online converter: <https://www.convertcsv.com/csv-to-geojson.htm>

Achtung: zuerst in LOcalc/Excel öffnen und Spalten für `latitude` und `longitude` umbenennen.

Dann konvertieren und unter `data/bohrpunkte.geojson` speichern.

[Template zur Visualisierung](https://webmapping22s.github.io/templates/graz.zip)

Javascript Code in `main.js`

```javascript
async function loadDrills(url) {
    let response = await fetch(url);    
    let geojson = await response.json();
    // console.log(geojson);

    let overlay = L.markerClusterGroup();
    layerControl.addOverlay(overlay, "Bohrpunkte");
    overlay.addTo(map);

    L.geoJSON(geojson, {
        pointToLayer: function (feature, latlng) {
            // console.log('FT: ', feature);
            let mrk = L.marker(latlng)
                .bindPopup(`<h4>${feature.properties.ADRESSE}</h4>${feature.properties.AUFNDATUM}: Tiefe ${feature.properties.TIEFE_M}m`);
            return mrk;
        },
    }).addTo(overlay);
}
loadDrills("data/bohrpunkte.geojson");
```
