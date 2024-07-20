import { useState, useRef, useEffect } from "react";
import NeshanMap, {
  NeshanMapRef,
} from "@neshan-maps-platform/react-openlayers";
import LoadingPage from "../Loading/LoadingPage";
import { LatLongType } from "@/types/neshan-map";
import findLocationHandler from "@/utils/neshan-map/findLocationHandler";
import "@neshan-maps-platform/ol/css";
import DefaultButton from "../share/defaultButton";

import {
  NeshanDriverProps,
  DistanceTimeType,
  RouteType,
} from "@/types/neshan-map";
import findDestination from "@/utils/neshan-map/findDestination";
import useAddMarkersToMap from "@/hooks/useAddMarkersToMap";
import useShowRouteOnMap from "@/hooks/useShowRouteOnMap";
import defaultCenter from "@/help/defaultCenter";

export default function NeshanDriver({
  latitude,
  longitude,
}: NeshanDriverProps) {
  const [latLong, setLatLong] = useState<LatLongType | null>(null);
  const [distanceTime, setDistanceTime] = useState<DistanceTimeType | null>(
    null
  );
  const [routes, setRoutes] = useState<RouteType[]>([]);
  const [isLoadingForRoutes, setIsLoadingForRoutes] = useState<boolean>(false);
  const mapRef = useRef<NeshanMapRef | null>(null);
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setLatLong({ latitude, longitude });
    }
  }, [latitude, longitude]);
  useAddMarkersToMap(mapRef, latLong);
  useShowRouteOnMap(mapRef, routes);

  if (latLong === null) {
    return <LoadingPage />;
  }

  return (
    <div className="relative w-full h-[91%]">
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
      {distanceTime && (
        <h1 className="w-max h-max p-1 bg-sky-200 absolute top-2 inset-0 max-[280px]:text-xs text-sm">
          <div className="mb-2">
            فاصله تا مقصد:{" "}
            <span className="text-sky-500">
              {distanceTime?.distance || "۰ کیلومتر"}
            </span>
          </div>
          <div className="mb-2">
            زمان تقریبی تا مقصد:{" "}
            <span className="text-sky-500">
              {distanceTime?.duration || `۰ دقیقه`}
            </span>
          </div>
        </h1>
      )}
      <div className="absolute bottom-28 right-4 flex items-center justify-center gap-x-4">
        <button
          onClick={() => findLocationHandler(setLatLong,mapRef)}
          className="size-max bg-white rounded-full  p-2 border border-sky-500"
        >
          <svg
            className="size-6 fill-sky-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path>
          </svg>
        </button>

        <DefaultButton
          svgClassName="fill-white"
          isLoading={isLoadingForRoutes}
          onClick={() =>
            findDestination(
              setIsLoadingForRoutes,
              latLong,
              setDistanceTime,
              setRoutes,
              undefined
            )
          }
          content="مسیریابی"
          className="bg-sky-500 rounded-lg text-white text-sm h-9 w-32 sm:h-12 sm:text-base "
        />
      </div>
    </div>
  );
}
