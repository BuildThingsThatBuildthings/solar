import { useState, useEffect } from 'react';
import { useSpring, animated, useTransition, config } from '@react-spring/web';
import { useSolarSystemStore } from '../../stores/solarSystemStore';
import type { CelestialBodyType, InfoPanelTab } from '../../stores/solarSystemStore';
import type { PlanetData } from '../../data/planets';
import type { MoonData } from '../../data/moons';
import type { SunData } from '../../data/sun';
import type { ConstellationData } from '../../data/constellations';

const TabButton = ({
  tab,
  currentTab,
  label,
  onClick,
  index,
}: {
  tab: InfoPanelTab;
  currentTab: InfoPanelTab;
  label: string;
  onClick: () => void;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isActive = currentTab === tab;

  const springProps = useSpring({
    scale: isHovered ? 1.05 : 1,
    y: isHovered && !isActive ? -2 : 0,
    backgroundColor: isActive ? 1 : 0,
    config: config.wobbly,
  });

  const enterSpring = useSpring({
    from: { opacity: 0, y: 10 },
    to: { opacity: 1, y: 0 },
    delay: index * 30,
    config: config.gentle,
  });

  return (
    <animated.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...enterSpring,
        transform: springProps.scale.to(s => `scale(${s}) translateY(${springProps.y.get()}px)`),
      }}
      className={`px-3 py-2 text-xs font-bold rounded-lg transition-all relative overflow-hidden ${
        isActive
          ? 'bg-gradient-to-r from-rainbow-blue to-rainbow-purple text-white shadow-lg shadow-rainbow-purple/30'
          : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
      }`}
    >
      {/* Active tab glow */}
      {isActive && (
        <span className="absolute inset-0 bg-white/10 animate-pulse" style={{ animationDuration: '2s' }} />
      )}
      <span className="relative z-10">{label}</span>
    </animated.button>
  );
};

