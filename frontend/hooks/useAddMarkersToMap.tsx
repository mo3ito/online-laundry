import { MutableRefObject, useEffect } from "react";
import addMarkersToMap from "@/utils/neshan-map/addMarksToMap";
import { NeshanMapRef } from "@neshan-maps-platform/react-openlayers";
import { LatLongType } from "@/types/neshan-map";

const useAddMarkersToMap = (
  mapRef: MutableRefObject<NeshanMapRef | null>,
  latLong: LatLongType | null
) => {
  useEffect(() => {
    if (mapRef.current?.map && latLong) {
      addMarkersToMap(mapRef.current.map, latLong);
    }
  }, [mapRef.current, latLong]);
};

export default useAddMarkersToMap;
