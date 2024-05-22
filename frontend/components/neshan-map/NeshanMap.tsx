import {MapComponent, MapTypes} from "@neshan-maps-platform/mapbox-gl-react";
import "@neshan-maps-platform/mapbox-gl-react/dist/style.css";

export default function NeshanMap() {
  return (
    <MapComponent options={{mapKey: "web.1af74fb7839340b9a4c4c840ae10f1f8", mapType: MapTypes.neshanRasterNight}}/>
  )
}
