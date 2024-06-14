'use client'
import { MapComponent, MapTypes } from "@neshan-maps-platform/mapbox-gl-react";
import "@neshan-maps-platform/mapbox-gl-react/dist/style.css";
import nmp_mapboxgl from '@neshan-maps-platform/mapbox-gl';
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Map } from "@neshan-maps-platform/ol";
import { fromLonLat, toLonLat } from 'ol/proj';
import NeshanMap, { NeshanMapRef  } from "@neshan-maps-platform/react-openlayers";
import LoadingPage from "../Loading/LoadingPage";

type LatLongType = {
  lat: number,
  long: number
}


export default function Neshan() {

  const [address, setAddress] = useState();
  const [latLong , setLatLong]=useState<LatLongType | null>(null)
  const [clicked , setclicked]=useState(false)
  const [centerLocation , setCenterLocation]=useState({ latitude: 34.09, longitude: 49.71 })
  const mapRef = useRef<NeshanMapRef | null>(null);
  const locationButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (mapRef && mapRef.current && mapRef.current?.map && typeof window !== 'undefined') {
      mapRef.current.map.switchTrafficLayer(true);

      mapRef.current.map.on('click', function (event) {
     
        
            const coordinates = event.coordinate;
            const [longitude, latitude] = toLonLat(coordinates);
            setLatLong({ lat: latitude, long: longitude });
            setclicked(false)
          
          
        

      });
    }
  }, [mapRef]);
  
  const loacationHandler = ()=>{
    setclicked(true)
  }

  const findLocationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenterLocation({latitude:position.coords.latitude , longitude:position.coords.longitude})
        },
        (error) => {
          console.error('Error Code = ' + error.code + ' - ' + error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  

  console.log(latLong);
  

  return (
    <div className="relative w-full h-[90%]">
    <NeshanMap
      ref={mapRef}
      mapKey="web.1b9b48ae807d4009b26658e973d92ce1"
      defaultType="neshan"
      center={centerLocation}
      style={{ height: "100%", width: "100%" }}
      zoom={13}
      traffic={true}
      poi={true}
    /> 
    <button onClick={loacationHandler} ref={locationButtonRef} className="bg-red-300  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-10 absolute ">
    <img  className="size-full" src="/images/location.png" alt="" />
    </button>

    <button onClick={findLocationHandler} className="absolute bottom-5">
    <img  className="size-6" src="/images/location.png" alt="" />
    </button>
    </div>
  );
}
