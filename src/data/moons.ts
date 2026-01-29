export interface MoonData {
  id: string;
  name: string;
  parentPlanet: string;

  // Physical properties
  diameter: number; // km
  mass: string;
  density: number; // g/cm³
  gravity: number; // m/s²
  escapeVelocity: number; // km/s

  // Orbital properties
  distanceFromPlanet: number; // km (semi-major axis)
  orbitalPeriod: string;
  orbitalEccentricity: number;
  orbitalInclination: number; // degrees
  isTidallyLocked: boolean;
  orbitDirection: 'prograde' | 'retrograde';

  // Discovery
  discovery: {
    discoverer: string;
    year: number;
    method: string;
  };

  // Composition
  composition: string[];
  surfaceFeatures: string[];
  internalStructure: string[];

  // Atmosphere
  hasAtmosphere: boolean;
  atmosphere?: {
    composition: string[];
    pressure: string;
    features: string[];
  };

  // Special features
  notableFeatures: string[];
  scientificInterest: string[];

  // Temperature
  surfaceTemp: {
    min: number;
    max: number;
    average: number;
  };

  // Education
  funFact: string;

  // Visualization
  emoji: string;
  color: string;
  orbitRadius: number;
  size: number;
  orbitSpeed: number;
}

export const moonsData: MoonData[] = [
  // EARTH'S MOON
  {
    id: "luna",
    name: "The Moon (Luna)",
    parentPlanet: "earth",

    diameter: 3474.8,
    mass: "7.342 × 10²² kg (0.012 Earths)",
    density: 3.34,
    gravity: 1.62,
    escapeVelocity: 2.38,

    distanceFromPlanet: 384400,
    orbitalPeriod: "27.32 days (sidereal)",
    orbitalEccentricity: 0.0549,
    orbitalInclination: 5.145,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "Known since antiquity",
      year: -10000,
      method: "Naked eye",
    },

    composition: ["Silicate rocks", "Iron core", "Regolith (dust) surface"],
    surfaceFeatures: [
      "Maria (dark basaltic plains)",
      "Highlands (bright, heavily cratered)",
      "Impact craters (Tycho, Copernicus, etc.)",
      "Rilles (ancient lava channels)",
      "Mountains up to 5.5 km high",
      "South Pole-Aitken Basin (largest impact crater)",
    ],
    internalStructure: [
      "Small iron core (~350 km radius)",
      "Partially molten outer core",
      "Mantle (silicate rock)",
      "Crust (~50 km thick)",
    ],

    hasAtmosphere: false,

    notableFeatures: [
      "Only natural satellite of Earth",
      "Fifth largest moon in the solar system",
      "Only celestial body humans have walked on",
      "Water ice confirmed in permanently shadowed craters",
      "Causes Earth's ocean tides",
      "Stabilizes Earth's axial tilt",
    ],
    scientificInterest: [
      "Record of early solar system bombardment",
      "Source of Earth's tides",
      "Potential base for space exploration",
      "Water ice for future missions",
      "Helium-3 for potential fusion fuel",
    ],

    surfaceTemp: { min: -173, max: 127, average: -23 },

    funFact: "The Moon is slowly drifting away from Earth at 3.8 cm per year. In about 600 million years, total solar eclipses will no longer be possible because the Moon will appear too small!",

    emoji: "🌙",
    color: "#C4C4C4",
    orbitRadius: 2.5,
    size: 0.27,
    orbitSpeed: 1,
  },

  // MARS MOONS
  {
    id: "phobos",
    name: "Phobos",
    parentPlanet: "mars",

    diameter: 22.4,
    mass: "1.0659 × 10¹⁶ kg",
    density: 1.88,
    gravity: 0.0057,
    escapeVelocity: 0.011,

    distanceFromPlanet: 9376,
    orbitalPeriod: "7.66 hours",
    orbitalEccentricity: 0.0151,
    orbitalInclination: 1.093,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "Asaph Hall",
      year: 1877,
      method: "Telescope (US Naval Observatory)",
    },

    composition: ["Carbon-rich rock", "Ice", "Possibly captured asteroid"],
    surfaceFeatures: [
      "Stickney crater (9 km, nearly shattered moon)",
      "Grooves and striations across surface",
      "Heavily cratered",
      "Irregular, potato-like shape",
    ],
    internalStructure: [
      "Possibly rubble pile (loosely consolidated)",
      "Low density suggests high porosity",
      "May contain ice beneath surface",
    ],

    hasAtmosphere: false,

    notableFeatures: [
      "Closest moon to its planet in solar system",
      "Orbits faster than Mars rotates",
      "Rises in west, sets in east (from Mars surface)",
      "Will crash into Mars in ~50 million years",
      "May break apart into a ring first",
    ],
    scientificInterest: [
      "Possible captured asteroid",
      "Natural space station for Mars missions",
      "Low gravity makes landing easy",
      "Potential water ice for resources",
    ],

    surfaceTemp: { min: -40, max: -4, average: -40 },

    funFact: "Phobos orbits Mars so fast that it rises in the west and sets in the east, completing its orbit in less than 8 hours. It crosses the Martian sky twice a day!",

    emoji: "🥔",
    color: "#8B7355",
    orbitRadius: 1.5,
    size: 0.08,
    orbitSpeed: 4,
  },
  {
    id: "deimos",
    name: "Deimos",
    parentPlanet: "mars",

    diameter: 12.4,
    mass: "1.4762 × 10¹⁵ kg",
    density: 1.47,
    gravity: 0.003,
    escapeVelocity: 0.0056,

    distanceFromPlanet: 23460,
    orbitalPeriod: "30.31 hours",
    orbitalEccentricity: 0.00033,
    orbitalInclination: 0.93,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "Asaph Hall",
      year: 1877,
      method: "Telescope (US Naval Observatory)",
    },

    composition: ["Carbon-rich rock", "Ice", "Possibly captured asteroid"],
    surfaceFeatures: [
      "Smooth surface covered in regolith",
      "Only two named craters (Swift, Voltaire)",
      "Irregular shape",
      "Fewer visible craters than Phobos",
    ],
    internalStructure: [
      "Low density suggests rubble pile",
      "Heavily fractured interior",
    ],

    hasAtmosphere: false,

    notableFeatures: [
      "Smaller of Mars's two moons",
      "Very low escape velocity",
      "Named after Greek god of terror",
      "Slowly spiraling away from Mars",
    ],
    scientificInterest: [
      "Possible captured asteroid",
      "Potential staging point for Mars missions",
      "Study of primitive solar system materials",
    ],

    surfaceTemp: { min: -40, max: -4, average: -40 },

    funFact: "Deimos is so small that you could throw a baseball and it would escape into orbit! The escape velocity is only 5.6 m/s - about the speed of a brisk jog.",

    emoji: "🥔",
    color: "#A08060",
    orbitRadius: 2.2,
    size: 0.05,
    orbitSpeed: 2,
  },

  // JUPITER'S GALILEAN MOONS
  {
    id: "io",
    name: "Io",
    parentPlanet: "jupiter",

    diameter: 3643.2,
    mass: "8.93 × 10²² kg (0.015 Earths)",
    density: 3.53,
    gravity: 1.796,
    escapeVelocity: 2.558,

    distanceFromPlanet: 421700,
    orbitalPeriod: "1.769 days",
    orbitalEccentricity: 0.0041,
    orbitalInclination: 0.05,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "Galileo Galilei",
      year: 1610,
      method: "Telescope",
    },

    composition: ["Silicate rock", "Iron core", "Sulfur and sulfur dioxide surface"],
    surfaceFeatures: [
      "Over 400 active volcanoes",
      "Lava lakes (Loki Patera is largest)",
      "Mountains up to 17.5 km high",
      "Colorful surface from sulfur compounds",
      "No impact craters (constantly resurfaced)",
      "Volcanic plumes up to 500 km high",
    ],
    internalStructure: [
      "Iron or iron-sulfide core (900 km radius)",
      "Silicate mantle (partially molten)",
      "Thin lithosphere (<30 km)",
    ],

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Sulfur dioxide (90%)", "Sulfur monoxide", "Sodium", "Potassium"],
      pressure: "~10⁻⁷ to 10⁻⁹ bar",
      features: ["Constantly replenished by volcanic activity", "Collapses on night side"],
    },

    notableFeatures: [
      "Most volcanically active body in solar system",
      "Interior heated by tidal forces from Jupiter",
      "Resurfaces completely every million years",
      "Supplies particles to Jupiter's magnetosphere",
    ],
    scientificInterest: [
      "Active geology for studying volcanic processes",
      "Tidal heating demonstration",
      "Extreme environment studies",
      "Sulfur-based geochemistry",
    ],

    surfaceTemp: { min: -143, max: 1700, average: -143 },

    funFact: "Io looks like a giant pizza covered in cheese and pepperoni! Its yellow, red, and orange colors come from sulfur compounds spewed by its hundreds of active volcanoes.",

    emoji: "🍕",
    color: "#FFDB58",
    orbitRadius: 2,
    size: 0.28,
    orbitSpeed: 3,
  },
  {
    id: "europa",
    name: "Europa",
    parentPlanet: "jupiter",

    diameter: 3121.6,
    mass: "4.8 × 10²² kg (0.008 Earths)",
    density: 3.01,
    gravity: 1.314,
    escapeVelocity: 2.025,

    distanceFromPlanet: 671034,
    orbitalPeriod: "3.551 days",
    orbitalEccentricity: 0.009,
    orbitalInclination: 0.47,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "Galileo Galilei",
      year: 1610,
      method: "Telescope",
    },

    composition: ["Water ice shell", "Subsurface ocean", "Silicate rock", "Iron core"],
    surfaceFeatures: [
      "Youngest surface of Galilean moons",
      "Lineae (dark streaks/cracks)",
      "Chaos terrain (disrupted ice)",
      "Very few impact craters",
      "Ice rafts that have shifted",
      "Possible water vapor plumes",
    ],
    internalStructure: [
      "Iron core (~600 km radius)",
      "Rocky mantle",
      "Liquid water ocean (100 km deep)",
      "Ice shell (15-25 km thick)",
    ],

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Oxygen (primarily)", "Hydrogen"],
      pressure: "~10⁻¹² bar (extremely tenuous)",
      features: ["Created by radiation splitting water ice"],
    },

    notableFeatures: [
      "Global subsurface ocean (2× Earth's water)",
      "Possible hydrothermal vents",
      "Youngest surface of Galilean moons",
      "Smoothest solid body in solar system",
    ],
    scientificInterest: [
      "Prime candidate for extraterrestrial life",
      "Possible hydrothermal activity",
      "Ocean chemistry studies",
      "Ice shell dynamics",
    ],

    surfaceTemp: { min: -223, max: -148, average: -171 },

    funFact: "Europa has more liquid water than all of Earth's oceans combined! Scientists believe its subsurface ocean, kept warm by tidal heating, could harbor life - possibly near volcanic vents on the ocean floor.",

    emoji: "🧊",
    color: "#E8E4C9",
    orbitRadius: 2.8,
    size: 0.24,
    orbitSpeed: 2,
  },
  {
    id: "ganymede",
    name: "Ganymede",
    parentPlanet: "jupiter",

    diameter: 5268.2,
    mass: "1.4819 × 10²³ kg (0.025 Earths)",
    density: 1.94,
    gravity: 1.428,
    escapeVelocity: 2.741,

    distanceFromPlanet: 1070400,
    orbitalPeriod: "7.155 days",
    orbitalEccentricity: 0.0013,
    orbitalInclination: 0.20,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "Galileo Galilei",
      year: 1610,
      method: "Telescope",
    },

    composition: ["Water ice", "Silicate rock", "Iron core"],
    surfaceFeatures: [
      "Dark, heavily cratered regions (oldest)",
      "Bright, grooved terrain (younger)",
      "Impact craters with bright ray systems",
      "Sulci (parallel grooves and ridges)",
    ],
    internalStructure: [
      "Iron-sulfide core (500 km radius)",
      "Silicate mantle",
      "Ice shell (800 km thick)",
      "Possible subsurface ocean (between ice layers)",
    ],

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Oxygen", "Ozone"],
      pressure: "~10⁻¹² bar",
      features: ["Very thin, detected by Hubble Space Telescope"],
    },

    notableFeatures: [
      "Largest moon in solar system",
      "Larger than planet Mercury",
      "Only moon with its own magnetic field",
      "Possible subsurface ocean",
    ],
    scientificInterest: [
      "Intrinsic magnetic field generation",
      "Potential ocean beneath ice",
      "Geological diversity",
      "Jupiter system dynamics",
    ],

    surfaceTemp: { min: -203, max: -121, average: -163 },

    funFact: "Ganymede is the largest moon in the solar system - it's even bigger than the planet Mercury! It's also the only moon known to have its own magnetic field, creating auroras.",

    emoji: "🏆",
    color: "#A0A0A0",
    orbitRadius: 3.6,
    size: 0.41,
    orbitSpeed: 1.2,
  },
  {
    id: "callisto",
    name: "Callisto",
    parentPlanet: "jupiter",

    diameter: 4820.6,
    mass: "1.0759 × 10²³ kg (0.018 Earths)",
    density: 1.83,
    gravity: 1.235,
    escapeVelocity: 2.440,

    distanceFromPlanet: 1882700,
    orbitalPeriod: "16.689 days",
    orbitalEccentricity: 0.0074,
    orbitalInclination: 0.192,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "Galileo Galilei",
      year: 1610,
      method: "Telescope",
    },

    composition: ["Water ice (40%)", "Silicate rock (60%)", "Possible ocean"],
    surfaceFeatures: [
      "Most heavily cratered object in solar system",
      "Valhalla (multi-ring impact basin, 3,800 km)",
      "Ancient, geologically dead surface",
      "No mountains or geological features",
    ],
    internalStructure: [
      "Undifferentiated or partially differentiated",
      "Possible small rocky core",
      "Ice-rock mixture throughout",
      "Possible subsurface ocean at depth",
    ],

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Carbon dioxide", "Molecular oxygen"],
      pressure: "~7.5 × 10⁻¹² bar",
      features: ["Very tenuous"],
    },

    notableFeatures: [
      "Most heavily cratered body in solar system",
      "Very ancient surface (4 billion years)",
      "Outside Jupiter's main radiation belt",
      "Possible location for future human base",
    ],
    scientificInterest: [
      "Record of early solar system bombardment",
      "Safe from Jupiter's radiation",
      "Potential deep ocean",
      "Primitive solar system material",
    ],

    surfaceTemp: { min: -193, max: -108, average: -139 },

    funFact: "Callisto is the most heavily cratered object in the solar system - its ancient surface has been collecting impact craters for 4 billion years! Because it's outside Jupiter's radiation belt, it might be the safest place for a human base in the Jupiter system.",

    emoji: "🎯",
    color: "#6B6B6B",
    orbitRadius: 4.5,
    size: 0.38,
    orbitSpeed: 0.7,
  },

  // SATURN'S MAJOR MOONS
  {
    id: "titan",
    name: "Titan",
    parentPlanet: "saturn",

    diameter: 5149.5,
    mass: "1.3452 × 10²³ kg (0.022 Earths)",
    density: 1.88,
    gravity: 1.352,
    escapeVelocity: 2.639,

    distanceFromPlanet: 1221870,
    orbitalPeriod: "15.945 days",
    orbitalEccentricity: 0.0288,
    orbitalInclination: 0.34,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "Christiaan Huygens",
      year: 1655,
      method: "Telescope",
    },

    composition: ["Water ice", "Rocky silicates", "Liquid methane/ethane lakes"],
    surfaceFeatures: [
      "Hydrocarbon lakes and seas (Kraken Mare largest)",
      "Methane rain and rivers",
      "Dunes of organic material",
      "Possible cryovolcanoes",
      "Few impact craters (young surface)",
    ],
    internalStructure: [
      "Rocky core (~3,400 km diameter)",
      "High-pressure ice layer",
      "Possible subsurface water ocean",
      "Ice crust",
    ],

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Nitrogen (94.2%)", "Methane (5.65%)", "Hydrogen (0.1%)"],
      pressure: "1.45 bar (45% higher than Earth!)",
      features: [
        "Only moon with substantial atmosphere",
        "Thicker than Earth's atmosphere",
        "Orange haze from tholins",
        "Methane cycle (like Earth's water cycle)",
        "Hydrocarbon smog",
      ],
    },

    notableFeatures: [
      "Only moon with a dense atmosphere",
      "Only place besides Earth with surface liquids",
      "Methane/ethane lakes and seas",
      "Weather system with rain and seasons",
      "Huygens probe landed here (2005)",
    ],
    scientificInterest: [
      "Prebiotic chemistry laboratory",
      "Analogous to early Earth",
      "Unique hydrological cycle",
      "Potential subsurface ocean",
    ],

    surfaceTemp: { min: -179, max: -179, average: -179 },

    funFact: "Titan is the only moon with a thick atmosphere and the only place besides Earth with lakes and seas on its surface - but they're filled with liquid methane and ethane, not water! The atmosphere is so thick and gravity so weak that humans could fly with wings attached to their arms.",

    emoji: "🌫️",
    color: "#E8A838",
    orbitRadius: 3.5,
    size: 0.40,
    orbitSpeed: 1,
  },
  {
    id: "enceladus",
    name: "Enceladus",
    parentPlanet: "saturn",

    diameter: 504.2,
    mass: "1.08 × 10²⁰ kg",
    density: 1.61,
    gravity: 0.113,
    escapeVelocity: 0.239,

    distanceFromPlanet: 238020,
    orbitalPeriod: "1.370 days",
    orbitalEccentricity: 0.0047,
    orbitalInclination: 0.02,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "William Herschel",
      year: 1789,
      method: "Telescope",
    },

    composition: ["Water ice", "Silicate core", "Subsurface ocean"],
    surfaceFeatures: [
      "Tiger stripes (warm fractures at south pole)",
      "Geysers/plumes of water and ice",
      "Youngest, brightest surface in solar system",
      "Few craters, heavily resurfaced",
      "Smooth and cratered regions",
    ],
    internalStructure: [
      "Silicate core (~200 km diameter)",
      "Global subsurface ocean",
      "Ice shell (~30 km thick)",
      "Hydrothermal vents likely",
    ],

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Water vapor (91%)", "Nitrogen", "Carbon dioxide", "Methane"],
      pressure: "~10⁻¹¹ bar",
      features: ["Primarily from south pole geysers", "Escapes easily due to low gravity"],
    },

    notableFeatures: [
      "Active geysers at south pole",
      "Feeds Saturn's E ring",
      "Confirmed subsurface ocean",
      "Organic molecules detected",
      "Hydrothermal activity indicated",
    ],
    scientificInterest: [
      "Prime candidate for extraterrestrial life",
      "Active geology accessible from space",
      "Complex organic chemistry",
      "Hydrothermal vents on ocean floor",
    ],

    surfaceTemp: { min: -240, max: -128, average: -201 },

    funFact: "Enceladus shoots geysers of water and ice from cracks at its south pole! These plumes contain organic molecules and hydrogen - possible ingredients for life. Cassini flew through these geysers multiple times to sample them.",

    emoji: "💦",
    color: "#FFFFFF",
    orbitRadius: 2,
    size: 0.12,
    orbitSpeed: 3,
  },
  {
    id: "mimas",
    name: "Mimas",
    parentPlanet: "saturn",

    diameter: 396.4,
    mass: "3.75 × 10¹⁹ kg",
    density: 1.15,
    gravity: 0.064,
    escapeVelocity: 0.159,

    distanceFromPlanet: 185520,
    orbitalPeriod: "0.942 days",
    orbitalEccentricity: 0.0196,
    orbitalInclination: 1.574,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "William Herschel",
      year: 1789,
      method: "Telescope",
    },

    composition: ["Water ice (primarily)", "Small rocky core"],
    surfaceFeatures: [
      "Herschel crater (130 km, 1/3 of diameter)",
      "Impact nearly destroyed moon",
      "Heavily cratered surface",
      "Crater walls 5 km high",
    ],
    internalStructure: [
      "Mostly water ice",
      "Small rocky core",
      "May have internal ocean (recent evidence)",
    ],

    hasAtmosphere: false,

    notableFeatures: [
      "Looks like the Death Star from Star Wars",
      "Herschel impact nearly destroyed it",
      "Creates Cassini Division in Saturn's rings",
      "Smallest object to be rounded by gravity",
    ],
    scientificInterest: [
      "Orbital resonance shapes Saturn's rings",
      "Near-destruction impact survival",
      "Possible internal ocean (surprising)",
    ],

    surfaceTemp: { min: -209, max: -181, average: -196 },

    funFact: "Mimas looks exactly like the Death Star from Star Wars! The giant Herschel crater is 130 km wide - the impact that created it nearly shattered the entire moon. The crater is so large that it's 1/3 of Mimas's entire diameter!",

    emoji: "⭐",
    color: "#C8C8C8",
    orbitRadius: 1.6,
    size: 0.09,
    orbitSpeed: 4,
  },
  {
    id: "rhea",
    name: "Rhea",
    parentPlanet: "saturn",

    diameter: 1527.6,
    mass: "2.31 × 10²¹ kg",
    density: 1.24,
    gravity: 0.264,
    escapeVelocity: 0.635,

    distanceFromPlanet: 527040,
    orbitalPeriod: "4.518 days",
    orbitalEccentricity: 0.001,
    orbitalInclination: 0.35,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "Giovanni Cassini",
      year: 1672,
      method: "Telescope",
    },

    composition: ["Water ice (75%)", "Rock (25%)"],
    surfaceFeatures: [
      "Two distinct hemispheres",
      "Leading hemisphere: heavily cratered",
      "Trailing hemisphere: bright ice terrain",
      "Wispy streaks from ice cliffs",
    ],
    internalStructure: [
      "May be homogeneous ice-rock mixture",
      "Or small rocky core with ice mantle",
      "No evidence of internal ocean",
    ],

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Oxygen", "Carbon dioxide"],
      pressure: "~10⁻¹¹ bar",
      features: ["Very tenuous, recently discovered"],
    },

    notableFeatures: [
      "Second-largest moon of Saturn",
      "May have tenuous ring system",
      "Oxygen-rich exosphere",
      "Heavily cratered ice world",
    ],
    scientificInterest: [
      "Possible ring system around a moon",
      "Oxygen atmosphere production",
      "Ancient cratering record",
    ],

    surfaceTemp: { min: -220, max: -174, average: -197 },

    funFact: "Rhea might be the only moon with its own rings! Scientists detected something orbiting around this icy moon - if confirmed, Rhea would be the first moon known to have rings.",

    emoji: "💍",
    color: "#D0D0D0",
    orbitRadius: 2.6,
    size: 0.18,
    orbitSpeed: 2,
  },
  {
    id: "dione",
    name: "Dione",
    parentPlanet: "saturn",

    diameter: 1122.8,
    mass: "1.095 × 10²¹ kg",
    density: 1.48,
    gravity: 0.232,
    escapeVelocity: 0.510,

    distanceFromPlanet: 377400,
    orbitalPeriod: "2.737 days",
    orbitalEccentricity: 0.0022,
    orbitalInclination: 0.02,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "Giovanni Cassini",
      year: 1684,
      method: "Telescope",
    },

    composition: ["Water ice", "Dense rocky core"],
    surfaceFeatures: [
      "Bright ice cliffs (chasmata)",
      "Wispy terrain from tectonics",
      "Heavily cratered plains",
      "Fractures and ridges",
    ],
    internalStructure: [
      "Silicate rock core",
      "Possible subsurface ocean",
      "Ice shell",
    ],

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Molecular oxygen"],
      pressure: "~10⁻¹¹ bar",
      features: ["Extremely thin exosphere"],
    },

    notableFeatures: [
      "Fourth-largest moon of Saturn",
      "Denser than expected (large rocky core)",
      "Dramatic ice cliffs and canyons",
      "Shares orbit with small moon Helene",
    ],
    scientificInterest: [
      "Possible subsurface ocean",
      "Tectonic activity evidence",
      "Orbital resonance with Enceladus",
    ],

    surfaceTemp: { min: -186, max: -186, average: -186 },

    funFact: "Dione has bright ice cliffs called 'wispy terrain' that can be hundreds of meters tall! These dramatic features formed when the moon's icy crust cracked and shifted, exposing fresh ice beneath.",

    emoji: "🏔️",
    color: "#E0E0E0",
    orbitRadius: 2.3,
    size: 0.14,
    orbitSpeed: 2.5,
  },
  {
    id: "tethys",
    name: "Tethys",
    parentPlanet: "saturn",

    diameter: 1062.2,
    mass: "6.17 × 10²⁰ kg",
    density: 0.984,
    gravity: 0.146,
    escapeVelocity: 0.394,

    distanceFromPlanet: 294660,
    orbitalPeriod: "1.888 days",
    orbitalEccentricity: 0.0001,
    orbitalInclination: 1.12,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "Giovanni Cassini",
      year: 1684,
      method: "Telescope",
    },

    composition: ["Almost pure water ice", "Small rocky component"],
    surfaceFeatures: [
      "Ithaca Chasma (giant canyon, 2,000 km long)",
      "Odysseus crater (450 km diameter)",
      "Lightly cratered plains",
      "Canyon circles 3/4 of moon",
    ],
    internalStructure: [
      "Nearly pure ice",
      "Very low density",
      "Probably no differentiation",
    ],

    hasAtmosphere: false,

    notableFeatures: [
      "Lowest density of major Saturn moons",
      "Almost pure water ice composition",
      "Ithaca Chasma wraps around moon",
      "Two co-orbital moons (Telesto, Calypso)",
    ],
    scientificInterest: [
      "Pure ice composition study",
      "Large-scale tectonic feature",
      "Trojans study (co-orbital moons)",
    ],

    surfaceTemp: { min: -187, max: -187, average: -187 },

    funFact: "Tethys has a giant canyon called Ithaca Chasma that stretches 2,000 km - about 3/4 of the way around the entire moon! This crack may have formed when the moon's interior froze and expanded.",

    emoji: "🕳️",
    color: "#F0F0F0",
    orbitRadius: 2.1,
    size: 0.13,
    orbitSpeed: 2.8,
  },
  {
    id: "iapetus",
    name: "Iapetus",
    parentPlanet: "saturn",

    diameter: 1469.0,
    mass: "1.81 × 10²¹ kg",
    density: 1.09,
    gravity: 0.223,
    escapeVelocity: 0.573,

    distanceFromPlanet: 3560820,
    orbitalPeriod: "79.32 days",
    orbitalEccentricity: 0.0286,
    orbitalInclination: 15.47,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "Giovanni Cassini",
      year: 1671,
      method: "Telescope",
    },

    composition: ["Water ice", "Rocky material", "Dark carbon compounds"],
    surfaceFeatures: [
      "Two-toned surface (dark/light hemispheres)",
      "Massive equatorial ridge (20 km high, 1,300 km long)",
      "Dark material on leading hemisphere",
      "Bright ice on trailing hemisphere",
    ],
    internalStructure: [
      "Mostly water ice",
      "Small rocky core",
      "Possibly porous interior",
    ],

    hasAtmosphere: false,

    notableFeatures: [
      "Dramatic two-toned coloring",
      "Mysterious equatorial ridge",
      "Only large Saturn moon with inclined orbit",
      "Farthest major moon from Saturn",
    ],
    scientificInterest: [
      "Origin of two-toned coloring",
      "Equatorial ridge formation",
      "Dark material source",
    ],

    surfaceTemp: { min: -173, max: -143, average: -163 },

    funFact: "Iapetus is the yin-yang moon of the solar system! One side is bright white ice and the other is dark as coal. It also has a massive mountain ridge running around its equator that makes it look like a walnut!",

    emoji: "☯️",
    color: "#808080",
    orbitRadius: 5,
    size: 0.17,
    orbitSpeed: 0.3,
  },

  // URANUS MOONS
  {
    id: "miranda",
    name: "Miranda",
    parentPlanet: "uranus",

    diameter: 471.6,
    mass: "6.6 × 10¹⁹ kg",
    density: 1.20,
    gravity: 0.079,
    escapeVelocity: 0.193,

    distanceFromPlanet: 129390,
    orbitalPeriod: "1.413 days",
    orbitalEccentricity: 0.0013,
    orbitalInclination: 4.34,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "Gerard Kuiper",
      year: 1948,
      method: "Telescope (McDonald Observatory)",
    },

    composition: ["Water ice (50%)", "Silicate rock (50%)"],
    surfaceFeatures: [
      "Verona Rupes (tallest cliff in solar system, 20 km)",
      "Coronae (complex terrain)",
      "Chevron patterns",
      "Extremely diverse geology",
    ],
    internalStructure: [
      "Probably differentiated",
      "Rocky core with ice mantle",
      "May have been shattered and reassembled",
    ],

    hasAtmosphere: false,

    notableFeatures: [
      "Most geologically diverse surface in solar system",
      "Verona Rupes: tallest known cliff",
      "Chevron-shaped feature Inverness Corona",
      "May have been shattered and re-formed",
    ],
    scientificInterest: [
      "Extreme geological diversity",
      "Possible past catastrophic disruption",
      "Tidal heating effects",
    ],

    surfaceTemp: { min: -223, max: -187, average: -187 },

    funFact: "Miranda has the tallest cliff in the solar system - Verona Rupes is 20 km high! If you jumped off, you'd fall for about 12 minutes before hitting the bottom (gravity is very weak). The moon's patchwork surface suggests it may have been shattered by impacts and reassembled.",

    emoji: "🧗",
    color: "#A8A8A8",
    orbitRadius: 1.8,
    size: 0.11,
    orbitSpeed: 3,
  },
  {
    id: "ariel",
    name: "Ariel",
    parentPlanet: "uranus",

    diameter: 1157.8,
    mass: "1.35 × 10²¹ kg",
    density: 1.67,
    gravity: 0.269,
    escapeVelocity: 0.558,

    distanceFromPlanet: 191020,
    orbitalPeriod: "2.520 days",
    orbitalEccentricity: 0.0012,
    orbitalInclination: 0.26,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "William Lassell",
      year: 1851,
      method: "Telescope",
    },

    composition: ["Water ice", "Silicates", "Carbon dioxide ice"],
    surfaceFeatures: [
      "Extensive canyon systems",
      "Smooth plains (cryovolcanic resurfacing)",
      "Brightest surface of Uranian moons",
      "Youngest surface features",
    ],
    internalStructure: [
      "Rocky core (65% of radius)",
      "Icy mantle",
      "Past tidal heating activity",
    ],

    hasAtmosphere: false,

    notableFeatures: [
      "Brightest Uranian moon",
      "Most geologically active Uranian moon",
      "Extensive graben (rift valleys)",
      "Evidence of past cryovolcanism",
    ],
    scientificInterest: [
      "Past geological activity",
      "Cryovolcanic processes",
      "Tidal evolution of Uranus system",
    ],

    surfaceTemp: { min: -213, max: -193, average: -213 },

    funFact: "Ariel has the brightest and youngest surface of all Uranus's moons! Its surface is covered with huge canyons and smooth plains that were resurfaced by icy lava flows - evidence of past cryovolcanic activity.",

    emoji: "✨",
    color: "#C8C8C8",
    orbitRadius: 2.2,
    size: 0.14,
    orbitSpeed: 2.5,
  },
  {
    id: "umbriel",
    name: "Umbriel",
    parentPlanet: "uranus",

    diameter: 1169.4,
    mass: "1.17 × 10²¹ kg",
    density: 1.39,
    gravity: 0.234,
    escapeVelocity: 0.520,

    distanceFromPlanet: 266000,
    orbitalPeriod: "4.144 days",
    orbitalEccentricity: 0.0039,
    orbitalInclination: 0.13,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "William Lassell",
      year: 1851,
      method: "Telescope",
    },

    composition: ["Water ice", "Rock", "Carbon compounds"],
    surfaceFeatures: [
      "Darkest of Uranian moons",
      "Wunda crater (bright ring feature)",
      "Heavily cratered, ancient surface",
      "Mysterious dark coating",
    ],
    internalStructure: [
      "Rocky core",
      "Icy mantle",
      "Undifferentiated or partially differentiated",
    ],

    hasAtmosphere: false,

    notableFeatures: [
      "Darkest major Uranian moon",
      "Ancient, heavily cratered surface",
      "Mysterious bright ring in Wunda crater",
      "Little geological activity",
    ],
    scientificInterest: [
      "Dark surface material origin",
      "Ancient cratering record",
      "Wunda bright ring mystery",
    ],

    surfaceTemp: { min: -208, max: -198, average: -208 },

    funFact: "Umbriel is the darkest of Uranus's major moons! It has a mysterious bright ring on its surface called Wunda crater that scientists still don't fully understand - it may be a deposit of carbon dioxide ice.",

    emoji: "🌑",
    color: "#4A4A4A",
    orbitRadius: 2.7,
    size: 0.14,
    orbitSpeed: 2,
  },
  {
    id: "titania",
    name: "Titania",
    parentPlanet: "uranus",

    diameter: 1577.8,
    mass: "3.53 × 10²¹ kg",
    density: 1.71,
    gravity: 0.379,
    escapeVelocity: 0.773,

    distanceFromPlanet: 436300,
    orbitalPeriod: "8.706 days",
    orbitalEccentricity: 0.0011,
    orbitalInclination: 0.34,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "William Herschel",
      year: 1787,
      method: "Telescope",
    },

    composition: ["Water ice", "Silicate rock", "Carbon compounds"],
    surfaceFeatures: [
      "Messina Chasma (1,500 km long canyon)",
      "Impact craters",
      "Smooth plains between craters",
      "Fault scarps",
    ],
    internalStructure: [
      "Rocky core (66% of radius)",
      "Icy mantle",
      "Possible thin subsurface ocean",
    ],

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Carbon dioxide"],
      pressure: "Extremely thin",
      features: ["Seasonal variation possible"],
    },

    notableFeatures: [
      "Largest moon of Uranus",
      "8th largest moon in solar system",
      "Named after Queen of Fairies (Shakespeare)",
      "Evidence of past tectonic activity",
    ],
    scientificInterest: [
      "Possible subsurface ocean",
      "Past tectonic activity",
      "Carbon dioxide detection",
    ],

    surfaceTemp: { min: -213, max: -184, average: -203 },

    funFact: "Titania is the largest moon of Uranus and the 8th largest moon in the solar system! It's named after the Queen of the Fairies from Shakespeare's A Midsummer Night's Dream - all of Uranus's moons are named after characters from Shakespeare and Alexander Pope.",

    emoji: "👑",
    color: "#B8B8B8",
    orbitRadius: 3.4,
    size: 0.19,
    orbitSpeed: 1.2,
  },
  {
    id: "oberon",
    name: "Oberon",
    parentPlanet: "uranus",

    diameter: 1522.8,
    mass: "3.01 × 10²¹ kg",
    density: 1.63,
    gravity: 0.346,
    escapeVelocity: 0.727,

    distanceFromPlanet: 583520,
    orbitalPeriod: "13.463 days",
    orbitalEccentricity: 0.0014,
    orbitalInclination: 0.06,
    isTidallyLocked: true,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "William Herschel",
      year: 1787,
      method: "Telescope",
    },

    composition: ["Water ice", "Rock", "Carbon compounds"],
    surfaceFeatures: [
      "Heavily cratered surface",
      "Dark floor craters (cryovolcanic?)",
      "Mountain reaching 6 km high",
      "Ancient, geologically dead surface",
    ],
    internalStructure: [
      "Rocky core",
      "Icy mantle",
      "Possible thin subsurface ocean",
    ],

    hasAtmosphere: false,

    notableFeatures: [
      "Second-largest Uranian moon",
      "Outermost major moon of Uranus",
      "Most heavily cratered Uranian moon",
      "Dark material in crater floors",
    ],
    scientificInterest: [
      "Ancient cratering record",
      "Dark crater floor deposits",
      "Cryovolcanic history",
    ],

    surfaceTemp: { min: -203, max: -193, average: -198 },

    funFact: "Oberon is the outermost major moon of Uranus! Its surface is covered in impact craters, and some have dark material on their floors that might be dirty ice from ancient cryovolcanic eruptions.",

    emoji: "🎭",
    color: "#909090",
    orbitRadius: 4,
    size: 0.18,
    orbitSpeed: 0.8,
  },

  // NEPTUNE MOONS
  {
    id: "triton",
    name: "Triton",
    parentPlanet: "neptune",

    diameter: 2706.8,
    mass: "2.14 × 10²² kg (0.00358 Earths)",
    density: 2.061,
    gravity: 0.779,
    escapeVelocity: 1.455,

    distanceFromPlanet: 354759,
    orbitalPeriod: "5.877 days (retrograde)",
    orbitalEccentricity: 0.00002,
    orbitalInclination: 156.9,
    isTidallyLocked: true,
    orbitDirection: "retrograde",

    discovery: {
      discoverer: "William Lassell",
      year: 1846,
      method: "Telescope (just 17 days after Neptune discovered)",
    },

    composition: ["Nitrogen ice", "Water ice", "Rocky core", "Carbon dioxide ice"],
    surfaceFeatures: [
      "Cantaloupe terrain (unique dimpled surface)",
      "Nitrogen geysers (8 km high plumes)",
      "South polar cap (nitrogen/methane ice)",
      "Very few craters (young surface)",
      "Cryovolcanic plains",
    ],
    internalStructure: [
      "Rocky metallic core (2/3 of mass)",
      "Icy mantle",
      "Possible subsurface ocean",
      "Thin nitrogen ice crust",
    ],

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Nitrogen (99.9%)", "Methane", "Carbon monoxide"],
      pressure: "1.4 × 10⁻⁵ bar",
      features: [
        "Thin but detectable atmosphere",
        "Clouds and haze",
        "Seasonal changes",
        "Winds up to 100 m/s",
      ],
    },

    notableFeatures: [
      "Only large moon with retrograde orbit",
      "Probably captured from Kuiper Belt",
      "Active nitrogen geysers",
      "Coldest measured surface in solar system",
      "Will eventually crash into Neptune",
    ],
    scientificInterest: [
      "Kuiper Belt object capture dynamics",
      "Active cryovolcanism",
      "Possible subsurface ocean",
      "Atmospheric processes at low temperatures",
    ],

    surfaceTemp: { min: -235, max: -235, average: -235 },

    funFact: "Triton orbits Neptune backwards! It's the only large moon to do this, which means it was probably captured from the Kuiper Belt. It has geysers that shoot nitrogen gas 8 km high into its thin atmosphere. Triton is slowly spiraling inward and will eventually crash into Neptune or break apart into rings!",

    emoji: "❄️",
    color: "#D4E5E5",
    orbitRadius: 2.5,
    size: 0.21,
    orbitSpeed: 1.5,
  },
  {
    id: "nereid",
    name: "Nereid",
    parentPlanet: "neptune",

    diameter: 340,
    mass: "3.1 × 10¹⁹ kg",
    density: 1.5,
    gravity: 0.072,
    escapeVelocity: 0.156,

    distanceFromPlanet: 5513400,
    orbitalPeriod: "360.13 days",
    orbitalEccentricity: 0.7507,
    orbitalInclination: 32.55,
    isTidallyLocked: false,
    orbitDirection: "prograde",

    discovery: {
      discoverer: "Gerard Kuiper",
      year: 1949,
      method: "Telescope",
    },

    composition: ["Water ice", "Rock"],
    surfaceFeatures: [
      "Irregular shape",
      "Surface features unknown (never visited closely)",
    ],
    internalStructure: [
      "Unknown - never studied closely",
    ],

    hasAtmosphere: false,

    notableFeatures: [
      "Most eccentric orbit of any known moon",
      "Distance varies from 1.4 to 9.6 million km",
      "May be a captured Kuiper Belt object",
      "Third-largest Neptune moon",
    ],
    scientificInterest: [
      "Extreme orbital eccentricity origin",
      "Possible captured object",
      "Neptune system evolution",
    ],

    surfaceTemp: { min: -220, max: -220, average: -220 },

    funFact: "Nereid has the most eccentric orbit of any known moon in the solar system! It swings from 1.4 million km to 9.6 million km from Neptune - that's a huge difference! This wild orbit suggests it was captured from the Kuiper Belt, or its orbit was scrambled when Triton was captured.",

    emoji: "🎢",
    color: "#808080",
    orbitRadius: 5,
    size: 0.08,
    orbitSpeed: 0.2,
  },
];

export const getMoonsByPlanet = (planetId: string): MoonData[] => {
  return moonsData.filter(moon => moon.parentPlanet === planetId);
};

export const getMoonById = (id: string): MoonData | undefined => {
  return moonsData.find(moon => moon.id === id);
};

export const getMoonsWithOceans = (): MoonData[] => {
  return moonsData.filter(moon =>
    moon.scientificInterest.some(interest =>
      interest.toLowerCase().includes('ocean') ||
      interest.toLowerCase().includes('life')
    )
  );
};

export const getVolcanicallyActiveMoons = (): MoonData[] => {
  return moonsData.filter(moon =>
    moon.notableFeatures.some(feature =>
      feature.toLowerCase().includes('volcanic') ||
      feature.toLowerCase().includes('geyser')
    )
  );
};
