import React from "react";

export default function StatsFooter({ filteredPlaces, radius, serviceTypes, activeFilters, serviceCounts }) {
  return (
    <div className="bg-gray-100 p-2 flex justify-between items-center text-sm border-t">
      <div>
        Found: <strong>{filteredPlaces.length}</strong> services within {radius/1000}km
      </div>
      <div className="flex gap-1 flex-wrap">
        {Object.entries(serviceTypes)
          .filter(([type]) => activeFilters[type] && serviceCounts[type] > 0)
          .map(([type, info]) => (
            <div key={type} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-1" 
                style={{ backgroundColor: info.color }}
              ></div>
              <span className="text-xs mr-2">{info.name}: {serviceCounts[type]}</span>
            </div>
          ))}
      </div>
    </div>
  );
}