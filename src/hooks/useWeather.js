import { useEffect, useState } from "react";
import { getCurrentWeather, reverseGeocode } from "../lib/owm.js";

export function useWeatherByCoords(coords, units = "metric") {
  const [data, setData] = useState({
    loading: false,
    error: null,
    weather: null,
    place: null,
  });

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!coords?.lat || !coords?.lon) return;
      setData({ loading: true, error: null, weather: null, place: null });
      try {
        const [placeArr, weather] = await Promise.all([
          reverseGeocode(coords.lat, coords.lon, 1),
          getCurrentWeather(coords.lat, coords.lon, units),
        ]);
        const place = placeArr?.[0] || null;
        if (!cancelled)
          setData({ loading: false, error: null, weather, place });
      } catch (e) {
        if (!cancelled)
          setData({
            loading: false,
            error: e.message,
            weather: null,
            place: null,
          });
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [coords?.lat, coords?.lon, units]);

  return data;
}
