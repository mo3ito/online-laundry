import { useState, useRef, useEffect } from "react";
import NeshanMap, { NeshanMapRef } from "@neshan-maps-platform/react-openlayers";
import LoadingPage from "../Loading/LoadingPage";
import { LatLongType } from "@/types/neshan-map";
import { fromLonLat } from '@neshan-maps-platform/ol/proj';
import VectorLayer from '@neshan-maps-platform/ol/layer/Vector';
import VectorSource from '@neshan-maps-platform/ol/source/Vector';
import Feature from '@neshan-maps-platform/ol/Feature';
import Point from '@neshan-maps-platform/ol/geom/Point';
import { Style, Icon, Stroke, Circle, Fill } from '@neshan-maps-platform/ol/style';
import '@neshan-maps-platform/ol/css';
import { Map as NeshanMapType } from '@neshan-maps-platform/ol';
import DefaultButton from "../share/defaultButton";
import getData from "@/services/getData";
import Polyline from '@neshan-maps-platform/ol/format/Polyline';
import { toast } from "react-toastify";

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
  const [isLoadingForRoutes , setIsLoadingForRoutes]=useState<boolean>(false)
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

  const findDestinate = async () => {
    try {
      setIsLoadingForRoutes(true)
      const type = "car";
      const origin = "34.083774237954756,49.6975543016356";
      const destination = `${latLong?.latitude},${latLong?.longitude}`;
      const apiKey = process.env.NEXT_PUBLIC_MAP_API_KEY;
      const url = `https://api.neshan.org/v4/direction/no-traffic?type=${type}&origin=${origin}&destination=${destination}`;
      const response = await getData(url, true, apiKey);
      if(response?.status ===200){
        setDistanceTime({
          distance: response?.data?.routes[0]?.legs[0]?.distance?.text,
          duration: response?.data?.routes[0]?.legs[0]?.duration?.text
        });
        setRoutes(response?.data?.routes);
        setIsLoadingForRoutes(false)
      }

    }catch (error: any) {
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

      for (let k = 0; k < routes.length; k++) {
        for (let j = 0; j < routes[k].legs.length; j++) {
            for (let i = 0; i < routes[k].legs[j].steps.length; i++) {

                let step = routes[k].legs[j].steps[i];

                let route = new Polyline().readGeometry(step["polyline"], {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857',
                });

                let point = new Feature({
                    geometry: new Point(fromLonLat(step["start_location"]))
                });

                point.setStyle(pointStyle);

                let feature = new Feature({
                    type: 'route',
                    geometry: route,
                });

                feature.setStyle(trackStyle);

                let routeVectorSource = new VectorSource({
                    features: [feature, point]
                });

                let routeVectorLayer = new VectorLayer({
                    source: routeVectorSource
                });

                neshanMap.addLayer(routeVectorLayer);

            }
        }
    }
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
      <DefaultButton svgClassName="fill-white" isLoading={isLoadingForRoutes} onClick={findDestinate} content="مسیریابی" className="bg-sky-500 rounded-lg text-white text-sm h-9 w-32 sm:h-12 sm:text-base absolute bottom-16 right-4" />
    </div>
  );
}
