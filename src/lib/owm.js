const OWM_BASE = "https://api.openweathermap.org";
const KEY = import.meta.env.VITE_OWM_KEY;

export async function geocodeCity(q, limit = 1) {
  const url = `${OWM_BASE}/geo/1.0/direct?q=${encodeURIComponent(
    q
  )}&limit=${limit}&appid=${KEY}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error("Geocoding failed");
  return r.json(); // [{ name, lat, lon, country, state }]
}

export async function reverseGeocode(lat, lon, limit = 1) {
  const url = `${OWM_BASE}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${KEY}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error("Reverse geocoding failed");
  return r.json(); // [{ name, local_names, country, state }]
}

export async function getCurrentWeather(lat, lon, units = "metric") {
  const url = `${OWM_BASE}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${KEY}&lang=ru`;
  const r = await fetch(url);
  if (!r.ok) throw new Error("Weather request failed");
  return r.json(); // текущая погода
}
