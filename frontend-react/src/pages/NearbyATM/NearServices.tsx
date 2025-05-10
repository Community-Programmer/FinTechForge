import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (iconUrl, iconSize) => {
  return L.icon({
    iconUrl,
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize/2, iconSize],
    popupAnchor: [0, -iconSize]
  });
};

const atmIcon = createCustomIcon('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', 25);
const cryptoAtmIcon = createCustomIcon('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', 25);
const exchangeIcon = createCustomIcon('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', 25);
const advisorIcon = createCustomIcon('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', 25);
const taxConsultantIcon = createCustomIcon('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', 25);

// Component to update map view when location changes
function SetViewOnLocation({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 14);
    }
  }, [center, map]);
  return null;
}

// Sample data for POIs
const generateSamplePOIs = (center, count = 25) => {
  if (!center) return [];
  
  const types = ['atm', 'crypto_atm', 'exchange', 'financial_advisor', 'tax_consultant'];
  const pois = [];
  
  for (let i = 0; i < count; i++) {
    // Generate random offset (approx within 2km)
    const latOffset = (Math.random() - 0.5) * 0.02;
    const lngOffset = (Math.random() - 0.5) * 0.02;
    
    const type = types[Math.floor(Math.random() * types.length)];
    
    let name, details;
    
    switch(type) {
      case 'atm':
        name = `ATM #${i+1}`;
        details = 'Regular ATM';
        break;
      case 'crypto_atm':
        name = `Crypto ATM #${i+1}`;
        details = 'Bitcoin, Ethereum supported';
        break;
      case 'exchange':
        name = `Exchange #${i+1}`;
        details = 'Currency exchange services';
        break;
      case 'financial_advisor':
        name = `${['Smith', 'Johnson', 'Williams', 'Brown', 'Jones'][Math.floor(Math.random() * 5)]} Financial Advisors`;
        details = 'Investment planning, retirement planning';
        break;
      case 'tax_consultant':
        name = `${['Lee', 'Garcia', 'Miller', 'Davis', 'Wilson'][Math.floor(Math.random() * 5)]} Tax Consultants`;
        details = 'Tax planning, filing, and consulting services';
        break;
      default:
        name = `Location #${i+1}`;
        details = 'Services available';
    }
    
    pois.push({
      id: i,
      type,
      name,
      position: [center[0] + latOffset, center[1] + lngOffset],
      address: `${Math.floor(Math.random() * 100) + 1} ${['Main St', 'Broadway', 'Park Ave', 'Oak Rd', 'Maple Ln'][Math.floor(Math.random() * 5)]}`,
      details
    });
  }
  
  return pois;
};

// Function to open Google Maps directions
const openGoogleMapsDirections = (destination) => {
  if (!destination || !Array.isArray(destination) || destination.length !== 2) return;
  
  const [lat, lng] = destination;
  // Opens Google Maps in a new tab with directions to the destination
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
};

