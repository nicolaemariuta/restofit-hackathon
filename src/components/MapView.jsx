// src/components/MapView.jsx
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Rectangle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Circle } from "react-leaflet";
import { useState, useEffect } from 'react';

import { findClosestNDVI, getNO2ValueFromGrid } from '../utils/dataSearch';

import RecenterMap from './RecenterMap'
import EventMarkers from './EventMarkers'

// Fix marker icons (otherwise they may not appear)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Patch Leaflet's default icon path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function ClickHandler({ onClick }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      console.log(`ClickHandler: lat=${lat}, lon=${lng}`);
      onClick({ lat, lon: lng });
    },
  });
  return null;
}

function getNDVIColor(value) {
  if (value > 0.7) return "#00ff00"; // bright green
  if (value > 0.4) return "#88cc44"; // lime/olive
  if (value > 0.2) return "#ffaa00"; // orange
  return "#ff0000"; // red
}

function getNO2Color(value) {
  if (value > 0.95) return "#ff000066";
  if (value > 0.7) return "#ff880066";
  if (value > 0.3) return "#ffff0066";
  return "#00ff0066";
}

function getO3Color(value) {
  if (value > 0.85) return "#ff000066";
  if (value > 0.7) return "#ff880066";
  if (value > 0.3) return "#ffff0066";
  return "#00ff0066";
}


export default function MapView({ measurements, onMeasurementsChange, settings, data }) {
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMapClick = ({ lat, lon }) => {
    console.log("handleMapClick" + lat + ",,," + lon)
    setMarkerPosition([lat, lon]);

    // Get closest NDVI point
    const ndviPoint = findClosestNDVI(data.ndvi, lat, lon);
    const ndviValue = ndviPoint ? ndviPoint.NDVI : null;

    const no2Value = data.no2 ? getNO2ValueFromGrid(data.no2, lat, lon) : null;
    const o3Value = data.o3 ? getNO2ValueFromGrid(data.o3, lat, lon) : null;

    onMeasurementsChange({
      ...measurements,
      NDVI: ndviValue,
      NO2: no2Value,
      O3: o3Value,
      coords: { lat, lon }
    });
  };

  useEffect(() => {
    console.log("NDVI Points:", data.ndvi);
    console.log("NO2 Grid:", data.no2);
    console.log("O3 Grid:", data.o3);
    console.log("Events:", data.events);
  }, [data]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        style={{ width: "100%", height: "100vh" }}
        center={settings.city === "CPH" ? [55.6761, 12.5683] : [44.4323, 26.0998]}
        zoom={12}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap city={settings.city} />

        <EventMarkers />

        <ClickHandler onClick={handleMapClick} />

        {/* Show marker only if one is set */}
        {markerPosition && (
          <Marker position={markerPosition}>
            <Popup>
              Selected: {markerPosition[0] && markerPosition[1]
                ? `${markerPosition[0].toFixed(5)}, ${markerPosition[1].toFixed(5)}`
                : "Invalid coordinates"}
            </Popup>
          </Marker>
        )}

        {/* Drawing NDVI overlay */}
        {(settings.layer === "NDVI") &&
          data.ndvi
            .filter(() => Math.random() < 0.002)
            .map((point, idx) => (
              <Circle
                key={idx}
                center={[point.lat, point.lon]}
                radius={200} // meters, adjust as needed
                pathOptions={{
                  color: getNDVIColor(point.NDVI),
                  fillColor: getNDVIColor(point.NDVI),
                  fillOpacity: 0.5,
                  weight: 0,
                }}
              />
            ))}

        {/* Drawing NO2 overlay */}
        {(settings.layer === "NO2") && data.no2 && (() => {
          const { bbox, rows, cols, data: no2Data } = data.no2;
          const [minLon, minLat, maxLon, maxLat] = bbox;

          const latStep = (maxLat - minLat) / rows;
          const lonStep = (maxLon - minLon) / cols;

          const rectangles = [];

          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const value = no2Data[row][col];

              const bounds = [
                [minLat + row * latStep, minLon + col * lonStep],
                [minLat + (row + 1) * latStep, minLon + (col + 1) * lonStep],
              ];

              rectangles.push(
                <Rectangle
                  key={`${row}-${col}`}
                  bounds={bounds}
                  pathOptions={{
                    color: getNO2Color(value),
                    fillColor: getNO2Color(value),
                    fillOpacity: 0.6,
                    weight: 0,
                  }}
                />
              );
            }
          }

          return rectangles;
        })()}


        {/* Drawing O3 overlay */}
        {(settings.layer === "O3") && data.no2 && (() => {
          const { bbox, rows, cols, data: o3Data } = data.o3;
          const [minLon, minLat, maxLon, maxLat] = bbox;

          const latStep = (maxLat - minLat) / rows;
          const lonStep = (maxLon - minLon) / cols;

          const rectangles = [];

          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const value = o3Data[row][col];

              const bounds = [
                [minLat + row * latStep, minLon + col * lonStep],
                [minLat + (row + 1) * latStep, minLon + (col + 1) * lonStep],
              ];

              rectangles.push(
                <Rectangle
                  key={`${row}-${col}`}
                  bounds={bounds}
                  pathOptions={{
                    color: getO3Color(value),
                    fillColor: getO3Color(value),
                    fillOpacity: 0.6,
                    weight: 0,
                  }}
                />
              );
            }
          }

          return rectangles;
        })()}


      </MapContainer>
    </div>
  );
}
