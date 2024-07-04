import { LatLongType } from "@/types/neshan-map";
import { Dispatch, SetStateAction } from "react";

const findLocationHandler = (
  setLatLong: Dispatch<SetStateAction<LatLongType | null>>
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatLong({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(`Error Code =  ${error.code}  -  ${error.message}`);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

export default findLocationHandler;
