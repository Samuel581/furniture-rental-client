import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
interface MapProps {
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

const MapComponent = ({ center, zoom }: MapProps) => {
  const position: L.LatLngExpression = [center.lat, center.lng];
  console.log('Map Component Rendering with:', { center, position, zoom });
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} className="h-full w-full">
        <MapContent position={position} />
      </MapContainer>
    </div>
  );
};

const MapContent = ({ position }: { position: L.LatLngExpression }) => {
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={icon}>
        <Popup>Client location</Popup>
      </Marker>
    </>
  );
};

export default MapComponent;
