import { Coordinates } from "./interfaces/coordinates";
import { Therapist } from "./interfaces/therapist";

export const capitalizeFirstOfEachWord = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const calculateDistance = (
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number
) => {
  const toRadian = (n: number) => (n * Math.PI) / 180;

  const R = 6371; // km
  const x1 = latitude2 - latitude1;
  const dLat = toRadian(x1);
  const x2 = longitude2 - longitude1;
  const dLon = toRadian(x2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadian(latitude1)) *
      Math.cos(toRadian(latitude2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d;
};

export const sortByDistance = (center: Coordinates, data: Therapist[]) => {
  const sorted = data.slice();

  sorted.sort((a: Therapist, b: Therapist) => {
    const aDistance = calculateDistance(
      center.lat,
      center.lng,
      Number(a.lat),
      Number(a.lng)
    );
    const bDistance = calculateDistance(
      center.lat,
      center.lng,
      Number(b.lat),
      Number(b.lng)
    );
    return aDistance - bDistance;
  });
  return sorted;
};
