'use client';
import { useState, useEffect, useRef } from 'react';
import NeshanMap, { NeshanMapRef } from '@neshan-maps-platform/react-openlayers';
import { toLonLat } from 'ol/proj';
import LoadingPage from '../Loading/LoadingPage';
import useOrderCardContext from '@/hooks/useOrderCardContext';

type LatLongType = {
  latitude: number;
  longitude: number;
};

export default function Neshan() {
  const [latLong, setLatLong] = useState<LatLongType>({ latitude: 34.099526, longitude: 49.691117 });
  const {setOrdersAddress , ordersAddress} = useOrderCardContext()
  const mapRef = useRef<NeshanMapRef | null>(null);

  useEffect(() => {
    if (mapRef.current && mapRef.current?.map && typeof window !== 'undefined') {
      const map = mapRef.current.map;
      map.on('moveend', () => {
        const view = map.getView();
        const center = view.getCenter();
        if (center) {
          const [longitude, latitude] = toLonLat(center);
          setLatLong({  latitude,longitude });
          
        }
      });
    }
  }, [mapRef]);

  const findLocationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatLong({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        (error) => {
          console.error('Error Code = ' + error.code + ' - ' + error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  console.log(latLong);

  console.log(ordersAddress);
  

  const confirmAddressHandler = ()=>{
    setOrdersAddress({ latitude: latLong.latitude , longitude: latLong.longitude})
  }
  

  return (
    <div className="relative w-full h-[94%]">
      <NeshanMap
        ref={mapRef}
        mapKey="web.1b9b48ae807d4009b26658e973d92ce1"
        defaultType="neshan"
        center={latLong}
        style={{ height: '100%', width: '100%' }}
        zoom={13}
        traffic={true}
        poi={true}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <img className="h-10 w-10" src="/images/location.png" alt="Location Marker" />
      </div>
      

    <div className='absolute bottom-10 right-4 flex items-center justify-center gap-x-4'>
    <button onClick={findLocationHandler} className="size-max bg-white rounded-full  p-2 border border-sky-500" >
      <svg className='size-6 fill-sky-500' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"></path></svg>
      </button>

      <button onClick={confirmAddressHandler} className='bg-sky-500 rounded-lg text-white  w-28 h-12'>تایید آدرس</button>
    </div>
    </div>
  );
}
