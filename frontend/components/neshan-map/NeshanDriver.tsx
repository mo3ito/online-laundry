"use client";
import { useState, useRef, useCallback, ChangeEvent, useEffect } from "react";
import NeshanMap, {
  NeshanMapRef,
} from "@neshan-maps-platform/react-openlayers";
import LoadingPage from "../Loading/LoadingPage";
import useOrderCardContext from "@/hooks/useOrderCardContext";
import useAuthContext from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import DefaultButton from "../share/defaultButton";
import { LatLongType } from "@/types/neshan-map";
import confirmAddressHandler from "@/app/utils/neshan-map/confirmAddressHandler";
import findLocationHandler from "@/app/utils/neshan-map/findLocationHandler";
import submitSearchHandler from "@/app/utils/neshan-map/submitSearchHandler";
import useMapCenter from "@/hooks/useMapCenter";
import { toLonLat } from "ol/proj";

const defaultCenter: LatLongType = {
  latitude: 34.083774237954756,
  longitude: 49.6975543016356,
};

type NeshanDriverProps = {
  latitude: number | null;
  longitude: number | null;
};

export default function NeshanDriver({
  latitude,
  longitude,
}: NeshanDriverProps) {
  const [latLong, setLatLong] = useState<LatLongType | null>(null);
  const mapRef = useRef<NeshanMapRef | null>(null);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setLatLong({ latitude, longitude });
    }
  }, [latitude, longitude]);

 



  if (latLong === null) {
    return <LoadingPage />;
  }

  return (
    <div className="relative w-full h-[94%]">
      <NeshanMap
        ref={mapRef}
        mapKey="web.1b9b48ae807d4009b26658e973d92ce1"
        defaultType="neshan"
        center={latLong || defaultCenter}
        style={{ height: "100%", width: "100%" }}
        zoom={15}
        traffic={true}
        poi={true}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <img
          className="h-10 w-10"
          src="/images/location.png"
          alt="Location Marker"
        />
      </div>
    </div>
  );
}
