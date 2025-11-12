import { useContext, useMemo } from "react";
import { AppContext } from "../App.jsx";
import CityManager from "../components/CityManager.jsx";
import CityList from "../components/CityList.jsx";
import { getCurrentWeather } from "../lib/owm.js";
import WeatherCard from "../components/WeatherCard.jsx";
import UseCurrentLocation from "../components/UseCurrentLocation.jsx";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner.jsx";

export default function Home() {
  const { cities, activeCityId, setActiveCityId, settings, setCities } = useContext(AppContext);
  const [activeWeather, setActiveWeather] = useState({ loading: false, data: null, error: null });

  const activeCity = useMemo(() => cities.find(c => c.id === activeCityId) || cities[0], [cities, activeCityId]);

  // при первой загрузке делаем первый город активным
  useEffect(() => {
    if (!activeCityId && cities[0]) setActiveCityId(cities[0].id);
  }, [activeCityId, cities, setActiveCityId]);

  // грузим погоду для активного города
  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!activeCity) {
        setActiveWeather({ loading: false, data: null, error: null });
        return;
      }
      setActiveWeather({ loading: true, data: null, error: null });
      try {
        const w = await getCurrentWeather(activeCity.lat, activeCity.lon, settings.units);
        if (!cancelled) setActiveWeather({ loading: false, data: w, error: null });
      } catch (e) {
        if (!cancelled) setActiveWeather({ loading: false, data: null, error: e.message });
      }
    }
    run();
    return () => { cancelled = true; };
  }, [activeCity?.id, activeCity?.lat, activeCity?.lon, settings.units]);

  function saveFromCurrent({ name, country, lat, lon }) {
    const id = `${name}-${country}-${lat.toFixed(3)}-${lon.toFixed(3)}`;
    if (cities.some(x => x.id === id)) {
      setActiveCityId(id);
      return;
    }
    const newCities = [...cities, { id, name, country, lat, lon }];
    setCities(newCities);
    setActiveCityId(id);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* текущая геолокация */}
      <UseCurrentLocation units={settings.units} onSave={saveFromCurrent} />

      {/* активный сохранённый город */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Выбранный город</h2>
        {!activeCity && <div className="text-sm text-gray-500 dark:text-gray-400">Пока не выбран.</div>}
        {activeCity && (
          <>
            {activeWeather.loading && <Spinner />}
            {activeWeather.error && <div className="text-sm text-red-600">Ошибка: {activeWeather.error}</div>}
            {activeWeather.data && (
              <WeatherCard
                title={`${activeCity.name}${activeCity.country ? `, ${activeCity.country}` : ""}`}
                weather={activeWeather.data}
              />
            )}
          </>
        )}
      </section>

      {/* управление городами */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Города</h2>
        <CityManager />
        <CityList />
      </section>
    </div>
  );
}
