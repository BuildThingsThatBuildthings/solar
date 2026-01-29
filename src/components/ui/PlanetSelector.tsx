import { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { planetsData } from '../../data/planets';
import { sunData } from '../../data/sun';
import { useSolarSystemStore } from '../../stores/solarSystemStore';

export const PlanetSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectBody, setCameraTarget } = useSolarSystemStore();

  const springProps = useSpring({
    transform: isOpen ? 'translateY(0%)' : 'translateY(calc(100% - 60px))',
    config: config.gentle,
  });

  const handleSelectSun = () => {
    selectBody({ type: 'sun', data: sunData });
    setCameraTarget([0, 0, 0]);
    setIsOpen(false);
  };

  const handleSelectPlanet = (planetId: string) => {
    const planet = planetsData.find(p => p.id === planetId);
    if (planet) {
      selectBody({ type: 'planet', data: planet });
      // Approximate position (planet is in orbit, so this is an estimate)
      setCameraTarget([planet.orbitRadius, 0, 0]);
    }
    setIsOpen(false);
  };

  return (
    <animated.div
      style={springProps}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
    >
      <div className="glass rounded-t-3xl overflow-hidden min-w-[320px]">
        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full py-3 px-6 flex items-center justify-center gap-2
                     text-white font-bold hover:bg-white/10 transition-all"
        >
          <span className="text-2xl">🪐</span>
          <span>Quick Jump</span>
          <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>

        {/* Planet grid */}
        <div className="p-4 grid grid-cols-3 gap-2">
          {/* Sun */}
          <button
            onClick={handleSelectSun}
            className="flex flex-col items-center p-3 rounded-xl
                       hover:bg-gradient-to-r hover:from-rainbow-yellow/30 hover:to-rainbow-orange/30
                       transition-all btn-bounce"
          >
            <span className="text-3xl">☀️</span>
            <span className="text-white text-xs mt-1">Sun</span>
          </button>

          {/* Planets */}
          {planetsData.map((planet) => (
            <button
              key={planet.id}
              onClick={() => handleSelectPlanet(planet.id)}
              className="flex flex-col items-center p-3 rounded-xl
                         hover:bg-white/10 transition-all btn-bounce"
              style={{
                background: `linear-gradient(135deg, ${planet.color}20, transparent)`,
              }}
            >
              <span className="text-3xl">{planet.emoji}</span>
              <span className="text-white text-xs mt-1">{planet.name}</span>
            </button>
          ))}
        </div>
      </div>
    </animated.div>
  );
};
