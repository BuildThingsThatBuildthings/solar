import { useState, useEffect } from 'react';
import { useSpring, animated, useTrail, config } from '@react-spring/web';
import { useSolarSystemStore } from '../../stores/solarSystemStore';

interface FeatureButtonProps {
  onClick: () => void;
  icon: string;
  label: string;
  color?: string;
  delay?: number;
}

const FeatureButton = ({
  onClick,
  icon,
  label,
  color = 'from-rainbow-blue to-rainbow-indigo',
  delay = 0,
}: FeatureButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const springProps = useSpring({
    scale: isPressed ? 0.92 : isHovered ? 1.08 : 1,
    y: isHovered ? -4 : 0,
    rotateZ: isHovered ? (Math.random() > 0.5 ? 3 : -3) : 0,
    config: config.wobbly,
  });

  const iconSpring = useSpring({
    scale: isHovered ? 1.3 : 1,
    rotate: isHovered ? 15 : 0,
    config: { tension: 400, friction: 10 },
  });

  const enterSpring = useSpring({
    from: { opacity: 0, y: 20, scale: 0.8 },
    to: { opacity: 1, y: 0, scale: 1 },
    delay,
    config: config.gentle,
  });

  return (
    <animated.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        ...enterSpring,
        transform: springProps.scale.to(
          (s) => `scale(${s}) translateY(${springProps.y.get()}px) rotate(${springProps.rotateZ.get()}deg)`
        ),
      }}
      className={`
        px-4 py-3 rounded-xl text-sm font-bold
        shadow-lg transition-shadow duration-300
        bg-gradient-to-r ${color} text-white
        hover:shadow-xl hover:shadow-rainbow-purple/30
        active:shadow-inner
        sparkle relative overflow-hidden
      `}
      title={label}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

      <animated.span
        className="text-lg mr-1 inline-block"
        style={{
          transform: iconSpring.scale.to(s => `scale(${s}) rotate(${iconSpring.rotate.get()}deg)`)
        }}
      >
        {icon}
      </animated.span>
      <span className="hidden sm:inline relative z-10">{label}</span>
    </animated.button>
  );
};

interface ToggleButtonProps {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  activeColor?: string;
  index?: number;
}

const ToggleButton = ({
  active,
  onClick,
  icon,
  label,
  activeColor = 'from-rainbow-blue to-rainbow-indigo',
  index = 0,
}: ToggleButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({
    scale: isHovered ? 1.08 : 1,
    y: isHovered ? -3 : 0,
    backgroundColor: active ? 1 : 0,
    config: config.wobbly,
  });

  const glowSpring = useSpring({
    boxShadow: active
      ? '0 0 20px rgba(84, 160, 255, 0.5), 0 0 40px rgba(165, 94, 234, 0.3)'
      : '0 4px 12px rgba(0, 0, 0, 0.3)',
    config: config.gentle,
  });

  const iconSpring = useSpring({
    rotate: active ? 360 : 0,
    scale: isHovered ? 1.2 : 1,
    config: { tension: 200, friction: 15 },
  });

  const enterSpring = useSpring({
    from: { opacity: 0, y: 30, scale: 0.7 },
    to: { opacity: 1, y: 0, scale: 1 },
    delay: index * 50,
    config: config.gentle,
  });

  return (
    <animated.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...enterSpring,
        ...glowSpring,
        transform: springProps.scale.to(
          (s) => `scale(${s}) translateY(${springProps.y.get()}px)`
        ),
      }}
      className={`
        px-4 py-3 rounded-xl text-sm font-bold
        transition-colors duration-300 relative overflow-hidden
        ${active
          ? `bg-gradient-to-r ${activeColor} text-white`
          : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700/80 hover:text-gray-200'
        }
      `}
      title={label}
    >
      {/* Active state pulse ring */}
      {active && (
        <span className="absolute inset-0 rounded-xl animate-ping opacity-20 bg-white"
              style={{ animationDuration: '2s' }} />
      )}

      <animated.span
        className="text-lg mr-1 inline-block"
        style={{
          transform: iconSpring.rotate.to(r => `rotate(${r}deg) scale(${iconSpring.scale.get()})`)
        }}
      >
        {icon}
      </animated.span>
      <span className="hidden sm:inline relative z-10">{label}</span>
    </animated.button>
  );
};

