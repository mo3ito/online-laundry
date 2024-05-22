import { MapComponent, MapTypes } from "@neshan-maps-platform/mapbox-gl-react";
import "@neshan-maps-platform/mapbox-gl-react/dist/style.css";
import nmp_mapboxgl from '@neshan-maps-platform/mapbox-gl';

export default function NeshanMap() {

  return (
    <MapComponent
      options={{
        mapKey: "web.1b9b48ae807d4009b26658e973d92ce1",
        mapType: MapTypes.neshanVector,
        center: [49.71, 34.09],
        zoom:12,
        traffic:true,
        poi: true,
      }}
      
    />
  );
}
