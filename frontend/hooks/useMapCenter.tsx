import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";
import { toLonLat } from "ol/proj";
import { NeshanMapRef } from "@neshan-maps-platform/react-openlayers";
import { LatLongType } from "@/types/neshan-map";

const useMapCenter = (
  mapRef: MutableRefObject<NeshanMapRef | null>,
  setLatLong: Dispatch<SetStateAction<LatLongType>>
) => {
  useEffect(() => {
    if (
      mapRef.current &&
      mapRef.current?.map &&
      typeof window !== "undefined"
    ) {
      const map = mapRef.current.map;
      map.on("moveend", () => {
        const view = map.getView();
        const center = view.getCenter();
        if (center) {
          const [longitude, latitude] = toLonLat(center);
          setLatLong({ latitude, longitude });
        }
      });
    }
  }, [mapRef]);
};

export default useMapCenter;
