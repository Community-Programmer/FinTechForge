import L from "leaflet";

// Create custom colored markers using the CDN URL
// Fix: Add proper typing for color parameter
export const createColoredIcon = (color: string) => {
  return new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    // Apply color filter to the icon
    className: `colored-marker-${color}`,
  });
};

// Inject CSS to create colored markers
export const injectMarkerStyles = () => {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .colored-marker-blue { filter: hue-rotate(0deg); }
    .colored-marker-purple { filter: hue-rotate(270deg); }
    .colored-marker-green { filter: hue-rotate(120deg); }
    .colored-marker-red { filter: hue-rotate(330deg); }
    .colored-marker-orange { filter: hue-rotate(30deg); }
    .colored-marker-lime { filter: hue-rotate(90deg); }
    .colored-marker-cyan { filter: hue-rotate(180deg); }
    .colored-marker-yellow { filter: hue-rotate(60deg); }
  `;
  document.head.appendChild(styleElement);
};

// Service type definitions with improved queries
export const serviceTypes = {
  atm: {
    name: "ATMs",
    icon: createColoredIcon("blue"),
    color: "#2563eb", // Blue
    query: 'node["amenity"="atm"]',
  },
  crypto_atm: {
    name: "Crypto ATMs",
    icon: createColoredIcon("purple"),
    color: "#7c3aed", // Purple
    query: 'node["amenity"="atm"]["cryptocurrency"="yes"]',
    // Added alternative queries to catch more crypto ATMs
    alternativeQueries: [
      'node["amenity"="atm"]["currency:XBT"="yes"]',
      'node["amenity"="atm"]["bitcoin"="yes"]',
      'node["amenity"="bitcoin_atm"]'
    ]
  },
  bank: {
    name: "Banks",
    icon: createColoredIcon("green"),
    color: "#059669", // Green
    query: 'node["amenity"="bank"]',
  },
  accountant: {
    name: "Accountants",
    icon: createColoredIcon("red"),
    color: "#b91c1c", // Red
    query: 'node["office"="accountant"]',
    // Added alternative queries to catch more accountants
    alternativeQueries: [
      'node["shop"="accountant"]',
      'node["amenity"="accountant"]'
    ]
  },
  financial_advisor: {
    name: "Financial Advisors",
    icon: createColoredIcon("orange"),
    color: "#c2410c", // Orange
    query: 'node["office"="financial"]',
    // Added alternative queries for financial advisors
    alternativeQueries: [
      'node["office"="financial_advisor"]',
      'node["office"="financial_service"]',
      'node["shop"="financial"]'
    ]
  },
  tax_advisor: {
    name: "Tax Advisors",
    icon: createColoredIcon("lime"),
    color: "#4d7c0f", // Lime
    query: 'node["office"="tax"]',
    // Added alternative queries for tax advisors
    alternativeQueries: [
      'node["office"="tax_advisor"]',
      'node["amenity"="tax"]',
      'node["shop"="tax"]'
    ]
  },
  bureau_de_change: {
    name: "Currency Exchange",
    icon: createColoredIcon("cyan"),
    color: "#7e22ce", // Purple
    query: 'node["amenity"="bureau_de_change"]',
    // Added alternative query
    alternativeQueries: [
      'node["shop"="money_exchange"]',
      'node["amenity"="money_exchange"]'
    ]
  },
  insurance: {
    name: "Insurance",
    icon: createColoredIcon("yellow"),
    color: "#0891b2", // Cyan
    query: 'node["office"="insurance"]',
  },
};