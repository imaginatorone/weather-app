import React, { useMemo, useState } from "react";
import Home from "./pages/Home.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import ThemeToggle from "./components/ThemeToggle.jsx";

export const AppContext = React.createContext(null);

const defaultSettings = {
  units: "metric",     // metric | imperial | standard
  showSunset: true,
  showHumidity: true,
  showFeelsLike: true,
};

export default function App() {
  const [route, setRoute] = useState("home"); // 'home' | 'settings'
  const [cities, setCities] = useLocalStorage("cities", []);
  const [activeCityId, setActiveCityId] = useLocalStorage("activeCityId", null);
  const [settings, setSettings] = useLocalStorage("settings", defaultSettings);

  const ctxValue = useMemo(
    () => ({ cities, setCities, activeCityId, setActiveCityId, settings, setSettings }),
    [cities, activeCityId, settings]
  );

  return (
    <AppContext.Provider value={ctxValue}>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <header className="border-b bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-semibold">🌦️ Погода</h1>
            <nav className="flex gap-2 items-center">
              <ThemeToggle />
              <button
                className={`px-3 py-1 rounded-lg ${
                  route === "home"
                    ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                    : "bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
                }`}
                onClick={() => setRoute("home")}
              >
                Главная
              </button>
              <button
                className={`px-3 py-1 rounded-lg ${
                  route === "settings"
                    ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                    : "bg-gray-100 dark:bg-gray-800 dark:text-gray-100"
                }`}
                onClick={() => setRoute("settings")}
              >
                Настройки
              </button>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {route === "home" ? <Home /> : <SettingsPage goHome={() => setRoute("home")} />}
        </main>

        <footer className="border-t bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
            Демо-приложение. Данные предоставлены OpenWeatherMap.
          </div>
        </footer>
      </div>
    </AppContext.Provider>
  );
}
