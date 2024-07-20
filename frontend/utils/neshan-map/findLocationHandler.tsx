import { LatLongType } from "@/types/neshan-map";
import { Dispatch, SetStateAction } from "react";

const findLocationHandler = (
  setLatLong: Dispatch<SetStateAction<LatLongType | null>>,
  mapRef: any
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatLong({
          latitude: latitude,
          longitude: longitude,
        });

        const map = mapRef.current.map;
        const view = map.getView();

        // انتقال مرکز نقشه به موقعیت جدید
        view.setCenter([longitude, latitude]);
        view.setZoom(15); // این خط برای زوم کردن به موقعیت جدید است، می‌توانید مقدار زوم را تغییر دهید.
      },
      (error) => {
        console.error(`Error Code = ${error.code} - ${error.message}`);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
};

export default findLocationHandler;