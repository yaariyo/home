'use client'
import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="toggle-switch">
      <label>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <span className="slider" />
      </label>
    </div>
  );
}
