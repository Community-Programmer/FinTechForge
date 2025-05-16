import React from "react";

export default function RadiusSelector({ radius, handleRadiusChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1">Search Radius: {radius/1000} km</label>
      <input
        type="range"
        min="500"
        max="5000"
        step="500"
        value={radius}
        onChange={(e) => handleRadiusChange(parseInt(e.target.value))}
        className="w-full"
      />
    </div>
  );
}