import { LatLongType } from "@/types/neshan-map";
import { Dispatch, SetStateAction } from "react";
import addMarkersToMap from "./addMarksToMap";
import { fromLonLat } from "@neshan-maps-platform/ol/proj";
import { toast } from "react-toastify";

const checkGeolocationPermission = async () => {
  try {
    const permission = await navigator.permissions.query({
      name: "geolocation",
    });
    return permission.state;
  } catch (error) {
    console.error("خطا در بررسی مجوز موقعیت مکانی", error);
    return "denied";
  }
};

const findLocationHandleDriver = async (
  setLatLong: Dispatch<SetStateAction<LatLongType | null>>,
  mapRef: any
) => {
  const permissionState = await checkGeolocationPermission();

  if (permissionState === "granted") {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setLatLong({
            latitude: latitude,
            longitude: longitude,
          });

          const map = mapRef.current.map;
          const view = map.getView();

          view.setCenter(fromLonLat([longitude, latitude]));
          // view.setZoom(15);

          addMarkersToMap(map, { latitude, longitude }, true);
        },
        (error) => {
          console.error(`کد خطا = ${error.code} - ${error.message}`);
          if (error.code === error.PERMISSION_DENIED) {
            toast.warn(
              "لطفاً خدمات موقعیت مکانی را روشن کرده و دسترسی به موقعیت مکانی را در تنظیمات مرورگر خود فعال کنید."
            );
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            toast.warn("اطلاعات موقعیت در دسترس نیست. لطفاً دوباره تلاش کنید.");
          } else if (error.code === error.TIMEOUT) {
            toast.warn(
              "درخواست برای دریافت موقعیت مکانی به پایان رسید. لطفاً دوباره تلاش کنید."
            );
          }
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      toast.warn("مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.");
    }
  } else if (permissionState === "denied") {
    toast.warn(
      "خدمات موقعیت مکانی رد شده است. لطفاً خدمات موقعیت مکانی را روشن کرده و دسترسی به موقعیت مکانی را در تنظیمات مرورگر خود فعال کنید."
    );
  } else if (permissionState === "prompt") {
    toast.warn("لطفا لوکیشن دستگاه خود را روشن کنید");
  } else {
    toast.error("نمی‌توان وضعیت مجوزها را تعیین کرد.");
  }
};

export default findLocationHandleDriver;
