"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ServiceFilters from "./SubComponents/ServiceFilters";
import SearchBar from "./SubComponents/SearchBar";
import RadiusSelector from "./SubComponents/RadiusSelector";
import MapView from "./SubComponents/MapView";
import StatsFooter from "./SubComponents/StatsFooter";
import { serviceTypes, injectMarkerStyles } from "./SubComponents/markerUtils";
import { fetchAllServices } from "./SubComponents/apiUtils";

export default function FinancialServicesMap() {
  const [location, setLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [radius, setRadius] = useState(1000);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState(
    Object.keys(serviceTypes).reduce((acc, type) => {
      acc[type] = true;
      return acc;
    }, {})
  );

  // Inject CSS for colored markers on component mount
  useEffect(() => {
    injectMarkerStyles();
  }, []);

  // Function to fetch location by address using Nominatim API
  const searchByAddress = async (query) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setSearchLocation([parseFloat(lat), parseFloat(lon)]);
        fetchAllServices(
          [parseFloat(lat), parseFloat(lon)], 
          radius, 
          setPlaces, 
          setLoading, 
          setError
        );
      } else {
        setError("Location not found. Please try again.");
        setTimeout(() => setError(null), 3000);
      }
    } catch (err) {
      setError("Search failed. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initialize map with user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const userLocation = [latitude, longitude];
        setLocation(userLocation);
        setSearchLocation(userLocation);
        fetchAllServices(userLocation, radius, setPlaces, setLoading, setError);
      },
      (err) => {
        console.error("Geolocation failed:", err);
        setError("Could not access your location. Please allow location access or use the search feature.");
        setLoading(false);
        
        // Set default location to city center (e.g., New York City)
        const defaultLocation = [40.7128, -74.0060];
        setLocation(defaultLocation);
        setSearchLocation(defaultLocation);
        fetchAllServices(defaultLocation, radius, setPlaces, setLoading, setError);
      }
    );
  }, []);

  // Handle filter changes
  const toggleFilter = (type) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Handle radius change
  const handleRadiusChange = (newRadius) => {
    setRadius(newRadius);
    if (searchLocation) {
      fetchAllServices(searchLocation, newRadius, setPlaces, setLoading, setError);
    }
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchByAddress(searchQuery);
    }
  };

  // Filter places based on active filters
  const filteredPlaces = places.filter((place) => activeFilters[place.type]);

  // Count services by type
  const serviceCounts = {};
  Object.keys(serviceTypes).forEach(type => {
    serviceCounts[type] = places.filter(p => p.type === type).length;
  });

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Header with search and filters */}
      <div className="bg-white p-4 shadow-md z-10">
        <h1 className="text-2xl font-bold text-center mb-4">Financial Services Finder</h1>
        
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          loading={loading}
        />
        
        <RadiusSelector 
          radius={radius}
          handleRadiusChange={handleRadiusChange}
        />
        
        <ServiceFilters 
          serviceTypes={serviceTypes}
          activeFilters={activeFilters}
          toggleFilter={toggleFilter}
        />
      </div>
      
      {/* Map */}
      <MapView
        location={location}
        searchLocation={searchLocation}
        radius={radius}
        loading={loading}
        filteredPlaces={filteredPlaces}
        serviceTypes={serviceTypes}
      />
      
      {/* Stats footer */}
      <StatsFooter 
        filteredPlaces={filteredPlaces}
        radius={radius}
        serviceTypes={serviceTypes}
        activeFilters={activeFilters}
        serviceCounts={serviceCounts}
      />
    </div>
  );
}