import { useSpring, animated, config } from '@react-spring/web';
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
}: {
  tab: InfoPanelTab;
  currentTab: InfoPanelTab;
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
      currentTab === tab
        ? 'bg-gradient-to-r from-rainbow-blue to-rainbow-purple text-white'
        : 'bg-white/10 text-gray-300 hover:bg-white/20'
    }`}
  >
    {label}
  </button>
);

const InfoRow = ({ label, value, unit }: { label: string; value: string | number; unit?: string }) => (
  <div className="flex justify-between items-start gap-2 py-1 border-b border-white/5">
    <span className="text-gray-400 text-xs shrink-0">{label}</span>
    <span className="text-white text-xs text-right">
      {value}{unit && <span className="text-gray-500 ml-1">{unit}</span>}
    </span>
  </div>
);

const Section = ({ title, children, color = "rainbow-blue" }: { title: string; children: React.ReactNode; color?: string }) => (
  <div className="mt-4">
    <h3 className={`text-${color} font-bold text-sm mb-2 flex items-center gap-2`}>
      <span className="w-2 h-2 rounded-full bg-current" />
      {title}
    </h3>
    {children}
  </div>
);

const ListSection = ({ title, items, color = "rainbow-teal" }: { title: string; items: string[]; color?: string }) => (
  <Section title={title} color={color}>
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li key={i} className="text-gray-300 text-xs flex gap-2">
          <span className="text-rainbow-yellow">•</span>
          {item}
        </li>
      ))}
    </ul>
  </Section>
);

// SUN INFO CONTENT
const SunContent = ({ data, tab }: { data: SunData; tab: InfoPanelTab }) => {
  if (tab === 'overview') {
    return (
      <>
        <InfoRow label="Type" value={data.type} />
        <InfoRow label="Spectral Class" value={data.spectralClass} />
        <InfoRow label="Age" value={data.age} />
        <InfoRow label="Remaining Life" value="~5.4 billion years" />
        <InfoRow label="Diameter" value={data.diameter.toLocaleString()} unit="km" />
        <InfoRow label="Mass" value="333,000" unit="× Earth" />
        <ListSection title="Current Facts" items={data.funFacts.slice(0, 3)} color="rainbow-yellow" />
      </>
    );
  }

  if (tab === 'physical') {
    return (
      <>
        <InfoRow label="Diameter" value={data.diameter.toLocaleString()} unit="km" />
        <InfoRow label="Mass" value={data.mass} />
        <InfoRow label="Volume" value={data.volume} />
        <InfoRow label="Density" value={data.density} unit="g/cm³" />
        <InfoRow label="Surface Gravity" value={data.gravity} unit="m/s²" />
        <InfoRow label="Escape Velocity" value={data.escapeVelocity} unit="km/s" />
        <Section title="Temperature" color="rainbow-orange">
          <InfoRow label="Core" value={`${(data.coreTemp / 1000000).toFixed(0)} million`} unit="K" />
          <InfoRow label="Surface" value={data.surfaceTemp.toLocaleString()} unit="K" />
          <InfoRow label="Corona" value={`${(data.coronaTemp / 1000000).toFixed(0)} million`} unit="K" />
        </Section>
        <Section title="Rotation" color="rainbow-purple">
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
        <Section title="Chemical Composition" color="rainbow-green">
          {data.composition.map((c, i) => (
            <div key={i} className="flex justify-between items-center py-1">
              <span className="text-gray-300 text-xs">{c.element}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rainbow-yellow to-rainbow-orange rounded-full"
                    style={{ width: `${Math.min(c.percentage * 1.3, 100)}%` }}
                  />
                </div>
                <span className="text-white text-xs w-12 text-right">{c.percentage}%</span>
              </div>
            </div>
          ))}
        </Section>
        <Section title="Internal Structure" color="rainbow-blue">
          {data.layers.map((layer, i) => (
            <div key={i} className="mb-3 p-2 bg-white/5 rounded-lg">
              <div className="font-bold text-white text-xs">{layer.name}</div>
              <div className="text-gray-400 text-xs">{layer.thickness}</div>
              <div className="text-gray-300 text-xs mt-1">{layer.description}</div>
              <div className="text-rainbow-orange text-xs mt-1">Temp: {layer.temperature}</div>
            </div>
          ))}
        </Section>
      </>
    );
  }

  if (tab === 'exploration' || tab === 'orbital') {
    return (
      <>
        <Section title="Solar Phenomena" color="rainbow-pink">
          {data.phenomena.map((p, i) => (
            <div key={i} className="mb-2 p-2 bg-white/5 rounded-lg">
              <div className="font-bold text-rainbow-yellow text-xs">{p.name}</div>
              <div className="text-gray-300 text-xs mt-1">{p.description}</div>
            </div>
          ))}
        </Section>
        <Section title="Solar Cycle" color="rainbow-orange">
          <p className="text-gray-300 text-xs">{data.solarCycle}</p>
        </Section>
        <Section title="Heliosphere" color="rainbow-blue">
          <p className="text-gray-300 text-xs">{data.heliosphere}</p>
          <p className="text-gray-300 text-xs mt-2"><strong>Solar Wind:</strong> {data.solarWind}</p>
        </Section>
      </>
    );
  }

  if (tab === 'facts') {
    return (
      <>
        <ListSection title="Fun Facts" items={data.funFacts} color="rainbow-yellow" />
        <ListSection title="Comparisons" items={data.comparisons} color="rainbow-purple" />
        <Section title="Future Evolution" color="rainbow-red">
          {data.futureEvolution.map((step, i) => (
            <div key={i} className="flex gap-2 py-1">
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
        <InfoRow label="Type" value={data.type.charAt(0).toUpperCase() + data.type.slice(1)} />
        <InfoRow label="Diameter" value={data.diameter.toLocaleString()} unit="km" />
        <InfoRow label="Distance from Sun" value={data.distanceFromSun.average} unit="million km" />
        <InfoRow label="Year Length" value={data.orbitalPeriod} />
        <InfoRow label="Day Length" value={data.rotationPeriod} />
        <InfoRow label="Moons" value={data.confirmedMoons} />
        <InfoRow label="Has Rings" value={data.hasRings ? 'Yes' : 'No'} />
        <ListSection title="Highlights" items={data.funFacts.slice(0, 2)} color="rainbow-yellow" />
      </>
    );
  }

  if (tab === 'physical') {
    return (
      <>
        <InfoRow label="Diameter" value={data.diameter.toLocaleString()} unit="km" />
        <InfoRow label="Mass" value={data.mass} />
        <InfoRow label="Volume" value={data.volume} />
        <InfoRow label="Density" value={data.density} unit="g/cm³" />
        <InfoRow label="Surface Gravity" value={data.gravity} unit="m/s²" />
        <InfoRow label="Escape Velocity" value={data.escapeVelocity} unit="km/s" />
        <Section title="Temperature" color="rainbow-orange">
          <InfoRow label="Minimum" value={data.tempRange.min} unit="°C" />
          <InfoRow label="Maximum" value={data.tempRange.max} unit="°C" />
          <InfoRow label="Average" value={data.tempRange.average} unit="°C" />
        </Section>
        <Section title="Magnetic Field" color="rainbow-purple">
          <InfoRow label="Has Field" value={data.hasMagneticField ? 'Yes' : 'No'} />
          {data.magneticFieldStrength && <InfoRow label="Strength" value={data.magneticFieldStrength} />}
        </Section>
      </>
    );
  }

  if (tab === 'orbital') {
    return (
      <>
        <Section title="Orbit" color="rainbow-blue">
          <InfoRow label="Average Distance" value={data.distanceFromSun.average} unit="million km" />
          <InfoRow label="Perihelion" value={data.distanceFromSun.perihelion} unit="million km" />
          <InfoRow label="Aphelion" value={data.distanceFromSun.aphelion} unit="million km" />
          <InfoRow label="Orbital Period" value={data.orbitalPeriod} />
          <InfoRow label="Orbital Speed" value={data.orbitalSpeed} unit="km/s" />
          <InfoRow label="Eccentricity" value={data.orbitalEccentricity.toFixed(4)} />
          <InfoRow label="Inclination" value={data.orbitalInclination} unit="°" />
        </Section>
        <Section title="Rotation" color="rainbow-green">
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
        <ListSection title="Internal Structure" items={data.internalStructure} color="rainbow-blue" />
        <ListSection title="Composition" items={data.composition} color="rainbow-green" />
        <ListSection title="Surface Features" items={data.surfaceFeatures} color="rainbow-orange" />
        {data.hasAtmosphere && (
          <>
            <Section title="Atmosphere" color="rainbow-teal">
              <InfoRow label="Pressure" value={data.atmosphere.pressure} />
            </Section>
            <ListSection title="Atmospheric Composition" items={data.atmosphere.composition} color="rainbow-purple" />
            <ListSection title="Atmospheric Features" items={data.atmosphere.features} color="rainbow-pink" />
          </>
        )}
      </>
    );
  }

  if (tab === 'exploration') {
    return (
      <>
        <Section title="Space Missions" color="rainbow-blue">
          {data.missions.map((mission, i) => (
            <div key={i} className="mb-3 p-2 bg-white/5 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-xs">{mission.name}</span>
                <span className="text-rainbow-yellow text-xs">{mission.year}</span>
              </div>
              <div className="flex gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 bg-rainbow-blue/30 rounded text-rainbow-blue">
                  {mission.type}
                </span>
                <span className="text-xs text-gray-400">{mission.agency}</span>
              </div>
              <div className="text-gray-300 text-xs mt-2">{mission.highlights}</div>
            </div>
          ))}
        </Section>
      </>
    );
  }

  if (tab === 'facts') {
    return (
      <>
        <ListSection title="Fun Facts" items={data.funFacts} color="rainbow-yellow" />
        <ListSection title="Comparisons" items={data.comparisons} color="rainbow-purple" />
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
        <InfoRow label="Parent Planet" value={data.parentPlanet.charAt(0).toUpperCase() + data.parentPlanet.slice(1)} />
        <InfoRow label="Diameter" value={data.diameter.toLocaleString()} unit="km" />
        <InfoRow label="Distance from Planet" value={data.distanceFromPlanet.toLocaleString()} unit="km" />
        <InfoRow label="Orbital Period" value={data.orbitalPeriod} />
        <InfoRow label="Tidally Locked" value={data.isTidallyLocked ? 'Yes' : 'No'} />
        <InfoRow label="Discovered" value={`${data.discovery.year > 0 ? data.discovery.year : 'Ancient'}`} />
        <div className="mt-4 p-3 bg-gradient-to-r from-rainbow-yellow/20 to-rainbow-orange/20 rounded-xl border border-rainbow-yellow/40">
          <p className="text-white text-sm leading-relaxed">{data.funFact}</p>
        </div>
      </>
    );
  }

  if (tab === 'physical') {
    return (
      <>
        <InfoRow label="Diameter" value={data.diameter.toLocaleString()} unit="km" />
        <InfoRow label="Mass" value={data.mass} />
        <InfoRow label="Density" value={data.density} unit="g/cm³" />
        <InfoRow label="Surface Gravity" value={data.gravity} unit="m/s²" />
        <InfoRow label="Escape Velocity" value={data.escapeVelocity} unit="km/s" />
        <Section title="Temperature" color="rainbow-orange">
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
        <Section title="Orbit" color="rainbow-blue">
          <InfoRow label="Semi-major Axis" value={data.distanceFromPlanet.toLocaleString()} unit="km" />
          <InfoRow label="Orbital Period" value={data.orbitalPeriod} />
          <InfoRow label="Eccentricity" value={data.orbitalEccentricity.toFixed(4)} />
          <InfoRow label="Inclination" value={data.orbitalInclination} unit="°" />
          <InfoRow label="Direction" value={data.orbitDirection} />
          <InfoRow label="Tidally Locked" value={data.isTidallyLocked ? 'Yes' : 'No'} />
        </Section>
        <Section title="Discovery" color="rainbow-purple">
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
        <ListSection title="Composition" items={data.composition} color="rainbow-green" />
        <ListSection title="Internal Structure" items={data.internalStructure} color="rainbow-blue" />
        <ListSection title="Surface Features" items={data.surfaceFeatures} color="rainbow-orange" />
        {data.hasAtmosphere && data.atmosphere && (
          <>
            <Section title="Atmosphere" color="rainbow-teal">
              <InfoRow label="Pressure" value={data.atmosphere.pressure} />
            </Section>
            <ListSection title="Composition" items={data.atmosphere.composition} color="rainbow-purple" />
            <ListSection title="Features" items={data.atmosphere.features} color="rainbow-pink" />
          </>
        )}
      </>
    );
  }

  if (tab === 'facts') {
    return (
      <>
        <ListSection title="Notable Features" items={data.notableFeatures} color="rainbow-yellow" />
        <ListSection title="Scientific Interest" items={data.scientificInterest} color="rainbow-blue" />
        <div className="mt-4 p-3 bg-gradient-to-r from-rainbow-yellow/20 to-rainbow-orange/20 rounded-xl border border-rainbow-yellow/40">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🎉</span>
            <span className="text-rainbow-yellow font-bold text-sm">Fun Fact!</span>
          </div>
          <p className="text-white text-sm leading-relaxed">{data.funFact}</p>
        </div>
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
        <InfoRow label="Latin Name" value={data.latinName} />
        <InfoRow label="Abbreviation" value={data.abbreviation} />
        <InfoRow label="Area" value={data.area} unit="sq°" />
        <InfoRow label="Quadrant" value={data.quadrant} />
        <InfoRow label="Brightest Star" value={data.brightestStar} />
        <InfoRow label="Best Viewing" value={data.bestViewing.months.join(', ')} />
        <InfoRow label="Hemisphere" value={data.bestViewing.hemisphere} />
        <InfoRow label="Visible Latitudes" value={data.bestViewing.latitudes} />
      </>
    );
  }

  if (tab === 'physical' || tab === 'composition') {
    return (
      <>
        <Section title="Major Stars" color="rainbow-yellow">
          {data.stars.slice(0, 8).map((star, i) => (
            <div key={i} className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-white text-xs font-medium">{star.name}</span>
              <div className="flex gap-3">
                <span className="text-gray-400 text-xs">Mag: {star.magnitude.toFixed(2)}</span>
                {star.spectralClass && (
                  <span className="text-rainbow-blue text-xs">{star.spectralClass}</span>
                )}
                {star.distanceLY && (
                  <span className="text-rainbow-orange text-xs">{star.distanceLY} ly</span>
                )}
              </div>
            </div>
          ))}
        </Section>
        <ListSection title="Notable Deep Sky Objects" items={data.notableObjects} color="rainbow-purple" />
      </>
    );
  }

  if (tab === 'facts' || tab === 'exploration') {
    return (
      <>
        <Section title="Mythology" color="rainbow-purple">
          <p className="text-gray-300 text-sm leading-relaxed">{data.mythology}</p>
        </Section>
        <Section title="History" color="rainbow-blue">
          <p className="text-gray-300 text-sm leading-relaxed">{data.history}</p>
        </Section>
        <div className="mt-4 p-3 bg-gradient-to-r from-rainbow-yellow/20 to-rainbow-orange/20 rounded-xl border border-rainbow-yellow/40">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">🌟</span>
            <span className="text-rainbow-yellow font-bold text-sm">Did You Know?</span>
          </div>
          <p className="text-white text-sm leading-relaxed">{data.funFact}</p>
        </div>
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
  if (type === 'sun') return <SunContent data={data as SunData} tab={tab} />;
  if (type === 'planet') return <PlanetContent data={data as PlanetData} tab={tab} />;
  if (type === 'moon') return <MoonContent data={data as MoonData} tab={tab} />;
  if (type === 'constellation') return <ConstellationContent data={data as ConstellationData} tab={tab} />;
  return null;
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

  const springProps = useSpring({
    transform: selectedBody ? 'translateX(0%)' : 'translateX(110%)',
    opacity: selectedBody ? 1 : 0,
    config: config.gentle,
  });

  const tabs: { key: InfoPanelTab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'physical', label: 'Physical' },
    { key: 'orbital', label: 'Orbital' },
    { key: 'composition', label: 'Structure' },
    { key: 'exploration', label: 'Explore' },
    { key: 'facts', label: 'Facts' },
  ];

  return (
    <animated.div
      style={springProps}
      className="fixed top-4 right-4 bottom-4 w-96 max-w-[calc(100vw-2rem)] z-50 pointer-events-auto"
    >
      <div className="h-full glass rounded-3xl overflow-hidden flex flex-col">
        {/* Header */}
        {selectedBody && (
          <div
            className="p-4 border-b border-white/10"
            style={{
              background: `linear-gradient(135deg, ${getBodyColor(selectedBody.data)}20, transparent)`,
            }}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{getBodyEmoji(selectedBody.type, selectedBody.data)}</span>
                <div>
                  <h2 className="text-xl font-bold text-white">{getBodyName(selectedBody.data)}</h2>
                  <span className="text-xs text-gray-400 capitalize">{selectedBody.type}</span>
                </div>
              </div>
              <button
                onClick={() => selectBody(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20
                           flex items-center justify-center transition-all"
              >
                <span className="text-lg">✕</span>
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        {selectedBody && (
          <div className="flex gap-1 p-2 overflow-x-auto border-b border-white/10">
            {tabs.map((tab) => (
              <TabButton
                key={tab.key}
                tab={tab.key}
                currentTab={infoPanelTab}
                label={tab.label}
                onClick={() => setInfoPanelTab(tab.key)}
              />
            ))}
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4">
          {selectedBody && (
            <InfoContent
              type={selectedBody.type}
              data={selectedBody.data}
              tab={infoPanelTab}
            />
          )}
        </div>
      </div>
    </animated.div>
  );
};
