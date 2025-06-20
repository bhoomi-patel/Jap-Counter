import { useEffect } from "react";

const ThemeToggle = ({ isDark, setIsDark }) => {
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded shadow transition"
      style={{
        background: isDark
          ? "radial-gradient(circle, #1a1a2e, #16213e, #0f0f23)"
          : "radial-gradient(circle, #e6f3ff, #b8e6ff, #87ceeb)",
        color: isDark ? "#fff" : "#111",
      }}
    >
      {isDark ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
