import { format, addHours } from 'date-fns';

interface Coordinate {
  lat: number;
  long: number;
}

export function getDistanceDifference(coord1: Coordinate, coord2: Coordinate) {
  // Radius of the Earth in meters
  const R = 6371000;

  // Convert degrees to radians
  const degToRad = (deg: number) => deg * (Math.PI / 180);

  // Convert latitude and longitude from degrees to radians
  const lat1 = degToRad(coord1.lat);
  const lon1 = degToRad(coord1.long);
  const lat2 = degToRad(coord2.lat);
  const lon2 = degToRad(coord2.long);

  // Calculate differences between coordinates
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate distance in meters
  const distance = R * c;

  return distance;
}

export function formatDateToHHMM(date: Date): string {
  return format(date, 'HH:mm');
}


