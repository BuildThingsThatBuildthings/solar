import { useState } from 'react';
import { useSolarSystemStore } from '../../stores/solarSystemStore';

const FeatureButton = ({
  onClick,
  icon,
  label,
  color = 'from-rainbow-blue to-rainbow-indigo',
}: {
  onClick: () => void;
  icon: string;
  label: string;
  color?: string;
}) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-3 rounded-xl text-sm font-bold
      btn-bounce shadow-lg transition-all
      bg-gradient-to-r ${color} text-white
      hover:scale-105
    `}
    title={label}
  >
    <span className="text-lg mr-1">{icon}</span>
    <span className="hidden sm:inline">{label}</span>
  </button>
);

const ToggleButton = ({
  active,
  onClick,
  icon,
  label,
  activeColor = 'from-rainbow-blue to-rainbow-indigo',
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  activeColor?: string;
}) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-3 rounded-xl text-sm font-bold
      btn-bounce shadow-lg transition-all
      ${active
        ? `bg-gradient-to-r ${activeColor} text-white`
        : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700/80'
      }
    `}
    title={label}
  >
    <span className="text-lg mr-1">{icon}</span>
    <span className="hidden sm:inline">{label}</span>
  </button>
);

export const ControlPanel = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const {
    isPlaying,
    togglePlaying,
    speed,
    setSpeed,
    showOrbits,
    toggleOrbits,
    showConstellations,
    toggleConstellations,
    showMoons,
    toggleMoons,
    showLabels,
    toggleLabels,
    resetCamera,
    cameraMode,
    setCameraMode,
    // Educational features
    setCalculatorPanelOpen,
    setTravelCalculatorOpen,
    setTimeMachineActive,
    timeMachineActive,
    setTourMenuOpen,
    setMissionExplorerOpen,
  } = useSolarSystemStore();

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 pointer-events-none">
      {/* Main Controls */}
      <div className="flex flex-wrap justify-center gap-2 pointer-events-auto mb-3">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlaying}
          className={`
            px-6 py-4 rounded-2xl text-lg font-bold
            btn-bounce shadow-lg
            ${isPlaying
              ? 'bg-gradient-to-r from-rainbow-orange to-rainbow-red'
              : 'bg-gradient-to-r from-rainbow-green to-rainbow-teal'
            }
          `}
          title={isPlaying ? 'Pause orbits' : 'Play orbits'}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>

        {/* Orbits Toggle */}
        <ToggleButton
          active={showOrbits}
          onClick={toggleOrbits}
          icon="🔵"
          label="Orbits"
          activeColor="from-rainbow-blue to-rainbow-indigo"
        />

        {/* Moons Toggle */}
        <ToggleButton
          active={showMoons}
          onClick={toggleMoons}
          icon="🌙"
          label="Moons"
          activeColor="from-rainbow-purple to-rainbow-pink"
        />

        {/* Constellations Toggle */}
        <ToggleButton
          active={showConstellations}
          onClick={toggleConstellations}
          icon="⭐"
          label="Stars"
          activeColor="from-rainbow-yellow to-rainbow-orange"
        />

        {/* Labels Toggle */}
        <ToggleButton
          active={showLabels}
          onClick={toggleLabels}
          icon="🏷️"
          label="Labels"
          activeColor="from-rainbow-teal to-rainbow-green"
        />

        {/* Reset Camera */}
        <button
          onClick={resetCamera}
          className="px-4 py-3 rounded-xl text-sm font-bold
                     bg-gray-800/80 hover:bg-gray-700/80 text-white
                     btn-bounce shadow-lg"
          title="Reset camera view"
        >
          🏠 Reset
        </button>

        {/* Advanced Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`
            px-4 py-3 rounded-xl text-sm font-bold
            btn-bounce shadow-lg transition-all
            ${showAdvanced
              ? 'bg-gradient-to-r from-rainbow-indigo to-rainbow-purple text-white'
              : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700/80'
            }
          `}
          title="Advanced controls"
        >
          ⚙️ <span className="hidden sm:inline">More</span>
        </button>
      </div>

      {/* Advanced Controls */}
      {showAdvanced && (
        <div className="flex flex-wrap justify-center gap-3 pointer-events-auto mb-3">
          {/* Camera Mode Selector */}
          <div className="glass rounded-xl px-4 py-2 flex items-center gap-2">
            <span className="text-white text-sm font-bold">📷 Camera:</span>
            <select
              value={cameraMode}
              onChange={(e) => setCameraMode(e.target.value as typeof cameraMode)}
              className="bg-white/10 text-white text-sm rounded-lg px-3 py-1 border border-white/20
                         focus:outline-none focus:border-rainbow-blue"
            >
              <option value="free">Free</option>
              <option value="orbit">Orbit</option>
              <option value="follow">Follow</option>
              <option value="cinematic">Cinematic</option>
            </select>
          </div>

          {/* Educational Features */}
          <FeatureButton
            onClick={() => setCalculatorPanelOpen(true)}
            icon="🔢"
            label="Calculators"
            color="from-rainbow-purple to-rainbow-pink"
          />
          <FeatureButton
            onClick={() => setTravelCalculatorOpen(true)}
            icon="🚀"
            label="Travel"
            color="from-rainbow-blue to-rainbow-teal"
          />
          <FeatureButton
            onClick={() => setTimeMachineActive(!timeMachineActive)}
            icon="⏰"
            label="Time Machine"
            color="from-rainbow-orange to-rainbow-yellow"
          />
          <FeatureButton
            onClick={() => setTourMenuOpen(true)}
            icon="🎓"
            label="Tours"
            color="from-rainbow-green to-rainbow-teal"
          />
          <FeatureButton
            onClick={() => setMissionExplorerOpen(true)}
            icon="🛸"
            label="Missions"
            color="from-rainbow-red to-rainbow-orange"
          />
        </div>
      )}

      {/* Speed Slider */}
      <div className="flex justify-center">
        <div className="glass rounded-2xl px-6 py-3 flex items-center gap-4 pointer-events-auto">
          <span className="text-xl">🚀</span>
          <span className="text-white font-bold text-sm">Speed:</span>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-32 h-3 bg-gray-700 rounded-full appearance-none cursor-pointer
                       accent-rainbow-yellow"
          />
          <span className="text-rainbow-yellow font-bold min-w-[3rem] text-center">
            {speed.toFixed(1)}x
          </span>
        </div>
      </div>

      {/* Help hint */}
      <div className="flex justify-center mt-3 pointer-events-none">
        <p className="text-gray-500 text-xs text-center">
          Drag to rotate • Scroll to zoom • Click any object to learn more
        </p>
      </div>
    </div>
  );
};
