import getData from "@/services/getData";
import { LatLongType } from "@/types/neshan-map";
import { NeshanMapRef } from "@neshan-maps-platform/react-openlayers";
import { fromLonLat } from "ol/proj";
import { Dispatch, FormEvent, MutableRefObject, SetStateAction } from "react";

const submitSearchHandler = async (
  event: FormEvent,
  setIsLoadingSearch: Dispatch<SetStateAction<boolean>>,
  searchInput: string,
  mapRef: MutableRefObject<NeshanMapRef | null>,
  setLatLong: Dispatch<SetStateAction<LatLongType | null>>,
  latLong: LatLongType | null
) => {
  event.preventDefault();
  if (!searchInput.trim()) return;

  try {
    setIsLoadingSearch(true);
    const response = await getData(
      `https://api.neshan.org/v1/search?term=${searchInput}&lat=${latLong?.latitude}&lng=${latLong?.longitude}`,
      true,
      process.env.NEXT_PUBLIC_MAP_API_KEY
    );

    if (response?.status === 200) {
      const data = response?.data;

      if (data.items && data.items.length > 0) {
        const { location } = data.items[0];
        const newCenter = fromLonLat([location.x, location.y]);

        if (mapRef.current && mapRef.current.map) {
          const view = mapRef.current.map.getView();
          view.setCenter(newCenter);
          setLatLong({ latitude: location.y, longitude: location.x });
        }
        setIsLoadingSearch(false);
      } else {
        setIsLoadingSearch(false);
        console.error("Location not found");
      }
    }
  } catch (error) {
    setIsLoadingSearch(false);
    console.error("Error fetching location:", error);
  }
};

export default submitSearchHandler;
