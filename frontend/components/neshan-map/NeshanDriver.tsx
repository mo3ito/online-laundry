'use client';
import { useState, useRef, useEffect } from "react";
import NeshanMap, { NeshanMapRef } from "@neshan-maps-platform/react-openlayers";
import LoadingPage from "../Loading/LoadingPage";
import { LatLongType } from "@/types/neshan-map";
import { fromLonLat } from '@neshan-maps-platform/ol/proj';
import VectorLayer from '@neshan-maps-platform/ol/layer/Vector';
import VectorSource from '@neshan-maps-platform/ol/source/Vector';
import Feature from '@neshan-maps-platform/ol/Feature';
import Point from '@neshan-maps-platform/ol/geom/Point';
import LineString from '@neshan-maps-platform/ol/geom/LineString';
import { Style, Icon, Stroke, Circle, Fill } from '@neshan-maps-platform/ol/style';
import '@neshan-maps-platform/ol/css';
import { Map as NeshanMapType } from '@neshan-maps-platform/ol';
import DefaultButton from "../share/defaultButton";
import getData from "@/services/getData";

const defaultCenter: LatLongType = {
  latitude: 34.083774237954756,
  longitude: 49.6975543016356,
};

type NeshanDriverProps = {
  latitude: number | null;
  longitude: number | null;
};

type distanceTimeType = {
  distance: string;
  duration: string;
};

type StepType = {
  polyline: string;
  start_location: [number, number];
};

type LegType = {
  steps: StepType[];
};

type RouteType = {
  legs: LegType[];
};

export default function NeshanDriver({ latitude, longitude }: NeshanDriverProps) {
  const [latLong, setLatLong] = useState<LatLongType | null>(null);
  const [distanceTime, setDistanceTime] = useState<distanceTimeType | null>(null);
  const [routes, setRoutes] = useState<RouteType[]>([]);
  const mapRef = useRef<NeshanMapRef | null>(null);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setLatLong({ latitude, longitude });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (mapRef.current?.map && latLong) {
      addMarkersToMap(mapRef.current.map, latLong);
    }
  }, [mapRef.current, latLong]);

  const addMarkersToMap = (neshanMap: NeshanMapType, latLong: LatLongType | null) => {
    const markers = [];
    if (latLong) {
      markers.push({
        coordinates: [latLong.longitude, latLong.latitude],
        style: new Style({
          image: new Icon({
            anchor: [0.5, 0.5],
            scale: 0.4,
            src: '/images/location.png'
          })
        })
      });
    }

    const features = markers.map(marker => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(marker.coordinates)),
      });
      feature.setStyle(marker.style);
      return feature;
    });

    const vectorSource = new VectorSource({ features });
    const vectorLayer = new VectorLayer({ source: vectorSource });

    neshanMap.addLayer(vectorLayer);
  };

  const decodePolyline = (encoded: string): [number, number][] => {
    const points: [number, number][] = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const deltaLng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += deltaLng;

      points.push([lat / 1e5, lng / 1e5]);
    }

    return points;
  };

  const findDestinate = async () => {
    try {
      const type = "car";
      const origin = "34.083774237954756,49.6975543016356";
      const destination = `${latLong?.latitude},${latLong?.longitude}`;
      const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;
      const url = `https://api.neshan.org/v4/direction/no-traffic?type=${type}&origin=${origin}&destination=${destination}`;
      const response = await getData(url, true, apiKey);
      setDistanceTime({
        distance: response?.data?.routes[0]?.legs[0]?.distance?.text,
        duration: response?.data?.routes[0]?.legs[0]?.duration?.text
      });
      setRoutes(response?.data?.routes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (routes.length > 0 && mapRef.current?.map) {
      const neshanMap = mapRef.current.map;

      let trackStyle = new Style({
        stroke: new Stroke({
          width: 12,
          color: "#250ECDCC",
        }),
      });

      let pointStyle = new Style({
        image: new Circle({
          fill: new Fill({
            color: '#0077FF',
          }),
          stroke: new Stroke({
            color: '#FFFFFF',
            width: 2
          }),
          radius: 5,
        }),
      });

      routes.forEach((route: RouteType) => {
        route.legs.forEach((leg: LegType) => {
          leg.steps.forEach((step: StepType) => {
            const decodedPoints = decodePolyline(step.polyline).map(point => fromLonLat([point[1], point[0]]));

            const routeFeature = new Feature<LineString>({
              geometry: new LineString(decodedPoints),
            });

            routeFeature.setStyle(trackStyle);

            const pointFeature = new Feature<Point>({
              geometry: new Point(fromLonLat(step.start_location)),
            });

            pointFeature.setStyle(pointStyle);

            const routeVectorSource = new VectorSource({ features: [routeFeature] });
            const pointVectorSource = new VectorSource({ features: [pointFeature] });

            const routeVectorLayer = new VectorLayer({ source: routeVectorSource });
            const pointVectorLayer = new VectorLayer({ source: pointVectorSource });

            neshanMap.addLayer(routeVectorLayer);
            neshanMap.addLayer(pointVectorLayer);
          });
        });
      });
    }
  }, [routes]);

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
          <div className="mb-2">فاصله تا مقصد: <span className="text-sky-500">{distanceTime?.distance}</span></div>
          <div className="mb-2">زمان تقریبی تا مقصد: <span className="text-sky-500">{distanceTime?.duration}</span></div>
        </h1>
      )}
      <DefaultButton onClick={findDestinate} content="مسیریابی" className="bg-sky-500 rounded-lg text-white text-sm h-9 w-32 sm:h-12 sm:text-base absolute bottom-16 right-4" />
    </div>
  );
}
