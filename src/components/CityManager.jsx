import { useContext, useState } from "react";
import { geocodeCity } from "../lib/owm.js";
import { AppContext } from "../App.jsx";

function makeId(name, country, lat, lon) {
  return `${name}-${country}-${lat.toFixed(3)}-${lon.toFixed(3)}`;
}

export default function CityManager() {
  const { cities, setCities, setActiveCityId } = useContext(AppContext);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function addCity(e) {
    e.preventDefault();
    setErr("");
    if (!q.trim()) return;
    try {
      setLoading(true);
      const res = await geocodeCity(q.trim(), 1);
      if (!res?.length) {
        setErr("Город не найден");
        setLoading(false);
        return;
      }
      const c = res[0];
      const id = makeId(c.name, c.country, c.lat, c.lon);
      if (cities.some(x => x.id === id)) {
        setErr("Уже в списке");
        setLoading(false);
        return;
      }
      const newCities = [...cities, { id, name: c.name, country: c.country, lat: c.lat, lon: c.lon }];
      setCities(newCities);
      setActiveCityId(id);
      setQ("");
    } catch {
      setErr("Ошибка добавления");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={addCity} className="flex gap-2">
      <input
        className="flex-1 px-3 py-2 rounded-lg border bg-white
                   border-gray-300 dark:border-gray-700
                   dark:bg-gray-800 dark:text-gray-100"
        placeholder="Введите название города (например, Москва)"
        value={q}
        onChange={(e)=>setQ(e.target.value)}
      />
      <button
        className="px-4 py-2 rounded-lg bg-gray-900 text-white
                   dark:bg-gray-100 dark:text-gray-900 disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "..." : "Добавить"}
      </button>
      {err && <div className="text-sm text-red-600 self-center">{err}</div>}
    </form>
  );
}
