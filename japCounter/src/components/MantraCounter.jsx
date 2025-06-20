import React from "react";

const MantraCounter = ({
  mantra,
  setMantra,
  target,
  setTarget,
  count,
  malaCount,
  streak,
  handleJap,
  handleNewSession,
  t,
}) => {
  const progressPercent = target > 0 ? Math.min((count / target) * 100, 100) : 0;
  const innerProgress = (count % 108) / 108 * 100;

  return (
    <div>
      {/* Mantra and Target Inputs */}
      <input
        type="text"
        placeholder="Enter Mantra"
        value={mantra}
        onChange={(e) => setMantra(e.target.value)}
        className="mt-4 p-2 rounded text-black w-full text-sm"
      />
      <input
        type="number"
        placeholder="Set your target (e.g., 1080)"
        value={target || ""}
        onChange={(e) => setTarget(e.target.value)}
        className="mt-2 p-2 rounded text-black w-full text-sm"
      />

      {/* Progress Circle */}
      <div className="my-6 flex justify-center">
        <div
          className="relative w-28 h-28 rounded-full border-4 border-gray-400 flex items-center justify-center shadow-inner"
          style={{
            background: `conic-gradient(#84cc16 ${progressPercent}%, #e5e7eb ${progressPercent}%)`,
          }}
        >
          <div
            className="absolute w-24 h-24 rounded-full border-4 border-gray-200 flex items-center justify-center"
            style={{
              background: `conic-gradient(#facc15 ${innerProgress}%, transparent ${innerProgress}%)`,
            }}
          >
            <button
              onClick={handleJap}
              disabled={!mantra}
              className={`w-20 h-20 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 text-sm ${
                mantra
                  ? "bg-indigo-500 hover:scale-105"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {mantra || t("jap")}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex justify-around text-center mb-4">
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-yellow-400">{count}</span>
          <span className="text-xs opacity-75">Total Japs</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-purple-400">{malaCount}</span>
          <span className="text-xs opacity-75">Malas</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-green-400">{streak + 1}</span>
          <span className="text-xs opacity-75">Day Streak</span>
        </div>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center m-5">
        <button
          onClick={handleNewSession}
          className="py-2 px-4 rounded-lg bg-indigo-500 hover:bg-blue-600 transition-all flex items-center justify-center space-x-2"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default MantraCounter;
