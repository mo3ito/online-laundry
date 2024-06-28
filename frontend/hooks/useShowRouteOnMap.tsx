import { MutableRefObject, useEffect } from "react";
import VectorLayer from "@neshan-maps-platform/ol/layer/Vector";
import VectorSource from "@neshan-maps-platform/ol/source/Vector";
import Feature from "@neshan-maps-platform/ol/Feature";
import Point from "@neshan-maps-platform/ol/geom/Point";
import { Style, Stroke, Circle, Fill } from "@neshan-maps-platform/ol/style";
import Polyline from "@neshan-maps-platform/ol/format/Polyline";
import { fromLonLat } from "@neshan-maps-platform/ol/proj";
import { NeshanMapRef } from "@neshan-maps-platform/react-openlayers";
import { RouteType } from "@/types/neshan-map";

const useShowRouteOnMap = (
  mapRef: MutableRefObject<NeshanMapRef | null>,
  routes: RouteType[]
) => {
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
            color: "#0077FF",
          }),
          stroke: new Stroke({
            color: "#FFFFFF",
            width: 2,
          }),
          radius: 5,
        }),
      });

      for (let k = 0; k < routes.length; k++) {
        for (let j = 0; j < routes[k].legs.length; j++) {
          for (let i = 0; i < routes[k].legs[j].steps.length; i++) {
            let step = routes[k].legs[j].steps[i];

            let route = new Polyline().readGeometry(step["polyline"], {
              dataProjection: "EPSG:4326",
              featureProjection: "EPSG:3857",
            });

            let point = new Feature({
              geometry: new Point(fromLonLat(step["start_location"])),
            });

            point.setStyle(pointStyle);

            let feature = new Feature({
              type: "route",
              geometry: route,
            });

            feature.setStyle(trackStyle);

            let routeVectorSource = new VectorSource({
              features: [feature, point],
            });

            let routeVectorLayer = new VectorLayer({
              source: routeVectorSource,
            });

            neshanMap.addLayer(routeVectorLayer);
          }
        }
      }
    }
  }, [routes]);
};

export default useShowRouteOnMap;
