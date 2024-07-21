import { LatLongType } from "@/types/neshan-map";
import { Style, Icon, Circle as CircleStyle, Fill } from "@neshan-maps-platform/ol/style";
import Feature from "@neshan-maps-platform/ol/Feature";
import Point from "@neshan-maps-platform/ol/geom/Point";
import { fromLonLat } from "@neshan-maps-platform/ol/proj";
import VectorLayer from "@neshan-maps-platform/ol/layer/Vector";
import VectorSource from "@neshan-maps-platform/ol/source/Vector";
import { Map as NeshanMapType } from "@neshan-maps-platform/ol";
import Geometry from "@neshan-maps-platform/ol/geom/Geometry";

let markerLayer: VectorLayer<VectorSource<Geometry>> | null = null;

const addMarkersToMap = (
  neshanMap: NeshanMapType,
  latLong: LatLongType | null ,
  isCircle?: boolean
) => {
  if (markerLayer) {
    neshanMap.removeLayer(markerLayer);
  }

  const markers = [];
  if (latLong) {
    markers.push({
      coordinates: [latLong.longitude, latLong.latitude],
      style: new Style({
        image: isCircle
          ? new CircleStyle({
              radius: 10,
              fill: new Fill({
                color: 'rgba(0, 0, 255, 0.5)',
              }),
            })
          : new Icon({
              anchor: [0.5, 0.5],
              scale: 0.4,
              src: "/images/location.png",
            }),
      }),
    });
  }

  const features = markers.map((marker) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat(marker.coordinates)),
    });
    feature.setStyle(marker.style);
    return feature;
  });

  const vectorSource = new VectorSource<Geometry>({ features });
  markerLayer = new VectorLayer<VectorSource<Geometry>>({ source: vectorSource });

  neshanMap.addLayer(markerLayer);
};

export default addMarkersToMap;
