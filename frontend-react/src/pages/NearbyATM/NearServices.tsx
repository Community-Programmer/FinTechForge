"use client";

import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import ServiceFilters from "./SubComponents/ServiceFilters";
import SearchBar from "./SubComponents/SearchBar";
import RadiusSelector from "./SubComponents/RadiusSelector";
import MapView from "./SubComponents/MapView";
import StatsFooter from "./SubComponents/StatsFooter";
import { serviceTypes, injectMarkerStyles } from "./SubComponents/markerUtils";
import { fetchAllServices } from "./SubComponents/apiUtils";

export default function FinancialServicesMap() {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [searchLocation, setSearchLocation] = useState<[number, number] | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [radius, setRadius] = useState<number>(1000);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>(
    Object.keys(serviceTypes).reduce((acc, type) => {
      acc[type] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  // Inject custom marker styles
  useEffect(() => {
    injectMarkerStyles();
  }, []);

  const searchByAddress = async (query: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (data?.length) {
        const { lat, lon } = data[0];
        const coords: [number, number] = [parseFloat(lat), parseFloat(lon)];
        setSearchLocation(coords);
        fetchAllServices(coords, radius, setPlaces, setLoading, setError);
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setLocation(coords);
        setSearchLocation(coords);
        fetchAllServices(coords, radius, setPlaces, setLoading, setError);
      },
      (err) => {
        console.error("Geolocation failed:", err);
        setError("Could not access your location. Using default location.");

        const defaultCoords: [number, number] = [40.7128, -74.0060]; // NYC
        setLocation(defaultCoords);
        setSearchLocation(defaultCoords);
        fetchAllServices(defaultCoords, radius, setPlaces, setLoading, setError);
      }
    );
  }, []);

  const toggleFilter = (type: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleRadiusChange = (newRadius: number) => {
    setRadius(newRadius);
    if (searchLocation) {
      fetchAllServices(searchLocation, newRadius, setPlaces, setLoading, setError);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchByAddress(searchQuery);
    }
  };

  const filteredPlaces = places.filter((place) => activeFilters[place.type]);

  const serviceCounts: Record<string, number> = {};
  Object.keys(serviceTypes).forEach((type) => {
    serviceCounts[type] = places.filter((p) => p.type === type).length;
  });

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-md z-10">
        <h1 className="text-2xl font-bold text-center mb-4">
          Financial Services Finder
        </h1>

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

        {error && (
          <p className="text-red-600 text-center mt-2 transition-all duration-300">
            {error}
          </p>
        )}
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

      {/* Footer */}
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
