
"use client"
export default function ServiceFilters({ serviceTypes, activeFilters, toggleFilter }) {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {Object.entries(serviceTypes).map(([type, info]) => (
        <button
          key={type}
          onClick={() => toggleFilter(type)}
          className={`text-xs px-2 py-1 rounded flex items-center ${
            activeFilters[type] 
              ? `bg-${info.color.slice(1)} text-white` 
              : "bg-gray-200 text-gray-700"
          }`}
          style={{ backgroundColor: activeFilters[type] ? info.color : undefined }}
        >
          <span className="mr-1">{info.name}</span>
          <div className="w-2 h-2 rounded-full bg-white"></div>
        </button>
      ))}
    </div>
  );
}