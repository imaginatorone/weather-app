import { useEffect, useState } from "react";
import { useWeatherByCoords } from "../hooks/useWeather.js";
import WeatherCard from "./WeatherCard.jsx";

export default function UseCurrentLocation({ units, onSave }) {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => {}, // тихо игнорируем отказ/ошибку
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const { loading, error, weather, place } = useWeatherByCoords(coords, units);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Текущее местоположение</h2>
        {weather && onSave && (
          <button
            className="px-3 py-1 rounded-lg bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
            onClick={() =>
              onSave({
                name: place?.name || weather.name || "Current",
                country: place?.country || weather.sys?.country || "",
                lat: coords.lat,
                lon: coords.lon,
              })
            }
          >
            Сохранить как город
          </button>
        )}
      </div>

      {loading && (
        <div className="text-sm text-gray-500 dark:text-gray-400">Загружаю погоду...</div>
      )}
      {error && <div className="text-sm text-red-600">Ошибка: {error}</div>}
      {weather && <WeatherCard title={place?.name || "Здесь"} weather={weather} />}
    </div>
  );
}
