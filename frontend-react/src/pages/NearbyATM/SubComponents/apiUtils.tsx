import { serviceTypes } from "./markerUtils";

// Utility function to add delay between requests
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to safely fetch from Overpass API with retry logic
export const safeOverpassFetch = async (url, retries = 3, delayTime = 2000) => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // Add exponential backoff delay after first attempt
      if (attempt > 0) {
        await delay(delayTime * Math.pow(2, attempt - 1));
      }

      const response = await fetch(url);
      
      // Check if rate limited (429)
      if (response.status === 429) {
        console.warn(`Rate limited by Overpass API, waiting before retry (attempt ${attempt + 1}/${retries})`);
        continue; // Try again after delay
      }
      
      // Check for other error status codes
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
      }
      
      // Check if response is actually JSON (Overpass sometimes returns XML error messages)
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Received non-JSON response from Overpass API");
      }
      
      return await response.json();
    } catch (error) {
      // On last attempt, throw the error
      if (attempt === retries - 1) {
        throw error;
      }
      
      console.warn(`Overpass API fetch failed, retrying (attempt ${attempt + 1}/${retries}): ${error.message}`);
    }
  }
};

// Fetch data from Overpass API for a specific service type
export const fetchServiceData = async (lat, lon, radius, serviceType) => {
  try {
    // Build the main query
    const query = `[out:json];
      ${serviceTypes[serviceType].query}(around:${radius},${lat},${lon});
      out body;`;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    const data = await safeOverpassFetch(url);

    let results = data.elements.map((el) => ({
      id: `${serviceType}_${el.id}`,
      lat: el.lat,
      lon: el.lon,
      name: el.tags?.name || `${serviceTypes[serviceType].name} (Unnamed)`,
      type: serviceType,
      address: el.tags?.["addr:street"] 
        ? `${el.tags?.["addr:housenumber"] || ""} ${el.tags?.["addr:street"] || ""}, ${el.tags?.["addr:city"] || ""}`
        : "Address not available",
      operator: el.tags?.operator || "Unknown operator",
      opening_hours: el.tags?.opening_hours || "Hours not available",
    }));

    // If there are alternative queries defined and the main query returned few results,
    // try the alternative queries - but sequentially to avoid rate limiting
    if (serviceTypes[serviceType].alternativeQueries && results.length < 5) {
      const alternativeResults = [];
      
      for (const altQuery of serviceTypes[serviceType].alternativeQueries) {
        // Add delay between queries to avoid rate limiting
        await delay(1000);
        
        const altQueryFull = `[out:json];
          ${altQuery}(around:${radius},${lat},${lon});
          out body;`;
        const altUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(altQueryFull)}`;
        
        try {
          const altData = await safeOverpassFetch(altUrl);
          
          const altResults = altData.elements.map((el) => ({
            id: `${serviceType}_alt_${el.id}`,
            lat: el.lat,
            lon: el.lon,
            name: el.tags?.name || `${serviceTypes[serviceType].name} (Unnamed)`,
            type: serviceType,
            address: el.tags?.["addr:street"] 
              ? `${el.tags?.["addr:housenumber"] || ""} ${el.tags?.["addr:street"] || ""}, ${el.tags?.["addr:city"] || ""}`
              : "Address not available",
            operator: el.tags?.operator || "Unknown operator",
            opening_hours: el.tags?.opening_hours || "Hours not available",
          }));
          
          alternativeResults.push(...altResults);
        } catch (error) {
          console.error(`Failed to fetch alternative query for ${serviceType}:`, error);
          // Continue with other queries even if this one failed
        }
      }
      
      // Combine and deduplicate results
      const allResults = [...results, ...alternativeResults];
      const seenIds = new Set();
      const seenLocations = new Set();
      
      results = allResults.filter(place => {
        const locationKey = `${place.lat.toFixed(6)},${place.lon.toFixed(6)}`;
        if (seenIds.has(place.id) || seenLocations.has(locationKey)) {
          return false;
        }
        seenIds.add(place.id);
        seenLocations.add(locationKey);
        return true;
      });
    }
    
    return results;
  } catch (error) {
    console.error(`Failed to fetch ${serviceType}:`, error);
    return [];
  }
};

// Fetch all service types
export const fetchAllServices = async (locationCoords, searchRadius, setPlaces, setLoading, setError) => {
  setLoading(true);
  setPlaces([]);
  setError(null);
  
  try {
    // Fetch services sequentially to avoid rate limiting
    const allServices = [];
    
    for (const type of Object.keys(serviceTypes)) {
      try {
        // Show user which service we're currently loading
        setError(`Loading ${serviceTypes[type].name}...`);
        
        // Add a small delay between service types to avoid rate limiting
        if (allServices.length > 0) {
          await delay(1500);
        }
        
        const results = await fetchServiceData(
          locationCoords[0], 
          locationCoords[1], 
          searchRadius,
          type
        );
        
        allServices.push(...results);
        
        // Update places as we go to show progress
        setPlaces(prev => [...prev, ...results]);
      } catch (err) {
        console.error(`Error fetching ${type}:`, err);
        // Continue with other service types even if this one failed
      }
    }
    
    setError(null);
  } catch (err) {
    setError("Failed to load financial services data");
    console.error("Error fetching services:", err);
  } finally {
    setLoading(false);
  }
};