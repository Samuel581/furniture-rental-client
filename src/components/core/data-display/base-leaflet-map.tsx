import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";


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

interface Location {
  lat: number;
  long: number;
}

const MapComponent = ({ center, zoom }: MapProps) => {
  const [currentPosition, setCurrentPosition] = useState<Location | null>(null);
  const position: L.LatLngExpression = [center.lat, center.lng];

  // We use an useEffect to get the location (due is gonna be changing over time)
  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });
      });
    };
  }, []);


  console.log('Map Component Rendering with:', { center, position, zoom });
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} className="h-full w-full">
        <MapContent position={position} currentLocation={currentPosition}/>
      </MapContainer>
    </div>
  );
};

interface MapContentProps {
  position: L.LatLngExpression;
  currentLocation: Location | null;
}


const MapContent = ({ position, currentLocation }: MapContentProps) => {
  const map = useMap()

  useEffect(() => {
    if(currentLocation){

      const customPlan = L.Routing.plan([
        L.latLng(currentLocation.lat, currentLocation.long),
        L.latLng(position)
      ], {
        createMarker: function() { return false; }, // This prevents the routing control from creating markers
        draggableWaypoints: false,
        addWaypoints: false
      });

      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(currentLocation.lat, currentLocation.long),
          L.latLng(position)
        ],
        plan: customPlan,
        routeWhileDragging: true,
        showAlternatives: true,
        addWaypoints: false,
        fitSelectedRoutes: false,
        lineOptions: {
          styles: [{ color: '#4281a4', weight: 5 }],
          extendToWaypoints: true ,
          missingRouteTolerance: 0
        }
      }).addTo(map)
      // Fit bounds to show both markers and route
      const bounds = L.latLngBounds([
        [currentLocation.lat, currentLocation.long],
        position
      ]);
      map.fitBounds(bounds, { padding: [50, 50] });

      return () => {
        map.removeControl(routingControl);
      };
    }
  }, [map, currentLocation, position])


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
