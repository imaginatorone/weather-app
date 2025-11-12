import { useContext } from "react";
import { AppContext } from "../App.jsx";

export default function SettingsPage({ goHome }) {
  const { settings, setSettings } = useContext(AppContext);

  function toggle(key) {
    setSettings({ ...settings, [key]: !settings[key] });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <h2 className="text-xl font-semibold">Настройки</h2>

      <div className="rounded-2xl border bg-white p-4 space-y-3
                      border-gray-200 dark:border-gray-800
                      dark:bg-gray-900">
        <label className="block">
          <span className="text-sm text-gray-600 dark:text-gray-300">Единицы измерения</span>
          <select
            className="mt-1 w-full px-3 py-2 rounded-lg border bg-white text-gray-900
                       border-gray-300
                       dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            value={settings.units}
            onChange={(e)=>setSettings({ ...settings, units: e.target.value })}
          >
            <option value="metric">Метрическая (°C, м/с)</option>
            <option value="imperial">Имперская (°F, mph)</option>
            <option value="standard">Стандартная (K)</option>
          </select>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-gray-900 dark:text-gray-100">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={settings.showFeelsLike} onChange={()=>toggle("showFeelsLike")} />
            Ощущается
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={settings.showHumidity} onChange={()=>toggle("showHumidity")} />
            Влажность
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={settings.showSunset} onChange={()=>toggle("showSunset")} />
            Закат
          </label>
        </div>
      </div>

      <button
        className="px-4 py-2 rounded-lg bg-gray-900 text-white
                   dark:bg-gray-100 dark:text-gray-900"
        onClick={goHome}
      >Назад</button>
    </div>
  );
}
