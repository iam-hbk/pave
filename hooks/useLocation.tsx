import { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";

// Custom hook for fetching location
const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject>();
  const [locationLoading, setLocationLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>();

  const fetchLocation = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    setLocationLoading(true);
    let location = await Location.getLastKnownPositionAsync({});
    if (location) {
      setLocation(location);
    }
    setLocationLoading(false);
  }, []);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return { location, locationLoading, errorMsg };
};

export default useLocation;