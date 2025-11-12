import { useContext } from "react";
import { AppContext } from "../App.jsx";

function tsToHHMM(ts, timezoneOffsetSec = 0) {
  const date = new Date((ts + timezoneOffsetSec) * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function WeatherCard({ title, weather }) {
  const { settings } = useContext(AppContext);
  if (!weather) return null;

  const temp = Math.round(weather.main?.temp);
  const feels = Math.round(weather.main?.feels_like);
  const hum = weather.main?.humidity;
  const wind = weather.wind?.speed;
  const desc = weather.weather?.[0]?.description;
  const sunset = weather.sys?.sunset;
  const tz = weather.timezone ?? 0;

  const unitsTemp = settings.units === "imperial" ? "°F" : "°C";
  const unitsWind = settings.units === "imperial" ? "mph" : "м/с";

  return (
    <div className="rounded-2xl p-4 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {weather.name}
          {weather.sys?.country ? `, ${weather.sys.country}` : ""}
        </span>
      </div>

      <div className="flex items-end gap-4">
        <div className="text-5xl font-bold">
          {isFinite(temp) ? `${temp}${unitsTemp}` : "--"}
        </div>
        <div className="text-gray-600 dark:text-gray-300">{desc}</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">
        {settings.showFeelsLike && (
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/30">
            <div className="text-gray-500 dark:text-gray-400">Ощущается</div>
            <div className="font-semibold">{isFinite(feels) ? `${feels}${unitsTemp}` : "--"}</div>
          </div>
        )}
        {settings.showHumidity && (
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/30">
            <div className="text-gray-500 dark:text-gray-400">Влажность</div>
            <div className="font-semibold">{hum ?? "--"}%</div>
          </div>
        )}
        <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/30">
          <div className="text-gray-500 dark:text-gray-400">Ветер</div>
          <div className="font-semibold">{wind ?? "--"} {unitsWind}</div>
        </div>
        {settings.showSunset && (
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900/30">
            <div className="text-gray-500 dark:text-gray-400">Закат</div>
            <div className="font-semibold">{sunset ? tsToHHMM(sunset, tz) : "--"}</div>
          </div>
        )}
      </div>
    </div>
  );
}