const InfoRow = ({ label, value, unit, delay = 0 }: { label: string; value: string | number; unit?: string; delay?: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({
    from: { opacity: 0, x: -10 },
    to: { opacity: 1, x: 0 },
    delay,
    config: config.gentle,
  });

  const hoverSpring = useSpring({
    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0)',
    x: isHovered ? 4 : 0,
    config: config.stiff,
  });

  return (
    <animated.div
      style={{ ...springProps, ...hoverSpring }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex justify-between items-start gap-2 py-2 px-2 -mx-2 rounded-lg border-b border-white/5
                 transition-colors duration-200 cursor-default"
    >
      <span className="text-gray-400 text-xs shrink-0">{label}</span>
      <span className="text-white text-xs text-right font-medium">
        {value}{unit && <span className="text-rainbow-teal ml-1">{unit}</span>}
      </span>
    </animated.div>
  );
};

const Section = ({ title, children, color = "rainbow-blue", delay = 0 }: {
  title: string;
  children: React.ReactNode;
  color?: string;
  delay?: number;
}) => {
  const springProps = useSpring({
    from: { opacity: 0, y: 15 },
    to: { opacity: 1, y: 0 },
    delay,
    config: config.gentle,
  });

  return (
    <animated.div style={springProps} className="mt-4">
      <h3 className={`text-${color} font-bold text-sm mb-2 flex items-center gap-2`}>
        <span className={`w-2 h-2 rounded-full bg-current animate-pulse`} style={{ animationDuration: '2s' }} />
        {title}
      </h3>
      {children}
    </animated.div>
  );
};

const ListSection = ({ title, items, color = "rainbow-teal", delay = 0 }: {
  title: string;
  items: string[];
  color?: string;
  delay?: number;
}) => (
  <Section title={title} color={color} delay={delay}>
    <ul className="space-y-1">
      {items.map((item, i) => (
        <animated.li
          key={i}
          className="text-gray-300 text-xs flex gap-2 py-1 px-2 -mx-2 rounded-lg
                     hover:bg-white/5 transition-colors duration-200 cursor-default"
          style={{
            opacity: 1,
            transform: 'translateX(0)',
          }}
        >
          <span className="text-rainbow-yellow">✦</span>
          {item}
        </animated.li>
      ))}
    </ul>
  </Section>
);

// SUN INFO CONTENT
const SunContent = ({ data, tab }: { data: SunData; tab: InfoPanelTab }) => {
  if (tab === 'overview') {
    return (
      <>
        <InfoRow label="Type" value={data.type} delay={0} />
        <InfoRow label="Spectral Class" value={data.spectralClass} delay={30} />
        <InfoRow label="Age" value={data.age} delay={60} />
        <InfoRow label="Remaining Life" value="~5.4 billion years" delay={90} />
        <InfoRow label="Diameter" value={data.diameter.toLocaleString()} unit="km" delay={120} />
        <InfoRow label="Mass" value="333,000" unit="× Earth" delay={150} />
        <ListSection title="Current Facts" items={data.funFacts.slice(0, 3)} color="rainbow-yellow" delay={200} />
      </>
    );
  }

  if (tab === 'physical') {
    return (
      <>
        <InfoRow label="Diameter" value={data.diameter.toLocaleString()} unit="km" delay={0} />
        <InfoRow label="Mass" value={data.mass} delay={30} />
        <InfoRow label="Volume" value={data.volume} delay={60} />
        <InfoRow label="Density" value={data.density} unit="g/cm³" delay={90} />
        <InfoRow label="Surface Gravity" value={data.gravity} unit="m/s²" delay={120} />
        <InfoRow label="Escape Velocity" value={data.escapeVelocity} unit="km/s" delay={150} />
        <Section title="Temperature" color="rainbow-orange" delay={180}>
          <InfoRow label="Core" value={`${(data.coreTemp / 1000000).toFixed(0)} million`} unit="K" />
          <InfoRow label="Surface" value={data.surfaceTemp.toLocaleString()} unit="K" />
          <InfoRow label="Corona" value={`${(data.coronaTemp / 1000000).toFixed(0)} million`} unit="K" />
        </Section>
        <Section title="Rotation" color="rainbow-purple" delay={250}>
          <InfoRow label="Equator" value={data.rotationPeriod.equator} />
          <InfoRow label="Poles" value={data.rotationPeriod.poles} />
          <InfoRow label="Axial Tilt" value={data.axialTilt} unit="°" />
        </Section>
      </>
    );
  }

  if (tab === 'composition') {
    return (
      <>
        <Section title="Chemical Composition" color="rainbow-green" delay={0}>
          {data.composition.map((c, i) => (
            <div key={i} className="flex justify-between items-center py-1 hover:bg-white/5 rounded-lg px-2 -mx-2 transition-colors">
              <span className="text-gray-300 text-xs">{c.element}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                  <animated.div
                    className="h-full bg-gradient-to-r from-rainbow-yellow to-rainbow-orange rounded-full"
                    style={{
                      width: `${Math.min(c.percentage * 1.3, 100)}%`,
                    }}
                  />
                </div>
                <span className="text-white text-xs w-12 text-right font-medium">{c.percentage}%</span>
              </div>
            </div>
          ))}
        </Section>
        <Section title="Internal Structure" color="rainbow-blue" delay={150}>
          {data.layers.map((layer, i) => (
            <div key={i} className="mb-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5">
              <div className="font-bold text-white text-xs">{layer.name}</div>
              <div className="text-gray-400 text-xs">{layer.thickness}</div>
              <div className="text-gray-300 text-xs mt-1">{layer.description}</div>
              <div className="text-rainbow-orange text-xs mt-1 font-medium">🌡️ {layer.temperature}</div>
            </div>
          ))}
        </Section>
      </>
    );
  }

  if (tab === 'exploration' || tab === 'orbital') {
    return (
      <>
        <Section title="Solar Phenomena" color="rainbow-pink" delay={0}>
          {data.phenomena.map((p, i) => (
            <div key={i} className="mb-2 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors border border-white/5">
              <div className="font-bold text-rainbow-yellow text-xs">{p.name}</div>
              <div className="text-gray-300 text-xs mt-1">{p.description}</div>
            </div>
          ))}
        </Section>
        <Section title="Solar Cycle" color="rainbow-orange" delay={150}>
          <p className="text-gray-300 text-xs leading-relaxed">{data.solarCycle}</p>
        </Section>
        <Section title="Heliosphere" color="rainbow-blue" delay={200}>
          <p className="text-gray-300 text-xs leading-relaxed">{data.heliosphere}</p>
          <p className="text-gray-300 text-xs mt-2"><strong className="text-rainbow-teal">Solar Wind:</strong> {data.solarWind}</p>
        </Section>
      </>
    );
  }

  if (tab === 'facts') {
    return (
      <>
        <ListSection title="Fun Facts" items={data.funFacts} color="rainbow-yellow" delay={0} />
        <ListSection title="Comparisons" items={data.comparisons} color="rainbow-purple" delay={100} />
        <Section title="Future Evolution" color="rainbow-red" delay={200}>
          {data.futureEvolution.map((step, i) => (
            <div key={i} className="flex gap-2 py-1 hover:bg-white/5 rounded-lg px-2 -mx-2 transition-colors">
              <span className="text-rainbow-orange font-bold text-xs">{i + 1}.</span>
              <span className="text-gray-300 text-xs">{step}</span>
            </div>
          ))}
        </Section>
      </>
    );
  }

  return null;
};

// PLANET INFO CONTENT
const PlanetContent = ({ data, tab }: { data: PlanetData; tab: InfoPanelTab }) => {
  if (tab === 'overview') {
    return (
      <>
        <InfoRow label="Type" value={data.type.charAt(0).toUpperCase() + data.type.slice(1)} delay={0} />
        <InfoRow label="Diameter" value={data.diameter.toLocaleString()} unit="km" delay={30} />
        <InfoRow label="Distance from Sun" value={data.distanceFromSun.average} unit="million km" delay={60} />
        <InfoRow label="Year Length" value={data.orbitalPeriod} delay={90} />
        <InfoRow label="Day Length" value={data.rotationPeriod} delay={120} />
        <InfoRow label="Moons" value={data.confirmedMoons} delay={150} />
        <InfoRow label="Has Rings" value={data.hasRings ? '✨ Yes' : 'No'} delay={180} />
        <ListSection title="Highlights" items={data.funFacts.slice(0, 2)} color="rainbow-yellow" delay={220} />
      </>
    );
  }

  if (tab === 'physical') {
    return (
      <>
        <InfoRow label="Diameter" value={data.diameter.toLocaleString()} unit="km" delay={0} />
        <InfoRow label="Mass" value={data.mass} delay={30} />
        <InfoRow label="Volume" value={data.volume} delay={60} />
        <InfoRow label="Density" value={data.density} unit="g/cm³" delay={90} />
        <InfoRow label="Surface Gravity" value={data.gravity} unit="m/s²" delay={120} />
        <InfoRow label="Escape Velocity" value={data.escapeVelocity} unit="km/s" delay={150} />
        <Section title="Temperature" color="rainbow-orange" delay={180}>
          <InfoRow label="Minimum" value={data.tempRange.min} unit="°C" />
          <InfoRow label="Maximum" value={data.tempRange.max} unit="°C" />
          <InfoRow label="Average" value={data.tempRange.average} unit="°C" />
        </Section>
        <Section title="Magnetic Field" color="rainbow-purple" delay={250}>
          <InfoRow label="Has Field" value={data.hasMagneticField ? '🧲 Yes' : 'No'} />
          {data.magneticFieldStrength && <InfoRow label="Strength" value={data.magneticFieldStrength} />}
        </Section>
      </>
    );
  }

  if (tab === 'orbital') {
    return (
      <>
        <Section title="Orbit" color="rainbow-blue" delay={0}>
          <InfoRow label="Average Distance" value={data.distanceFromSun.average} unit="million km" />
          <InfoRow label="Perihelion" value={data.distanceFromSun.perihelion} unit="million km" />
          <InfoRow label="Aphelion" value={data.distanceFromSun.aphelion} unit="million km" />
          <InfoRow label="Orbital Period" value={data.orbitalPeriod} />
          <InfoRow label="Orbital Speed" value={data.orbitalSpeed} unit="km/s" />
          <InfoRow label="Eccentricity" value={data.orbitalEccentricity.toFixed(4)} />
          <InfoRow label="Inclination" value={data.orbitalInclination} unit="°" />
        </Section>
        <Section title="Rotation" color="rainbow-green" delay={150}>
          <InfoRow label="Period" value={data.rotationPeriod} />
          <InfoRow label="Axial Tilt" value={data.axialTilt} unit="°" />
          <InfoRow label="Direction" value={data.rotationDirection} />
        </Section>
      </>
    );
  }

  if (tab === 'composition') {
    return (
      <>
        <ListSection title="Internal Structure" items={data.internalStructure} color="rainbow-blue" delay={0} />
        <ListSection title="Composition" items={data.composition} color="rainbow-green" delay={80} />
        <ListSection title="Surface Features" items={data.surfaceFeatures} color="rainbow-orange" delay={160} />
        {data.hasAtmosphere && (
          <>
            <Section title="Atmosphere" color="rainbow-teal" delay={240}>
              <InfoRow label="Pressure" value={data.atmosphere.pressure} />
            </Section>
            <ListSection title="Atmospheric Composition" items={data.atmosphere.composition} color="rainbow-purple" delay={300} />
            <ListSection title="Atmospheric Features" items={data.atmosphere.features} color="rainbow-pink" delay={350} />
          </>
        )}
      </>
    );
  }

  if (tab === 'exploration') {
    return (
      <>
        <Section title="Space Missions" color="rainbow-blue" delay={0}>
          {data.missions.map((mission, i) => (
            <div key={i} className="mb-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-all
                                   border border-white/5 hover:border-white/10 cursor-default">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-xs">{mission.name}</span>
                <span className="text-rainbow-yellow text-xs font-medium">📅 {mission.year}</span>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="text-xs px-2 py-0.5 bg-rainbow-blue/30 rounded-full text-rainbow-blue font-medium">
                  {mission.type}
                </span>
                <span className="text-xs text-gray-400">{mission.agency}</span>
              </div>
              <div className="text-gray-300 text-xs mt-2 leading-relaxed">{mission.highlights}</div>
            </div>
          ))}
        </Section>
      </>
    );
  }

  if (tab === 'facts') {
    return (
      <>
        <ListSection title="Fun Facts" items={data.funFacts} color="rainbow-yellow" delay={0} />
        <ListSection title="Comparisons" items={data.comparisons} color="rainbow-purple" delay={100} />
      </>
    );
  }

  return null;
};

// MOON INFO CONTENT
const MoonContent = ({ data, tab }: { data: MoonData; tab: InfoPanelTab }) => {
  if (tab === 'overview') {
    return (
      <>
        <InfoRow label="Parent Planet" value={data.parentPlanet.charAt(0).toUpperCase() + data.parentPlanet.slice(1)} delay={0} />
        <InfoRow label="Diameter" value={data.diameter.toLocaleString()} unit="km" delay={30} />
        <InfoRow label="Distance from Planet" value={data.distanceFromPlanet.toLocaleString()} unit="km" delay={60} />
        <InfoRow label="Orbital Period" value={data.orbitalPeriod} delay={90} />
        <InfoRow label="Tidally Locked" value={data.isTidallyLocked ? '🔒 Yes' : 'No'} delay={120} />
        <InfoRow label="Discovered" value={`${data.discovery.year > 0 ? data.discovery.year : 'Ancient'}`} delay={150} />
        <animated.div
          className="mt-4 p-4 bg-gradient-to-r from-rainbow-yellow/20 to-rainbow-orange/20 rounded-2xl
                     border border-rainbow-yellow/40 hover:border-rainbow-yellow/60 transition-colors"
          style={{ opacity: 1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">💫</span>
            <span className="text-rainbow-yellow font-bold text-sm">Fun Fact!</span>
          </div>
          <p className="text-white text-sm leading-relaxed">{data.funFact}</p>
        </animated.div>
      </>
    );
  }

  if (tab === 'physical') {
    return (
      <>
        <InfoRow label="Diameter" value={data.diameter.toLocaleString()} unit="km" delay={0} />
        <InfoRow label="Mass" value={data.mass} delay={30} />
        <InfoRow label="Density" value={data.density} unit="g/cm³" delay={60} />
        <InfoRow label="Surface Gravity" value={data.gravity} unit="m/s²" delay={90} />
        <InfoRow label="Escape Velocity" value={data.escapeVelocity} unit="km/s" delay={120} />
        <Section title="Temperature" color="rainbow-orange" delay={150}>
          <InfoRow label="Minimum" value={data.surfaceTemp.min} unit="°C" />
          <InfoRow label="Maximum" value={data.surfaceTemp.max} unit="°C" />
          <InfoRow label="Average" value={data.surfaceTemp.average} unit="°C" />
        </Section>
      </>
    );
  }

  if (tab === 'orbital') {
    return (
      <>
        <Section title="Orbit" color="rainbow-blue" delay={0}>
          <InfoRow label="Semi-major Axis" value={data.distanceFromPlanet.toLocaleString()} unit="km" />
          <InfoRow label="Orbital Period" value={data.orbitalPeriod} />
          <InfoRow label="Eccentricity" value={data.orbitalEccentricity.toFixed(4)} />
          <InfoRow label="Inclination" value={data.orbitalInclination} unit="°" />
          <InfoRow label="Direction" value={data.orbitDirection} />
          <InfoRow label="Tidally Locked" value={data.isTidallyLocked ? '🔒 Yes' : 'No'} />
        </Section>
        <Section title="Discovery" color="rainbow-purple" delay={150}>
          <InfoRow label="Discoverer" value={data.discovery.discoverer} />
          <InfoRow label="Year" value={data.discovery.year > 0 ? data.discovery.year.toString() : 'Ancient'} />
          <InfoRow label="Method" value={data.discovery.method} />
        </Section>
      </>
    );
  }

  if (tab === 'composition') {
    return (
      <>
        <ListSection title="Composition" items={data.composition} color="rainbow-green" delay={0} />
        <ListSection title="Internal Structure" items={data.internalStructure} color="rainbow-blue" delay={80} />
        <ListSection title="Surface Features" items={data.surfaceFeatures} color="rainbow-orange" delay={160} />
        {data.hasAtmosphere && data.atmosphere && (
          <>
            <Section title="Atmosphere" color="rainbow-teal" delay={240}>
              <InfoRow label="Pressure" value={data.atmosphere.pressure} />
            </Section>
            <ListSection title="Composition" items={data.atmosphere.composition} color="rainbow-purple" delay={300} />
            <ListSection title="Features" items={data.atmosphere.features} color="rainbow-pink" delay={350} />
          </>
        )}
      </>
    );
  }

  if (tab === 'facts') {
    return (
      <>
        <ListSection title="Notable Features" items={data.notableFeatures} color="rainbow-yellow" delay={0} />
        <ListSection title="Scientific Interest" items={data.scientificInterest} color="rainbow-blue" delay={100} />
        <animated.div
          className="mt-4 p-4 bg-gradient-to-r from-rainbow-yellow/20 to-rainbow-orange/20 rounded-2xl
                     border border-rainbow-yellow/40 hover:border-rainbow-yellow/60 transition-colors"
          style={{ opacity: 1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl animate-bounce" style={{ animationDuration: '2s' }}>🎉</span>
            <span className="text-rainbow-yellow font-bold text-sm">Fun Fact!</span>
          </div>
          <p className="text-white text-sm leading-relaxed">{data.funFact}</p>
        </animated.div>
      </>
    );
  }

  return null;
};

// CONSTELLATION INFO CONTENT
const ConstellationContent = ({ data, tab }: { data: ConstellationData; tab: InfoPanelTab }) => {
  if (tab === 'overview') {
    return (
      <>
        <InfoRow label="Latin Name" value={data.latinName} delay={0} />
        <InfoRow label="Abbreviation" value={data.abbreviation} delay={30} />
        <InfoRow label="Area" value={data.area} unit="sq°" delay={60} />
        <InfoRow label="Quadrant" value={data.quadrant} delay={90} />
        <InfoRow label="Brightest Star" value={data.brightestStar} delay={120} />
        <InfoRow label="Best Viewing" value={data.bestViewing.months.join(', ')} delay={150} />
        <InfoRow label="Hemisphere" value={data.bestViewing.hemisphere} delay={180} />
        <InfoRow label="Visible Latitudes" value={data.bestViewing.latitudes} delay={210} />
      </>
    );
  }

  if (tab === 'physical' || tab === 'composition') {
    return (
      <>
        <Section title="Major Stars" color="rainbow-yellow" delay={0}>
          {data.stars.slice(0, 8).map((star, i) => (
            <div key={i} className="flex justify-between items-center py-2 px-2 -mx-2 rounded-lg
                                   border-b border-white/5 hover:bg-white/5 transition-colors cursor-default">
              <span className="text-white text-xs font-medium">{star.name}</span>
              <div className="flex gap-3">
                <span className="text-gray-400 text-xs">Mag: {star.magnitude.toFixed(2)}</span>
                {star.spectralClass && (
                  <span className="text-rainbow-blue text-xs font-medium">{star.spectralClass}</span>
                )}
                {star.distanceLY && (
                  <span className="text-rainbow-orange text-xs">{star.distanceLY} ly</span>
                )}
              </div>
            </div>
          ))}
        </Section>
        <ListSection title="Notable Deep Sky Objects" items={data.notableObjects} color="rainbow-purple" delay={150} />
      </>
    );
  }

  if (tab === 'facts' || tab === 'exploration') {
    return (
      <>
        <Section title="Mythology" color="rainbow-purple" delay={0}>
          <p className="text-gray-300 text-sm leading-relaxed">{data.mythology}</p>
        </Section>
        <Section title="History" color="rainbow-blue" delay={100}>
          <p className="text-gray-300 text-sm leading-relaxed">{data.history}</p>
        </Section>
        <animated.div
          className="mt-4 p-4 bg-gradient-to-r from-rainbow-yellow/20 to-rainbow-orange/20 rounded-2xl
                     border border-rainbow-yellow/40 hover:border-rainbow-yellow/60 transition-colors"
          style={{ opacity: 1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🌟</span>
            <span className="text-rainbow-yellow font-bold text-sm">Did You Know?</span>
          </div>
          <p className="text-white text-sm leading-relaxed">{data.funFact}</p>
        </animated.div>
      </>
    );
  }

  return null;
};

const InfoContent = ({
  type,
  data,
  tab,
}: {
  type: CelestialBodyType;
  data: PlanetData | MoonData | SunData | ConstellationData;
  tab: InfoPanelTab;
}) => {
  // Content transition for tab changes
  const transitions = useTransition(tab, {
    from: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: -20, position: 'absolute' as const },
    config: config.gentle,
  });

  return transitions((style, currentTab) => (
    <animated.div style={style} className="w-full">
      {type === 'sun' && <SunContent data={data as SunData} tab={currentTab} />}
      {type === 'planet' && <PlanetContent data={data as PlanetData} tab={currentTab} />}
      {type === 'moon' && <MoonContent data={data as MoonData} tab={currentTab} />}
      {type === 'constellation' && <ConstellationContent data={data as ConstellationData} tab={currentTab} />}
    </animated.div>
  ));
};

const getBodyEmoji = (_type: CelestialBodyType, data: PlanetData | MoonData | SunData | ConstellationData): string => {
  if ('emoji' in data) return data.emoji;
  return '🌍';
};

const getBodyName = (data: PlanetData | MoonData | SunData | ConstellationData): string => {
  return data.name;
};

const getBodyColor = (data: PlanetData | MoonData | SunData | ConstellationData): string => {
  if ('color' in data) return data.color;
  return '#ffffff';
};

export const InfoPanel = () => {
  const { selectedBody, selectBody, infoPanelTab, setInfoPanelTab } = useSolarSystemStore();
  const [isClosing, setIsClosing] = useState(false);

  const springProps = useSpring({
    transform: selectedBody && !isClosing ? 'translateX(0%)' : 'translateX(110%)',
    opacity: selectedBody && !isClosing ? 1 : 0,
    config: config.gentle,
  });

  // Reset closing state when body changes
  useEffect(() => {
    if (selectedBody) setIsClosing(false);
  }, [selectedBody]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      selectBody(null);
      setIsClosing(false);
    }, 300);
  };

  const tabs: { key: InfoPanelTab; label: string; emoji: string }[] = [
    { key: 'overview', label: 'Overview', emoji: '📋' },
    { key: 'physical', label: 'Physical', emoji: '🎯' },
    { key: 'orbital', label: 'Orbital', emoji: '🔄' },
    { key: 'composition', label: 'Structure', emoji: '🧱' },
    { key: 'exploration', label: 'Explore', emoji: '🚀' },
    { key: 'facts', label: 'Facts', emoji: '✨' },
  ];

  // Emoji spring for header
  const [emojiHovered, setEmojiHovered] = useState(false);
  const emojiSpring = useSpring({
    scale: emojiHovered ? 1.3 : 1,
    rotate: emojiHovered ? 15 : 0,
    config: config.wobbly,
  });

  // Close button spring
  const [closeHovered, setCloseHovered] = useState(false);
  const closeSpring = useSpring({
    scale: closeHovered ? 1.2 : 1,
    rotate: closeHovered ? 90 : 0,
    backgroundColor: closeHovered ? 'rgba(255, 107, 107, 0.3)' : 'rgba(255, 255, 255, 0.1)',
    config: config.wobbly,
  });

  return (
    <animated.div
      style={springProps}
      className="fixed top-4 right-4 bottom-4 w-96 max-w-[calc(100vw-2rem)] z-50 pointer-events-auto"
    >
      <div className="h-full glass rounded-3xl overflow-hidden flex flex-col shadow-2xl
                     border border-white/10 hover:border-white/20 transition-colors duration-500">
        {/* Header */}
        {selectedBody && (
          <div
            className="p-4 border-b border-white/10 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${getBodyColor(selectedBody.data)}30, transparent)`,
            }}
          >
            {/* Animated background shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                           -translate-x-full animate-shimmer" style={{ animationDuration: '3s' }} />

            <div className="flex justify-between items-start relative">
              <div className="flex items-center gap-3">
                <animated.span
                  className="text-4xl cursor-pointer"
                  style={{
                    transform: emojiSpring.scale.to(s => `scale(${s}) rotate(${emojiSpring.rotate.get()}deg)`),
                  }}
                  onMouseEnter={() => setEmojiHovered(true)}
                  onMouseLeave={() => setEmojiHovered(false)}
                >
                  {getBodyEmoji(selectedBody.type, selectedBody.data)}
                </animated.span>
                <div>
                  <h2 className="text-xl font-bold text-white">{getBodyName(selectedBody.data)}</h2>
                  <span className="text-xs text-gray-400 capitalize flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rainbow-teal animate-pulse" />
                    {selectedBody.type}
                  </span>
                </div>
              </div>
              <animated.button
                onClick={handleClose}
                onMouseEnter={() => setCloseHovered(true)}
                onMouseLeave={() => setCloseHovered(false)}
                style={{
                  transform: closeSpring.scale.to(s => `scale(${s}) rotate(${closeSpring.rotate.get()}deg)`),
                  backgroundColor: closeSpring.backgroundColor,
                }}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-lg">✕</span>
              </animated.button>
            </div>
          </div>
        )}

        {/* Tabs */}
        {selectedBody && (
          <div className="flex gap-1 p-2 overflow-x-auto border-b border-white/10 bg-white/5">
            {tabs.map((tab, index) => (
              <TabButton
                key={tab.key}
                tab={tab.key}
                currentTab={infoPanelTab}
                label={tab.label}
                onClick={() => setInfoPanelTab(tab.key)}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4 relative">
          {selectedBody && (
            <InfoContent
              type={selectedBody.type}
              data={selectedBody.data}
              tab={infoPanelTab}
            />
          )}
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-space-dark/50 to-transparent pointer-events-none" />
      </div>
    </animated.div>
  );
};
