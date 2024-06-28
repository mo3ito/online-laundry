import getData from "@/services/getData";
import { LatLongType } from "@/types/neshan-map";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { DistanceTimeType, RouteType, LatLongDriver } from "@/types/neshan-map";

const findDestination = async (
  setIsLoadingForRoutes: Dispatch<SetStateAction<boolean>>,
  latLong: LatLongType,
  setDistanceTime: Dispatch<SetStateAction<DistanceTimeType | null>>,
  setRoutes: Dispatch<SetStateAction<RouteType[]>>,
  latLongDriver?: LatLongDriver
) => {
  try {
    setIsLoadingForRoutes(true);
    const type = "car";
    const origin = latLongDriver
      ? `${latLongDriver.latitude},${latLongDriver.longitude}`
      : "34.083774237954756,49.6975543016356";
    const destination = `${latLong?.latitude},${latLong?.longitude}`;
    const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;
    const url = `https://api.neshan.org/v4/direction/no-traffic?type=${type}&origin=${origin}&destination=${destination}`;
    const response = await getData(url, true, apiKey);
    if (response?.status === 200) {
      setDistanceTime({
        distance: response?.data?.routes[0]?.legs[0]?.distance?.text,
        duration: response?.data?.routes[0]?.legs[0]?.duration?.text,
      });
      setRoutes(response?.data?.routes);
      setIsLoadingForRoutes(false);
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      setIsLoadingForRoutes(false);
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      setIsLoadingForRoutes(false);
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  }
};

export default findDestination;
