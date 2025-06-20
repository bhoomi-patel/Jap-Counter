import React, { useEffect, useState } from "react";

export default function SummaryPanel({
  darkMode,
  totalMalas = 0,
  sessionMantra = ""
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [firstSessionTime, setFirstSessionTime] = useState(() => {
    const stored = localStorage.getItem("japSessionStart");
    return stored ? new Date(stored) : null;
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!firstSessionTime) {
      const now = new Date();
      localStorage.setItem("japSessionStart", now.toISOString());
      setFirstSessionTime(now);
    }
  }, [firstSessionTime]);

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const formatDate = (date) => date.toLocaleDateString();
  const formatDay = (date) =>
    date.toLocaleDateString(undefined, { weekday: "long" });

  const panelBgClass = darkMode
    ? "bg-white/10 text-white"
    : "bg-white/80 text-gray-900";

  return (
    <div className={`rounded-lg p-4 mt-4 shadow-md border border-gray-300 backdrop-blur ${panelBgClass}`}>
      <h4 className="text-center font-bold text-md mb-3">
        <span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
          📌 Today’s Session Summary
        </span>
      </h4>

      <div className="flex flex-wrap justify-between text-sm mb-2">
        <span><strong>Date:</strong> {formatDate(currentTime)}</span>
        <span><strong>Day:</strong> {formatDay(currentTime)}</span>
      </div>

      <div className="flex flex-wrap justify-between text-sm mb-2">
        <span><strong>Mantra:</strong> {sessionMantra || "Not Set"}</span>
        <span><strong>Total Malas:</strong> {totalMalas}</span>
      </div>

      <div className="text-xs text-center opacity-60 mt-2">
        “{sessionMantra}” jap is your path to inner peace 🕉️
      </div>

      {firstSessionTime && (
        <div className="mt-4 text-xs border-t pt-2 border-gray-400 opacity-70">
          <div className="text-center font-semibold mb-1">🕉️ First Jap Session</div>
          <div>
            <strong>Started on:</strong> {formatDay(firstSessionTime)}, {formatDate(firstSessionTime)} at {formatTime(firstSessionTime)}
          </div>
        </div>
      )}
    </div>
  );
}
