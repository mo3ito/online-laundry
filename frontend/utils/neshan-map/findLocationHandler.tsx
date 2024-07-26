import { LatLongType } from "@/types/neshan-map";
import { Dispatch, SetStateAction } from "react";
import addMarkersToMap from "./addMarksToMap";
import { fromLonLat } from "@neshan-maps-platform/ol/proj";
import { toast } from "react-toastify";

const checkGeolocationPermission = async (): Promise<PermissionState | null> => {
  try {
    const permission = await navigator.permissions.query({ name: "geolocation" });
    return permission.state;
  } catch (error) {
    console.error("خطا در بررسی مجوز موقعیت مکانی", error);
    return null;
  }
};

const handleGeolocationError = (error: GeolocationPositionError) => {
  console.error(`کد خطا = ${error.code} - ${error.message}`);
  switch (error.code) {
    case error.PERMISSION_DENIED:
      toast.warn("لطفاً خدمات موقعیت مکانی را روشن کرده و دسترسی به موقعیت مکانی را در تنظیمات مرورگر خود فعال کنید.");
      break;
    case error.POSITION_UNAVAILABLE:
      toast.warn("اطلاعات موقعیت در دسترس نیست. لطفاً دوباره تلاش کنید.");
      break;
    case error.TIMEOUT:
      toast.warn("درخواست برای دریافت موقعیت مکانی به پایان رسید. لطفاً دوباره تلاش کنید.");
      break;
    default:
      toast.error("خطای ناشناخته‌ای رخ داده است.");
  }
};

const updateMapLocation = (
  setLatLong: Dispatch<SetStateAction<LatLongType | null>>,
  mapRef: any,
  latitude: number,
  longitude: number
) => {
  setLatLong({ latitude, longitude });

  const map = mapRef.current.map;
  const view = map.getView();

  view.setCenter(fromLonLat([longitude, latitude]));
  view.setZoom(15);

  addMarkersToMap(map, { latitude, longitude }, true);
};

const findLocationHandler = async (
  setLatLong: Dispatch<SetStateAction<LatLongType | null>>,
  mapRef: any
) => {
  const permissionState = await checkGeolocationPermission();

  if (permissionState === "granted") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateMapLocation(setLatLong, mapRef, latitude, longitude);
        },
        handleGeolocationError
      );
    } else {
      toast.warn("مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.");
    }
  } else if (permissionState === "denied") {
    toast.warn("خدمات موقعیت مکانی رد شده است. لطفاً خدمات موقعیت مکانی را روشن کرده و دسترسی به موقعیت مکانی را در تنظیمات مرورگر خود فعال کنید.");
  } else if (permissionState === "prompt") {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateMapLocation(setLatLong, mapRef, latitude, longitude);
        },
        handleGeolocationError
      );
    } else {
      toast.warn("مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.");
    }
  } else {
    toast.error("نمی‌توان وضعیت مجوزها را تعیین کرد.");
  }
};

export default findLocationHandler;
