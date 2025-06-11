import { useEffect } from "react";
import { useMap } from "react-leaflet";

// Fix: Add proper TypeScript interface with tuple type
interface MapControllerProps {
  center: [number, number] | null;
  radius: number;
}

export default function MapController({ center, radius }: MapControllerProps) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14);
    }
  }, [center, map]);

  // Update map when radius changes
  useEffect(() => {
    if (radius) {
      // Adjust zoom level based on radius
      const zoom = Math.max(15 - Math.log2(radius / 500), 11);
      map.setZoom(zoom);
    }
  }, [radius, map]);

  return null;
}
