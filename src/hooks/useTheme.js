import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage.js";

export function useTheme() {
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [isDark, setIsDark] = useLocalStorage("darkMode", prefersDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggle = () => setIsDark((v) => !v);

  return { isDark, toggle, setIsDark };
}
