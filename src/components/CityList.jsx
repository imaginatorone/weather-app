import { useContext, useMemo, useState } from "react";
import { AppContext } from "../App.jsx";

export default function CityList() {
  const { cities, setCities, activeCityId, setActiveCityId } = useContext(AppContext);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return cities;
    return cities.filter(c => (c.name + " " + (c.country||"")).toLowerCase().includes(s));
  }, [q, cities]);

  function remove(id) {
    const after = cities.filter(c => c.id !== id);
    setCities(after);
    if (activeCityId === id) setActiveCityId(after[0]?.id || null);
  }

  if (!cities.length) {
    return <div className="text-sm text-gray-500 dark:text-gray-400">Список пуст. Добавьте город выше.</div>
  }

  return (
    <div className="space-y-2">
      <input
        className="w-full px-3 py-2 rounded-lg border bg-white
                   border-gray-300 dark:border-gray-700
                   dark:bg-gray-800 dark:text-gray-100"
        placeholder="Поиск по сохранённым"
        value={q} onChange={(e)=>setQ(e.target.value)}
      />
      <ul className="divide-y rounded-xl border bg-white
                     border-gray-200 divide-gray-200
                     dark:bg-gray-800 dark:border-gray-700 dark:divide-gray-700">
        {filtered.map(c => (
          <li key={c.id} className="flex items-center justify-between px-3 py-2">
            <button
              className={`text-left flex-1 ${activeCityId===c.id ? 'font-semibold' : ''}`}
              onClick={()=>setActiveCityId(c.id)}
              title="Сделать активным"
            >
              {c.name}{c.country ? `, ${c.country}` : ""}
            </button>
            <button
              className="text-red-600 dark:text-red-400 text-sm px-2 py-1 rounded-lg
                         hover:bg-red-50 dark:hover:bg-red-950"
              onClick={()=>remove(c.id)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
