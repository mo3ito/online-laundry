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
import { Style, Icon, } from '@neshan-maps-platform/ol/style';
import '@neshan-maps-platform/ol/css';
import { Map as NeshanMapType } from '@neshan-maps-platform/ol'; // Import the correct Map type

const defaultCenter: LatLongType = {
  latitude: 34.083774237954756,
  longitude: 49.6975543016356,
};

type NeshanDriverProps = {
  latitude: number | null;
  longitude: number | null;
};

export default function NeshanDriver({ latitude, longitude }: NeshanDriverProps) {
  const [latLong, setLatLong] = useState<LatLongType | null>(null);
  const mapRef = useRef<NeshanMapRef | null>(null);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setLatLong({ latitude, longitude });
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (mapRef.current?.map) {
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
            anchor: [0.5, 1],
            scale: 0.5,
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
  }

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
    </div>
  );
}