export default function NearServices() {
  const [userLocation, setUserLocation] = useState(null);
  const [pois, setPois] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const mapRef = useRef(null);

  useEffect(() => {
    // Get user's location
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setLoading(false);
      },
      (err) => {
        console.error("Error getting location:", err);
        setError("Unable to get your location. Please enable location services and refresh.");
        setLoading(false);
        // Default to New York City if location not available
        setUserLocation([40.7128, -74.0060]);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      // In a real app, this would be an API call to get nearby POIs
      // For demo purposes, generating sample data
      const sampleData = generateSamplePOIs(userLocation);
      setPois(sampleData);
    }
  }, [userLocation]);

  const filteredPOIs = filter === 'all' 
    ? pois 
    : pois.filter(poi => poi.type === filter);

  const getMarkerIcon = (type) => {
    switch(type) {
      case 'atm': return atmIcon;
      case 'crypto_atm': return cryptoAtmIcon;
      case 'exchange': return exchangeIcon;
      case 'financial_advisor': return advisorIcon;
      case 'tax_consultant': return taxConsultantIcon;
      default: return atmIcon;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'atm': return 'bg-blue-500';
      case 'crypto_atm': return 'bg-purple-500';
      case 'exchange': return 'bg-green-500';
      case 'financial_advisor': return 'bg-yellow-500';
      case 'tax_consultant': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeName = (type) => {
    switch(type) {
      case 'atm': return 'ATM';
      case 'crypto_atm': return 'Crypto ATM';
      case 'exchange': return 'Exchange';
      case 'financial_advisor': return 'Financial Advisor';
      case 'tax_consultant': return 'Tax Consultant';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <h1 className="text-xl font-medium text-gray-900">Loading Map</h1>
          <p className="mt-2 text-gray-500">Please allow location access when prompted...</p>
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center p-8 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <h1 className="text-xl font-medium text-red-500">Location Error</h1>
          <p className="mt-2 text-gray-500">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen ">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 mt-0 shadow-md">
        <h1 className="text-xl font-bold">Nearby Financial Services</h1>
        <p className="text-sm opacity-80">Find financial services near your location</p>
      </header>
      
      {/* Filter Controls */}
      <div className="bg-white p-4 shadow-md z-10 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          <button 
            className={`px-3 py-1 rounded-full text-sm font-medium ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-3 py-1 rounded-full text-sm font-medium ${filter === 'atm' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setFilter('atm')}
          >
            ATMs
          </button>
          <button 
            className={`px-3 py-1 rounded-full text-sm font-medium ${filter === 'crypto_atm' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setFilter('crypto_atm')}
          >
            Crypto ATMs
          </button>
          <button 
            className={`px-3 py-1 rounded-full text-sm font-medium ${filter === 'exchange' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setFilter('exchange')}
          >
            Exchange Points
          </button>
          <button 
            className={`px-3 py-1 rounded-full text-sm font-medium ${filter === 'financial_advisor' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setFilter('financial_advisor')}
          >
            Financial Advisors
          </button>
          <button 
            className={`px-3 py-1 rounded-full text-sm font-medium ${filter === 'tax_consultant' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setFilter('tax_consultant')}
          >
            Tax Consultants
          </button>
        </div>
      </div>
      
      {/* Map Container */}
      <div className="flex-grow relative">
        <MapContainer 
          center={userLocation || [40.7128, -74.0060]} 
          zoom={14} 
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {userLocation && (
            <Marker 
              position={userLocation}
              icon={L.divIcon({
                html: `<div class="flex items-center justify-center bg-blue-500 rounded-full w-6 h-6 border-2 border-white pulse-animation"></div>`,
                className: '',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
              })}
            >
              <Popup>
                <div className="text-center">
                  <p className="font-medium">Your Location</p>
                </div>
              </Popup>
            </Marker>
          )}
          
          {filteredPOIs.map((poi) => (
            <Marker 
              key={poi.id} 
              position={poi.position}
              icon={getMarkerIcon(poi.type)}
            >
              <Popup>
                <div className="p-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-3 h-3 rounded-full ${getTypeColor(poi.type)}`}></div>
                    <span className="text-xs text-gray-500">{getTypeName(poi.type)}</span>
                  </div>
                  <h3 className="font-medium text-blue-600">{poi.name}</h3>
                  <p className="text-sm text-gray-600">{poi.address}</p>
                  <p className="text-sm mt-1">{poi.details}</p>
                  <button 
                    className="mt-2 text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => openGoogleMapsDirections(poi.position)}
                  >
                    Get Directions
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
          
          <SetViewOnLocation center={userLocation} />
        </MapContainer>
      </div>
      
      {/* Status Bar */}
      <div className="bg-gray-100 p-2 text-sm text-gray-600 border-t border-gray-200">
        <p className="text-center">
          Showing {filteredPOIs.length} locations 
          {filter !== 'all' ? ` (filtered: ${filter.replace('_', ' ')})` : ''}
        </p>
      </div>

      {/* Legend */}
      <div className="bg-white border-t border-gray-200 p-2">
        <div className="flex flex-wrap justify-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>ATMs</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Crypto ATMs</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Exchange</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Financial Advisors</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Tax Consultants</span>
          </div>
        </div>
      </div>

      {/* Custom CSS for pulse animation */}
      <style jsx>{`
        .pulse-animation {
          box-shadow: 0 0 0 rgba(59, 130, 246, 0.5);
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
      `}</style>
    </div>
  );
}