import React, { useState, useEffect, useRef } from "react";
import ThemeToggle from "./components/ThemeToggle";
import Background from "./components/Background";
import FloatingWords from "./components/FloatingWords";
import MantraCounter from "./components/MantraCounter";
import SummaryPanel from "./components/SummaryPanel";
import { useTranslation } from "react-i18next";

const App = () => {
  const [mantra, setMantra] = useState("");
  const [target, setTarget] = useState(0);
  const [count, setCount] = useState(0);
  const [malasToday, setMalasToday] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isDark, setIsDark] = useState(true);
  const [floatingWords, setFloatingWords] = useState([]);

  const { t } = useTranslation();
  const containerRef = useRef();

  const malaCount = Math.floor(count / 108);

  // Handle mantra count increment and floating word animation
  const handleJap = () => {
    const newCount = count + 1;
    setCount(newCount);
    if (newCount % 108 === 0) setMalasToday((prev) => prev + 1);

    setFloatingWords((prev) => [
      ...prev.slice(-10),
      {
        id: Date.now(),
        text: mantra,
        top: Math.random() * 80,
        left: Math.random() * 90,
        size: Math.random() * 0.5 + 0.8,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      },
    ]);
  };

  // Reset session
  const handleNewSession = () => {
    setCount(0);
    setTarget(0);
    setMantra("");
    setMalasToday(0);
    setFloatingWords([]);
  };

  // Update streak based on consecutive days of practice (at least one jap per day)
  useEffect(() => {
    if (count > 0) {
      const today = new Date().toDateString();
      const lastPracticeDay = localStorage.getItem("lastPracticeDay");
      const storedStreak = parseInt(localStorage.getItem("streak")) || 0;

      if (lastPracticeDay) {
        const lastDate = new Date(lastPracticeDay);
        const diffTime = new Date(today) - lastDate;
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays === 1) {
          // consecutive day
          const newStreak = storedStreak + 1;
          setStreak(newStreak);
          localStorage.setItem("streak", newStreak);
        } else if (diffDays > 1) {
          // missed days, reset streak
          setStreak(1);
          localStorage.setItem("streak", 1);
        } else {
          // same day, keep streak
          setStreak(storedStreak);
        }
      } else {
        // first time setting streak
        setStreak(1);
        localStorage.setItem("streak", 1);
      }
      localStorage.setItem("lastPracticeDay", today);
    }
  }, [count]);

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen flex items-center justify-center px-2 sm:px-4 transition-all duration-500 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Background Effects */}
      <Background isDark={isDark} />
      <FloatingWords floatingWords={floatingWords} />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md sm:max-w-sm mx-auto text-center py-8 px-4 rounded-lg backdrop-blur-md bg-white/10 dark:bg-black/30 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold tracking-wide">JapCounter</h1>
          <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
        </div>

        <MantraCounter
          mantra={mantra}
          setMantra={setMantra}
          target={target}
          setTarget={setTarget}
          count={count}
          malaCount={malaCount}
          streak={streak}
          handleJap={handleJap}
          handleNewSession={handleNewSession}
          t={t}
        />

        <SummaryPanel
          darkMode={isDark}
          totalMalas={malasToday}
          sessionMantra={mantra}
          streak={streak}
        />
      </div>
    </div>
  );
};

export default App;
