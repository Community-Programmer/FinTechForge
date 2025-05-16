import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { Loader2 } from "lucide-react";
import L from "leaflet";
import MapController from "./MapController";

export default function MapView({ 
  location, 
  searchLocation, 
  radius, 
  loading, 
  filteredPlaces, 
  serviceTypes 
}) {
  return (
    <div className="flex-grow relative z-0">
      {location ? (
        <MapContainer 
          center={location} 
          zoom={14} 
          className="h-full w-full"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapController 
            center={searchLocation} 
            radius={radius}
          />
          
          {/* User location marker */}
          {searchLocation && (
            <>
              <Marker
                position={searchLocation}
                icon={new L.Icon({
                  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
                  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
                  shadowSize: [41, 41],
                  className: 'user-location-marker'
                })}
              >
                <Popup>
                  <strong>You are here</strong>
                </Popup>
              </Marker>
              
              {/* Search radius circle */}
              <Circle 
                center={searchLocation} 
                radius={radius} 
                pathOptions={{ 
                  color: '#2563eb',
                  fillColor: '#2563eb',
                  fillOpacity: 0.1
                }}
              />
            </>
          )}
          
          {/* Service markers */}
          {filteredPlaces.map((place) => (
            <Marker
              key={place.id}
              position={[place.lat, place.lon]}
              icon={serviceTypes[place.type].icon}
            >
              <Popup className="financial-service-popup">
                <div>
                  <h3 className="font-bold text-lg">{place.name}</h3>
                  <p className="text-sm text-gray-600">{serviceTypes[place.type].name}</p>
                  <div className="mt-2">
                    <p><strong>Address:</strong> {place.address}</p>
                    <p><strong>Operator:</strong> {place.operator}</p>
                    <p><strong>Hours:</strong> {place.opening_hours}</p>
                  </div>
                  <div className="mt-2">
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div className="h-full flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          <p className="ml-2">Loading map...</p>
        </div>
      )}
      
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500 mr-2" />
            <p>Loading financial services...</p>
          </div>
        </div>
      )}
    </div>
  );
}