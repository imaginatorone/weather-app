import { useTheme } from "../hooks/useTheme.js";

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      title={isDark ? "Светлая тема" : "Тёмная тема"}
      className="px-3 py-1 rounded-lg bg-gray-100 text-gray-900
                 dark:bg-gray-800 dark:text-gray-100"
    >
      {isDark ? "🌝" : "🌚"}
    </button>
  );
}
