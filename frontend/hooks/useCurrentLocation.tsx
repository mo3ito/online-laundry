import { LatLongType } from "@/types/neshan-map";
import { useEffect, useState } from "react";

const useCurrentLocation = () => {
  const [location, setLocation] = useState<LatLongType | null>(null);

  useEffect(() => {
    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    const handleError = (error: GeolocationPositionError) => {
      console.error("Error getting current position:", error);
    };

    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return location;
};

export default useCurrentLocation;
