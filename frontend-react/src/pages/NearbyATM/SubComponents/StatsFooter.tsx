// Fix: Remove unused React import

// Fix: Add proper TypeScript interfaces
interface Place {
  id: string;
  lat: number;
  lon: number;
  name: string;
  type: string;
  address: string;
  operator: string;
  opening_hours: string;
}

interface ServiceType {
  name: string;
  icon: any;
  color: string;
  query: string;
  alternativeQueries?: string[];
}

interface StatsFooterProps {
  filteredPlaces: Place[];
  radius: number;
  serviceTypes: Record<string, ServiceType>;
  activeFilters: Record<string, boolean>;
  serviceCounts: Record<string, number>;
}

export default function StatsFooter({ filteredPlaces, radius, serviceTypes, activeFilters, serviceCounts }: StatsFooterProps) {
  return (
    <div className="bg-gray-100 p-2 flex justify-between items-center text-sm border-t">
      <div>
        Found: <strong>{filteredPlaces.length}</strong> services within {radius/1000}km
      </div>
      <div className="flex gap-1 flex-wrap">
        {Object.entries(serviceTypes)
          .filter(([type]) => activeFilters[type] && serviceCounts[type] > 0)
          .map(([type, info]: [string, ServiceType]) => (
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