const SpeedSlider = ({ speed, setSpeed }: { speed: number; setSpeed: (s: number) => void }) => {
  const [isDragging, setIsDragging] = useState(false);

  const rocketSpring = useSpring({
    x: ((speed - 0.1) / 9.9) * 100,
    rotate: isDragging ? 15 : speed > 5 ? 10 : 0,
    scale: isDragging ? 1.3 : 1,
    config: config.wobbly,
  });

  const glowIntensity = Math.min(speed / 10, 1);

  return (
    <div className="glass rounded-2xl px-6 py-3 flex items-center gap-4 pointer-events-auto
                    hover:bg-white/10 transition-colors duration-300">
      <animated.span
        className="text-xl"
        style={{
          transform: rocketSpring.rotate.to(r => `rotate(${r}deg) scale(${rocketSpring.scale.get()})`),
        }}
      >
        🚀
      </animated.span>

      <span className="text-white font-bold text-sm">Speed:</span>

      <div className="relative w-32">
        <input
          type="range"
          min="0.1"
          max="10"
          step="0.1"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          className="w-full h-3 bg-gray-700 rounded-full appearance-none cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-gradient-to-r
                     [&::-webkit-slider-thumb]:from-rainbow-yellow [&::-webkit-slider-thumb]:to-rainbow-orange
                     [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing
                     [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-rainbow-yellow/50
                     [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-200
                     [&::-webkit-slider-thumb]:hover:scale-125"
        />

        {/* Glow trail */}
        <div
          className="absolute top-1/2 left-0 h-2 rounded-full -translate-y-1/2 pointer-events-none
                     bg-gradient-to-r from-rainbow-yellow/60 to-rainbow-orange/60"
          style={{
            width: `${((speed - 0.1) / 9.9) * 100}%`,
            boxShadow: `0 0 ${10 * glowIntensity}px rgba(254, 202, 87, ${0.5 * glowIntensity})`,
          }}
        />
      </div>

      <animated.span
        className="font-bold min-w-[3rem] text-center"
        style={{
          color: speed > 7 ? '#FF6B6B' : speed > 4 ? '#FECA57' : '#5CD859',
          textShadow: speed > 5 ? `0 0 10px currentColor` : 'none',
        }}
      >
        {speed.toFixed(1)}x
      </animated.span>
    </div>
  );
};

export const ControlPanel = () => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    setCalculatorPanelOpen,
    setTravelCalculatorOpen,
    setTimeMachineActive,
    timeMachineActive,
    setTourMenuOpen,
    setMissionExplorerOpen,
  } = useSolarSystemStore();

  // Play button spring
  const [isPlayHovered, setIsPlayHovered] = useState(false);
  const playSpring = useSpring({
    scale: isPlayHovered ? 1.1 : 1,
    y: isPlayHovered ? -5 : 0,
    config: config.wobbly,
  });

  // Advanced panel spring
  const advancedSpring = useSpring({
    opacity: showAdvanced ? 1 : 0,
    y: showAdvanced ? 0 : 20,
    scale: showAdvanced ? 1 : 0.95,
    config: config.gentle,
  });

  // Entrance animation for main container
  const containerSpring = useSpring({
    from: { opacity: 0, y: 50 },
    to: { opacity: mounted ? 1 : 0, y: mounted ? 0 : 50 },
    config: config.gentle,
  });

  // Toggle buttons config
  const toggleButtons = [
    { active: showOrbits, onClick: toggleOrbits, icon: '🔵', label: 'Orbits', activeColor: 'from-rainbow-blue to-rainbow-indigo' },
    { active: showMoons, onClick: toggleMoons, icon: '🌙', label: 'Moons', activeColor: 'from-rainbow-purple to-rainbow-pink' },
    { active: showConstellations, onClick: toggleConstellations, icon: '⭐', label: 'Stars', activeColor: 'from-rainbow-yellow to-rainbow-orange' },
    { active: showLabels, onClick: toggleLabels, icon: '🏷️', label: 'Labels', activeColor: 'from-rainbow-teal to-rainbow-green' },
  ];

  // Feature buttons config
  const featureButtons = [
    { onClick: () => setCalculatorPanelOpen(true), icon: '🔢', label: 'Calculators', color: 'from-rainbow-purple to-rainbow-pink' },
    { onClick: () => setTravelCalculatorOpen(true), icon: '🚀', label: 'Travel', color: 'from-rainbow-blue to-rainbow-teal' },
    { onClick: () => setTimeMachineActive(!timeMachineActive), icon: '⏰', label: 'Time Machine', color: 'from-rainbow-orange to-rainbow-yellow' },
    { onClick: () => setTourMenuOpen(true), icon: '🎓', label: 'Tours', color: 'from-rainbow-green to-rainbow-teal' },
    { onClick: () => setMissionExplorerOpen(true), icon: '🛸', label: 'Missions', color: 'from-rainbow-red to-rainbow-orange' },
  ];

  // Trail animation for feature buttons
  const featureTrail = useTrail(featureButtons.length, {
    from: { opacity: 0, y: 20, scale: 0.8 },
    to: {
      opacity: showAdvanced ? 1 : 0,
      y: showAdvanced ? 0 : 20,
      scale: showAdvanced ? 1 : 0.8,
    },
    config: config.gentle,
  });

  return (
    <animated.div
      className="fixed bottom-4 left-4 right-4 z-50 pointer-events-none"
      style={containerSpring}
    >
      {/* Main Controls */}
      <div className="flex flex-wrap justify-center gap-2 pointer-events-auto mb-3">
        {/* Play/Pause Button */}
        <animated.button
          onClick={togglePlaying}
          onMouseEnter={() => setIsPlayHovered(true)}
          onMouseLeave={() => setIsPlayHovered(false)}
          style={{
            transform: playSpring.scale.to(
              (s) => `scale(${s}) translateY(${playSpring.y.get()}px)`
            ),
          }}
          className={`
            px-6 py-4 rounded-2xl text-lg font-bold
            shadow-lg transition-all duration-300
            ${isPlaying
              ? 'bg-gradient-to-r from-rainbow-orange to-rainbow-red hover:shadow-rainbow-red/40'
              : 'bg-gradient-to-r from-rainbow-green to-rainbow-teal hover:shadow-rainbow-green/40'
            }
            hover:shadow-xl
          `}
          title={isPlaying ? 'Pause orbits' : 'Play orbits'}
        >
          <span className={`mr-2 inline-block transition-transform duration-300 ${isPlaying ? '' : 'animate-pulse'}`}>
            {isPlaying ? '⏸️' : '▶️'}
          </span>
          {isPlaying ? 'Pause' : 'Play'}
        </animated.button>

        {/* Toggle Buttons */}
        {toggleButtons.map((btn, index) => (
          <ToggleButton
            key={btn.label}
            {...btn}
            index={index}
          />
        ))}

        {/* Reset Camera */}
        <ToggleButton
          active={false}
          onClick={resetCamera}
          icon="🏠"
          label="Reset"
          index={toggleButtons.length}
        />

        {/* Advanced Toggle */}
        <ToggleButton
          active={showAdvanced}
          onClick={() => setShowAdvanced(!showAdvanced)}
          icon="⚙️"
          label="More"
          activeColor="from-rainbow-indigo to-rainbow-purple"
          index={toggleButtons.length + 1}
        />
      </div>

      {/* Advanced Controls */}
      <animated.div
        style={advancedSpring}
        className={`flex flex-wrap justify-center gap-3 pointer-events-auto mb-3
                   ${showAdvanced ? '' : 'pointer-events-none'}`}
      >
        {/* Camera Mode Selector */}
        <div className="glass rounded-xl px-4 py-2 flex items-center gap-2
                       hover:bg-white/10 transition-colors duration-300">
          <span className="text-white text-sm font-bold">📷 Camera:</span>
          <select
            value={cameraMode}
            onChange={(e) => setCameraMode(e.target.value as typeof cameraMode)}
            className="bg-white/10 text-white text-sm rounded-lg px-3 py-1 border border-white/20
                       focus:outline-none focus:border-rainbow-blue focus:ring-2 focus:ring-rainbow-blue/30
                       transition-all duration-200 cursor-pointer
                       hover:bg-white/20"
          >
            <option value="free">🎯 Free</option>
            <option value="orbit">🔄 Orbit</option>
            <option value="follow">👀 Follow</option>
            <option value="cinematic">🎬 Cinematic</option>
          </select>
        </div>

        {/* Educational Feature Buttons with Trail Animation */}
        {featureTrail.map((style, index) => (
          <animated.div key={featureButtons[index].label} style={style}>
            <FeatureButton
              {...featureButtons[index]}
              delay={0}
            />
          </animated.div>
        ))}
      </animated.div>

      {/* Speed Slider */}
      <div className="flex justify-center">
        <SpeedSlider speed={speed} setSpeed={setSpeed} />
      </div>

      {/* Help hint with fade */}
      <div className="flex justify-center mt-3 pointer-events-none">
        <p className="text-gray-500 text-xs text-center animate-pulse" style={{ animationDuration: '3s' }}>
          ✨ Drag to rotate • Scroll to zoom • Click any planet to explore ✨
        </p>
      </div>
    </animated.div>
  );
};
