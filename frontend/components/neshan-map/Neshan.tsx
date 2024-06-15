'use client';
import { useState, useEffect, useRef } from 'react';
import NeshanMap, { NeshanMapRef } from '@neshan-maps-platform/react-openlayers';
import { toLonLat } from 'ol/proj';
import LoadingPage from '../Loading/LoadingPage';

type LatLongType = {
  lat: number;
  long: number;
};

export default function Neshan() {
  const [latLong, setLatLong] = useState<LatLongType | null>(null);
  const [centerLocation, setCenterLocation] = useState({ latitude: 34.09, longitude: 49.71 });
  const mapRef = useRef<NeshanMapRef | null>(null);

  useEffect(() => {
    if (mapRef.current && mapRef.current?.map && typeof window !== 'undefined') {
      const map = mapRef.current.map;
      map.on('moveend', () => {
        const view = map.getView();
        const center = view.getCenter();
        if (center) {
          const [longitude, latitude] = toLonLat(center);
          setLatLong({ lat: latitude, long: longitude });
          setCenterLocation({ latitude, longitude });
        }
      });
    }
  }, [mapRef]);

  const findLocationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenterLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        (error) => {
          console.error('Error Code = ' + error.code + ' - ' + error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  console.log(centerLocation);
  

  return (
    <div className="relative w-full h-[93%]">
      <NeshanMap
        ref={mapRef}
        mapKey="web.1b9b48ae807d4009b26658e973d92ce1"
        defaultType="neshan"
        center={centerLocation}
        style={{ height: '100%', width: '100%' }}
        zoom={13}
        traffic={true}
        poi={true}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <img className="h-10 w-10" src="/images/location.png" alt="Location Marker" />
      </div>
      <button onClick={findLocationHandler} className="absolute bottom-5">
        <img className="size-6" src="/images/location.png" alt="" />
      </button>
      {latLong && (
        <div className="absolute top-0 left-0 m-4 p-2 bg-white rounded shadow">
          <p>Lat: {latLong.lat.toFixed(6)}</p>
          <p>Long: {latLong.long.toFixed(6)}</p>
        </div>
      )}
    </div>
  );
}
