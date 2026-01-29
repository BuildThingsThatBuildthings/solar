import { useState } from 'react';
import { useSpring, animated, config } from '@react-spring/web';
import { planetsData } from '../../data/planets';
import { sunData } from '../../data/sun';
import { useSolarSystemStore } from '../../stores/solarSystemStore';

interface PlanetButtonProps {
  emoji: string;
  name: string;
  color: string;
  onClick: () => void;
  index: number;
  isOpen: boolean;
  isSun?: boolean;
}

const PlanetButton = ({ emoji, name, color, onClick, index, isOpen, isSun = false }: PlanetButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const hoverSpring = useSpring({
    scale: isPressed ? 0.9 : isHovered ? 1.15 : 1,
    y: isHovered ? -8 : 0,
    rotate: isHovered ? (index % 2 === 0 ? 8 : -8) : 0,
    glow: isHovered ? 1 : 0,
    config: config.wobbly,
  });

  const entranceSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    y: isOpen ? 0 : 20,
    scale: isOpen ? 1 : 0.7,
    delay: isOpen ? index * 50 : 0,
    config: config.gentle,
  });

  const emojiSpring = useSpring({
    rotate: isHovered ? 360 : 0,
    scale: isHovered ? 1.2 : 1,
    config: { tension: 200, friction: 12 },
  });

  const glowColor = isSun
    ? 'rgba(254, 202, 87, 0.6)'
    : color.replace(')', ', 0.5)').replace('rgb', 'rgba').replace('#', 'rgba(');

  return (
    <animated.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        opacity: entranceSpring.opacity,
        transform: entranceSpring.scale.to(s =>
          `translateY(${entranceSpring.y.get()}px) scale(${s * hoverSpring.scale.get()}) rotate(${hoverSpring.rotate.get()}deg)`
        ),
        boxShadow: hoverSpring.glow.to(g =>
          g > 0 ? `0 0 ${20 * g}px ${glowColor}, 0 ${8 * g}px ${16 * g}px rgba(0,0,0,0.3)` : 'none'
        ),
        background: isSun
          ? `linear-gradient(135deg, rgba(254, 202, 87, 0.3), rgba(255, 159, 67, 0.2))`
          : `linear-gradient(135deg, ${color}30, transparent)`,
      }}
      className="flex flex-col items-center p-3 rounded-xl transition-colors duration-200
                 border border-white/10 hover:border-white/30 relative overflow-hidden"
    >
      {/* Sparkle effect on hover */}
      {isHovered && (
        <>
          <span className="absolute top-1 right-1 text-xs animate-ping">✨</span>
          <span className="absolute bottom-1 left-1 text-xs animate-ping" style={{ animationDelay: '0.2s' }}>✨</span>
        </>
      )}

      <animated.span
        className="text-3xl"
        style={{
          transform: emojiSpring.rotate.to(r => `rotate(${r}deg) scale(${emojiSpring.scale.get()})`),
        }}
      >
        {emoji}
      </animated.span>
      <span className="text-white text-xs mt-1 font-medium">{name}</span>

      {/* Hover ring */}
      {isHovered && (
        <span className="absolute inset-0 rounded-xl border-2 border-white/20 animate-pulse" />
      )}
    </animated.button>
  );
};

export const PlanetSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectBody, setCameraTarget } = useSolarSystemStore();

  const springProps = useSpring({
    transform: isOpen ? 'translateY(0%)' : 'translateY(calc(100% - 60px))',
    config: config.gentle,
  });

  const toggleSpring = useSpring({
    rotate: isOpen ? 180 : 0,
    scale: isOpen ? 1.1 : 1,
    config: config.wobbly,
  });

  const [buttonHovered, setButtonHovered] = useState(false);
  const buttonHoverSpring = useSpring({
    scale: buttonHovered ? 1.05 : 1,
    y: buttonHovered ? -2 : 0,
    config: config.wobbly,
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
      setCameraTarget([planet.orbitRadius, 0, 0]);
    }
    setIsOpen(false);
  };

  // All bodies (sun + planets)
  const allBodies = [
    { id: 'sun', emoji: '☀️', name: 'Sun', color: '#FECA57', isSun: true, onClick: handleSelectSun },
    ...planetsData.map(p => ({
      id: p.id,
      emoji: p.emoji,
      name: p.name,
      color: p.color,
      isSun: false,
      onClick: () => handleSelectPlanet(p.id),
    })),
  ];

  return (
    <animated.div
      style={springProps}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
    >
      <div className="glass rounded-t-3xl overflow-hidden min-w-[340px] shadow-2xl
                     border-t border-l border-r border-white/20">
        {/* Toggle button */}
        <animated.button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
          style={{
            transform: buttonHoverSpring.scale.to(s => `scale(${s}) translateY(${buttonHoverSpring.y.get()}px)`),
          }}
          className="w-full py-3 px-6 flex items-center justify-center gap-3
                     text-white font-bold hover:bg-white/10 transition-all
                     border-b border-white/10"
        >
          <animated.span
            className="text-2xl"
            style={{
              transform: buttonHoverSpring.scale.to(s => `scale(${s * 1.1})`),
            }}
          >
            🪐
          </animated.span>
          <span className="text-lg">Quick Jump</span>
          <animated.span
            style={{
              transform: toggleSpring.rotate.to(r => `rotate(${r}deg)`),
            }}
          >
            ▼
          </animated.span>
        </animated.button>

        {/* Planet grid */}
        <div className="p-4 grid grid-cols-3 gap-3 bg-gradient-to-b from-transparent to-black/20">
          {allBodies.map((body, index) => (
            <PlanetButton
              key={body.id}
              emoji={body.emoji}
              name={body.name}
              color={body.color}
              onClick={body.onClick}
              index={index}
              isOpen={isOpen}
              isSun={body.isSun}
            />
          ))}
        </div>

        {/* Fun tip at bottom */}
        {isOpen && (
          <animated.div
            className="px-4 pb-4 pt-2 text-center"
          >
            <p className="text-gray-400 text-xs">
              💡 Click any planet to zoom in and learn more!
            </p>
          </animated.div>
        )}
      </div>
    </animated.div>
  );
};
