export type LatLongType = {
    latitude: number;
    longitude: number;
  };

 export type NeshanDriverProps = {
    latitude: number | null;
    longitude: number | null;
  };
  
 export type DistanceTimeType = {
    distance: string;
    duration: string;
  };
  
export  type StepType = {
    polyline: string;
    start_location: [number, number];
  };
  
export  type LegType = {
    steps: StepType[];
  };
  
 export type RouteType = {
    legs: LegType[];
  };
  
 export type LatLongDriver = {
    longitude: string | number;
    latitude: string | number;
  }