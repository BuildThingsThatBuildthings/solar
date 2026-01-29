export interface PlanetData {
  id: string;
  name: string;
  type: 'terrestrial' | 'gas giant' | 'ice giant';

  // Physical properties
  diameter: number; // km
  mass: string;
  volume: string;
  density: number; // g/cm³
  gravity: number; // m/s²
  escapeVelocity: number; // km/s

  // Orbital properties
  distanceFromSun: {
    average: number; // million km
    perihelion: number;
    aphelion: number;
  };
  orbitalPeriod: string;
  orbitalSpeed: number; // km/s average
  orbitalEccentricity: number;
  orbitalInclination: number; // degrees to ecliptic

  // Rotation
  rotationPeriod: string;
  axialTilt: number; // degrees
  rotationDirection: 'prograde' | 'retrograde';

  // Atmosphere
  hasAtmosphere: boolean;
  atmosphere: {
    composition: string[];
    pressure: string; // relative to Earth or absolute
    features: string[];
  };

  // Magnetic field
  hasMagneticField: boolean;
  magneticFieldStrength?: string;

  // Surface/Structure
  composition: string[];
  surfaceFeatures: string[];
  internalStructure: string[];

  // Temperature
  tempRange: {
    min: number;
    max: number;
    average: number;
  };

  // Moons & Rings
  confirmedMoons: number;
  hasRings: boolean;
  ringSystem?: string;

  // Exploration
  missions: {
    name: string;
    year: number;
    type: 'flyby' | 'orbiter' | 'lander' | 'rover';
    agency: string;
    highlights: string;
  }[];

  // Education
  funFacts: string[];
  comparisons: string[];

  // Visualization
  emoji: string;
  color: string;
  orbitRadius: number;
  size: number;
  orbitSpeed: number;
  textureUrl?: string;
  ringColor?: string;
}

export const planetsData: PlanetData[] = [
  {
    id: "mercury",
    name: "Mercury",
    type: "terrestrial",

    diameter: 4879,
    mass: "3.285 × 10²³ kg (0.055 Earths)",
    volume: "6.083 × 10¹⁰ km³",
    density: 5.43,
    gravity: 3.7,
    escapeVelocity: 4.3,

    distanceFromSun: {
      average: 57.9,
      perihelion: 46.0,
      aphelion: 69.8,
    },
    orbitalPeriod: "87.97 Earth days",
    orbitalSpeed: 47.4,
    orbitalEccentricity: 0.2056,
    orbitalInclination: 7.0,

    rotationPeriod: "58.65 Earth days",
    axialTilt: 0.034,
    rotationDirection: "prograde",

    hasAtmosphere: false,
    atmosphere: {
      composition: ["Oxygen (42%)", "Sodium (29%)", "Hydrogen (22%)", "Helium (6%)"],
      pressure: "~10⁻¹⁴ bar (essentially a vacuum)",
      features: ["Exosphere only", "Constantly replenished by solar wind", "No weather"],
    },

    hasMagneticField: true,
    magneticFieldStrength: "~1% of Earth's",

    composition: ["Iron core (~70% of mass)", "Silicate mantle", "Thin crust"],
    surfaceFeatures: [
      "Caloris Basin (1,550 km impact crater)",
      "Heavily cratered terrain",
      "Smooth plains from ancient volcanism",
      "Scarps (cliffs) from planetary shrinking",
      "Permanently shadowed craters with water ice",
    ],
    internalStructure: [
      "Large iron core (1,800 km radius, 55% of volume)",
      "Silicate mantle (400 km thick)",
      "Thin silicate crust (35 km thick)",
    ],

    tempRange: { min: -180, max: 430, average: 167 },

    confirmedMoons: 0,
    hasRings: false,

    missions: [
      { name: "Mariner 10", year: 1974, type: "flyby", agency: "NASA", highlights: "First spacecraft to visit, mapped 45% of surface" },
      { name: "MESSENGER", year: 2011, type: "orbiter", agency: "NASA", highlights: "First orbiter, discovered water ice in polar craters" },
      { name: "BepiColombo", year: 2025, type: "orbiter", agency: "ESA/JAXA", highlights: "Two orbiters studying magnetosphere and surface" },
    ],

    funFacts: [
      "Mercury has the most eccentric orbit of any planet - varying by 24 million km!",
      "A day on Mercury (sunrise to sunrise) takes 176 Earth days - twice its year!",
      "Despite being closest to the Sun, it's NOT the hottest planet (Venus is).",
      "Mercury has shrunk by 7 km in radius as its core cooled and contracted.",
      "Water ice exists in permanently shadowed craters despite the extreme heat.",
    ],
    comparisons: [
      "Mercury is only 40% larger than Earth's Moon",
      "It's smaller than Jupiter's moon Ganymede and Saturn's moon Titan",
      "Its core is proportionally larger than any other planet's",
      "Surface gravity is similar to Mars (38% of Earth's)",
    ],

    emoji: "☿️",
    color: "#B5B5B5",
    orbitRadius: 8,
    size: 0.38,
    orbitSpeed: 4.15,
  },
  {
    id: "venus",
    name: "Venus",
    type: "terrestrial",

    diameter: 12104,
    mass: "4.867 × 10²⁴ kg (0.815 Earths)",
    volume: "9.28 × 10¹¹ km³",
    density: 5.24,
    gravity: 8.87,
    escapeVelocity: 10.36,

    distanceFromSun: {
      average: 108.2,
      perihelion: 107.5,
      aphelion: 108.9,
    },
    orbitalPeriod: "224.7 Earth days",
    orbitalSpeed: 35.0,
    orbitalEccentricity: 0.0067,
    orbitalInclination: 3.39,

    rotationPeriod: "243.02 Earth days (retrograde)",
    axialTilt: 177.4,
    rotationDirection: "retrograde",

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Carbon dioxide (96.5%)", "Nitrogen (3.5%)", "Sulfur dioxide", "Argon"],
      pressure: "92 bar (92× Earth's surface pressure)",
      features: [
        "Thick sulfuric acid clouds",
        "Extreme greenhouse effect",
        "Super-rotation (atmosphere rotates 60× faster than planet)",
        "Lightning and volcanic gases",
      ],
    },

    hasMagneticField: false,
    magneticFieldStrength: "None (induces weak field from solar wind)",

    composition: ["Iron core", "Rocky silicate mantle", "Basaltic crust"],
    surfaceFeatures: [
      "Ishtar Terra (continent-sized highland)",
      "Aphrodite Terra (largest highland region)",
      "Maxwell Montes (highest mountain, 11 km)",
      "Thousands of volcanoes (possibly active)",
      "Coronae (circular volcanic features)",
      "Tessera terrain (complex ridged terrain)",
    ],
    internalStructure: [
      "Iron core (~3,000 km radius)",
      "Rocky mantle (no plate tectonics)",
      "Basaltic crust (~50 km thick)",
    ],

    tempRange: { min: 462, max: 462, average: 462 },

    confirmedMoons: 0,
    hasRings: false,

    missions: [
      { name: "Venera 7", year: 1970, type: "lander", agency: "USSR", highlights: "First successful landing on another planet" },
      { name: "Magellan", year: 1990, type: "orbiter", agency: "NASA", highlights: "Mapped 98% of surface with radar" },
      { name: "Venus Express", year: 2006, type: "orbiter", agency: "ESA", highlights: "Studied atmosphere and climate" },
      { name: "Akatsuki", year: 2015, type: "orbiter", agency: "JAXA", highlights: "Currently studying weather patterns" },
    ],

    funFacts: [
      "Venus rotates backwards - the Sun rises in the west and sets in the east!",
      "A day on Venus (243 Earth days) is longer than its year (225 Earth days)!",
      "It's the hottest planet despite being second from the Sun - thanks to its extreme greenhouse effect.",
      "Venus has more volcanoes than any other planet - over 1,600 major ones!",
      "It's often called Earth's 'evil twin' due to similar size but hellish conditions.",
      "Soviet Venera landers only survived 23 to 127 minutes on the surface.",
    ],
    comparisons: [
      "Venus is nearly identical in size to Earth (95% diameter, 82% mass)",
      "Surface pressure is like being 900 meters underwater on Earth",
      "It's hot enough to melt lead (462°C)",
      "The atmosphere is so thick that sunset takes 2 hours",
    ],

    emoji: "♀️",
    color: "#E6C229",
    orbitRadius: 12,
    size: 0.95,
    orbitSpeed: 1.62,
  },
  {
    id: "earth",
    name: "Earth",
    type: "terrestrial",

    diameter: 12742,
    mass: "5.972 × 10²⁴ kg",
    volume: "1.08321 × 10¹² km³",
    density: 5.51,
    gravity: 9.81,
    escapeVelocity: 11.19,

    distanceFromSun: {
      average: 149.6,
      perihelion: 147.1,
      aphelion: 152.1,
    },
    orbitalPeriod: "365.25 days",
    orbitalSpeed: 29.78,
    orbitalEccentricity: 0.0167,
    orbitalInclination: 0.0,

    rotationPeriod: "23h 56m 4.1s (sidereal)",
    axialTilt: 23.44,
    rotationDirection: "prograde",

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Nitrogen (78.08%)", "Oxygen (20.95%)", "Argon (0.93%)", "Carbon dioxide (0.04%)", "Water vapor (variable)"],
      pressure: "1.0 bar (1013.25 hPa at sea level)",
      features: [
        "Ozone layer protects from UV radiation",
        "Weather systems driven by solar heating",
        "Aurora at polar regions",
        "Only known atmosphere supporting complex life",
      ],
    },

    hasMagneticField: true,
    magneticFieldStrength: "25-65 microteslas at surface",

    composition: ["Iron-nickel core", "Silicate mantle", "Silicate crust"],
    surfaceFeatures: [
      "71% covered by liquid water oceans",
      "Seven continents with active plate tectonics",
      "Highest point: Mt. Everest (8,849 m)",
      "Deepest point: Challenger Deep (10,994 m)",
      "Active volcanoes and earthquakes",
      "Ice caps at both poles",
    ],
    internalStructure: [
      "Solid inner core (1,220 km radius, iron-nickel)",
      "Liquid outer core (2,180 km thick, iron-nickel)",
      "Mantle (2,900 km thick, silicate rock)",
      "Crust (5-70 km thick, oceanic and continental)",
    ],

    tempRange: { min: -89, max: 57, average: 15 },

    confirmedMoons: 1,
    hasRings: false,

    missions: [
      { name: "Thousands of satellites", year: 1957, type: "orbiter", agency: "Various", highlights: "First artificial satellite: Sputnik 1" },
      { name: "ISS", year: 1998, type: "orbiter", agency: "International", highlights: "Continuous human presence since 2000" },
      { name: "Apollo 8", year: 1968, type: "flyby", agency: "NASA", highlights: "First humans to orbit another body (Moon)" },
    ],

    funFacts: [
      "Earth is the only planet not named after a Greek or Roman deity.",
      "The Earth is not a perfect sphere - it bulges at the equator.",
      "Earth's rotation is gradually slowing - days were once only 6 hours long!",
      "The Moon is slowly drifting away at 3.8 cm per year.",
      "Earth is the densest planet in the solar system.",
      "Life has existed on Earth for at least 3.5 billion years.",
    ],
    comparisons: [
      "Earth's diameter: 12,742 km (reference point for other planets)",
      "1 Earth mass = 5.97 × 10²⁴ kg",
      "1 AU (Earth-Sun distance) = 149.6 million km",
      "Earth has the highest surface density of any planet",
    ],

    emoji: "🌍",
    color: "#6B93D6",
    orbitRadius: 16,
    size: 1,
    orbitSpeed: 1,
  },
  {
    id: "mars",
    name: "Mars",
    type: "terrestrial",

    diameter: 6779,
    mass: "6.39 × 10²³ kg (0.107 Earths)",
    volume: "1.6318 × 10¹¹ km³",
    density: 3.93,
    gravity: 3.71,
    escapeVelocity: 5.03,

    distanceFromSun: {
      average: 227.9,
      perihelion: 206.7,
      aphelion: 249.3,
    },
    orbitalPeriod: "687 Earth days (1.88 years)",
    orbitalSpeed: 24.1,
    orbitalEccentricity: 0.0934,
    orbitalInclination: 1.85,

    rotationPeriod: "24h 37m 22.7s",
    axialTilt: 25.19,
    rotationDirection: "prograde",

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Carbon dioxide (95.3%)", "Nitrogen (2.7%)", "Argon (1.6%)", "Oxygen (0.13%)"],
      pressure: "0.006 bar (~0.6% of Earth)",
      features: [
        "Too thin for liquid water on surface",
        "Global dust storms lasting months",
        "Seasonal CO2 ice caps",
        "Water ice clouds",
      ],
    },

    hasMagneticField: false,
    magneticFieldStrength: "Remnant crustal magnetism only",

    composition: ["Iron sulfide core", "Silicate mantle", "Basaltic crust"],
    surfaceFeatures: [
      "Olympus Mons (largest volcano, 21.9 km high)",
      "Valles Marineris (canyon system, 4,000 km long)",
      "Hellas Planitia (largest impact basin, 2,300 km wide)",
      "Ancient river valleys and lake beds",
      "Polar ice caps (water and CO2)",
      "Widespread iron oxide (rust) giving red color",
    ],
    internalStructure: [
      "Liquid iron-sulfide core (~1,800 km diameter)",
      "Silicate mantle (no active plate tectonics)",
      "Basaltic crust (50-125 km thick, thicker than Earth's)",
    ],

    tempRange: { min: -140, max: 20, average: -65 },

    confirmedMoons: 2,
    hasRings: false,

    missions: [
      { name: "Viking 1 & 2", year: 1976, type: "lander", agency: "NASA", highlights: "First successful Mars landers, searched for life" },
      { name: "Mars Pathfinder/Sojourner", year: 1997, type: "rover", agency: "NASA", highlights: "First Mars rover" },
      { name: "Spirit & Opportunity", year: 2004, type: "rover", agency: "NASA", highlights: "Found evidence of ancient water" },
      { name: "Curiosity", year: 2012, type: "rover", agency: "NASA", highlights: "Confirmed habitable conditions existed" },
      { name: "Perseverance & Ingenuity", year: 2021, type: "rover", agency: "NASA", highlights: "First powered flight on another planet, collecting samples" },
      { name: "Tianwen-1/Zhurong", year: 2021, type: "rover", agency: "CNSA", highlights: "China's first Mars rover" },
    ],

    funFacts: [
      "Mars has the largest volcano in the solar system - Olympus Mons is 3× the height of Everest!",
      "A day on Mars (sol) is only 37 minutes longer than an Earth day.",
      "Mars once had a thicker atmosphere and liquid water - possibly life!",
      "The two moons, Phobos and Deimos, may be captured asteroids.",
      "Mars has seasons like Earth due to similar axial tilt.",
      "The sunset on Mars appears blue due to dust particles.",
    ],
    comparisons: [
      "Mars is about half the diameter of Earth",
      "Surface area equals Earth's total land area",
      "Gravity is 38% of Earth's - you could jump 3× higher!",
      "Olympus Mons would cover most of France",
    ],

    emoji: "🔴",
    color: "#E27B58",
    orbitRadius: 22,
    size: 0.53,
    orbitSpeed: 0.53,
  },
  {
    id: "jupiter",
    name: "Jupiter",
    type: "gas giant",

    diameter: 139820,
    mass: "1.898 × 10²⁷ kg (317.8 Earths)",
    volume: "1.4313 × 10¹⁵ km³",
    density: 1.33,
    gravity: 24.79,
    escapeVelocity: 59.5,

    distanceFromSun: {
      average: 778.5,
      perihelion: 740.5,
      aphelion: 816.6,
    },
    orbitalPeriod: "11.86 Earth years",
    orbitalSpeed: 13.1,
    orbitalEccentricity: 0.0489,
    orbitalInclination: 1.31,

    rotationPeriod: "9h 55m 30s (fastest in solar system)",
    axialTilt: 3.13,
    rotationDirection: "prograde",

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Hydrogen (~90%)", "Helium (~10%)", "Methane", "Ammonia", "Water vapor"],
      pressure: "No solid surface - increases with depth",
      features: [
        "Great Red Spot (storm larger than Earth, 400+ years old)",
        "Banded cloud structure (zones and belts)",
        "Fastest winds in solar system (up to 620 km/h)",
        "Lightning 1,000× more powerful than Earth's",
        "Multiple persistent storm systems",
      ],
    },

    hasMagneticField: true,
    magneticFieldStrength: "20,000× stronger than Earth's",

    composition: ["Hydrogen and helium", "Small rocky core"],
    surfaceFeatures: [
      "No solid surface",
      "Cloud tops visible from space",
      "Great Red Spot",
      "Oval BA (Red Spot Jr.)",
      "White and brown ovals",
    ],
    internalStructure: [
      "Small rocky/icy core (~10-20 Earth masses)",
      "Metallic hydrogen layer (conducts electricity)",
      "Liquid hydrogen layer",
      "Gaseous atmosphere",
    ],

    tempRange: { min: -145, max: -108, average: -110 },

    confirmedMoons: 95,
    hasRings: true,
    ringSystem: "Faint ring system discovered 1979 (dust rings)",

    missions: [
      { name: "Pioneer 10 & 11", year: 1973, type: "flyby", agency: "NASA", highlights: "First spacecraft to Jupiter" },
      { name: "Voyager 1 & 2", year: 1979, type: "flyby", agency: "NASA", highlights: "Detailed imagery, discovered rings and volcanoes on Io" },
      { name: "Galileo", year: 1995, type: "orbiter", agency: "NASA", highlights: "First orbiter, dropped probe into atmosphere, discovered subsurface oceans on moons" },
      { name: "Juno", year: 2016, type: "orbiter", agency: "NASA", highlights: "Studying interior structure, polar regions, magnetic field" },
      { name: "Europa Clipper", year: 2024, type: "orbiter", agency: "NASA", highlights: "Will study Europa's habitability" },
    ],

    funFacts: [
      "Jupiter is so massive it could fit ALL other planets inside it!",
      "The Great Red Spot is a storm that has raged for over 400 years!",
      "Jupiter acts as a 'cosmic vacuum cleaner,' protecting inner planets from asteroids.",
      "You could fit 1,321 Earths inside Jupiter.",
      "Jupiter's rotation is so fast that it bulges at the equator.",
      "The planet radiates more heat than it receives from the Sun.",
    ],
    comparisons: [
      "Jupiter is 2.5× more massive than all other planets combined",
      "Its Great Red Spot could swallow Earth whole",
      "Jupiter's magnetic field extends 7 million km sunward",
      "A year on Jupiter is almost 12 Earth years",
    ],

    emoji: "🟠",
    color: "#D8CA9D",
    orbitRadius: 34,
    size: 2.5,
    orbitSpeed: 0.084,
  },
  {
    id: "saturn",
    name: "Saturn",
    type: "gas giant",

    diameter: 116460,
    mass: "5.683 × 10²⁶ kg (95.2 Earths)",
    volume: "8.2713 × 10¹⁴ km³",
    density: 0.687,
    gravity: 10.44,
    escapeVelocity: 35.5,

    distanceFromSun: {
      average: 1433.5,
      perihelion: 1352.6,
      aphelion: 1514.5,
    },
    orbitalPeriod: "29.46 Earth years",
    orbitalSpeed: 9.7,
    orbitalEccentricity: 0.0565,
    orbitalInclination: 2.49,

    rotationPeriod: "10h 33m 38s",
    axialTilt: 26.73,
    rotationDirection: "prograde",

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Hydrogen (~96%)", "Helium (~3%)", "Methane", "Ammonia"],
      pressure: "No solid surface",
      features: [
        "Banded cloud structure",
        "Hexagonal storm at north pole (30,000 km wide!)",
        "Periodic Great White Spots (massive storms)",
        "Wind speeds up to 1,800 km/h",
      ],
    },

    hasMagneticField: true,
    magneticFieldStrength: "578× Earth's (weaker than Jupiter)",

    composition: ["Hydrogen and helium", "Small rocky core"],
    surfaceFeatures: [
      "No solid surface",
      "Hexagonal polar vortex",
      "Cloud bands less distinct than Jupiter",
      "Occasional Great White Spots",
    ],
    internalStructure: [
      "Rocky/icy core (~9-22 Earth masses)",
      "Metallic hydrogen layer",
      "Liquid hydrogen layer",
      "Gaseous atmosphere",
    ],

    tempRange: { min: -178, max: -139, average: -178 },

    confirmedMoons: 146,
    hasRings: true,
    ringSystem: "Most spectacular ring system - extends 282,000 km but only 10m-1km thick",

    missions: [
      { name: "Pioneer 11", year: 1979, type: "flyby", agency: "NASA", highlights: "First Saturn flyby" },
      { name: "Voyager 1 & 2", year: 1980, type: "flyby", agency: "NASA", highlights: "Detailed ring studies, discovered new moons" },
      { name: "Cassini-Huygens", year: 2004, type: "orbiter", agency: "NASA/ESA", highlights: "13 years orbiting, Huygens landed on Titan" },
    ],

    funFacts: [
      "Saturn is so light it would float in water (if you had a big enough bathtub)!",
      "Saturn's rings are made of billions of particles of ice and rock.",
      "The hexagonal storm at Saturn's north pole is a mystery that still puzzles scientists.",
      "Saturn's moon Titan is the only moon with a dense atmosphere.",
      "Saturn's rings are disappearing - they may be gone in 100 million years.",
      "You could fit 764 Earths inside Saturn.",
    ],
    comparisons: [
      "Saturn's rings span 282,000 km but are only 10 meters thick in places",
      "Saturn is 9.5× wider than Earth",
      "Its density is only 69% that of water",
      "Saturn has more moons than any other planet (146 confirmed)",
    ],

    emoji: "🪐",
    color: "#F4D59E",
    orbitRadius: 48,
    size: 2.1,
    orbitSpeed: 0.034,
    ringColor: "#C9B896",
  },
  {
    id: "uranus",
    name: "Uranus",
    type: "ice giant",

    diameter: 50724,
    mass: "8.681 × 10²⁵ kg (14.5 Earths)",
    volume: "6.833 × 10¹³ km³",
    density: 1.27,
    gravity: 8.87,
    escapeVelocity: 21.3,

    distanceFromSun: {
      average: 2872.5,
      perihelion: 2741.3,
      aphelion: 3003.6,
    },
    orbitalPeriod: "84.01 Earth years",
    orbitalSpeed: 6.8,
    orbitalEccentricity: 0.0457,
    orbitalInclination: 0.77,

    rotationPeriod: "17h 14m 24s (retrograde)",
    axialTilt: 97.77,
    rotationDirection: "retrograde",

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Hydrogen (83%)", "Helium (15%)", "Methane (2%)"],
      pressure: "No solid surface",
      features: [
        "Methane gives blue-green color",
        "Extremely cold (-224°C)",
        "Faint cloud bands",
        "Winds up to 900 km/h",
      ],
    },

    hasMagneticField: true,
    magneticFieldStrength: "50× Earth's, tilted 59° from rotation axis",

    composition: ["Water, methane, ammonia ices", "Hydrogen, helium atmosphere", "Rocky core"],
    surfaceFeatures: [
      "No solid surface",
      "Nearly featureless blue-green disk",
      "Occasional bright cloud features",
    ],
    internalStructure: [
      "Rocky core (~0.5 Earth masses)",
      "Icy mantle (water, methane, ammonia)",
      "Hydrogen/helium atmosphere",
    ],

    tempRange: { min: -224, max: -197, average: -224 },

    confirmedMoons: 28,
    hasRings: true,
    ringSystem: "13 known rings, dark and narrow",

    missions: [
      { name: "Voyager 2", year: 1986, type: "flyby", agency: "NASA", highlights: "Only spacecraft to visit, discovered 10 moons and 2 rings" },
    ],

    funFacts: [
      "Uranus rotates on its side - like a rolling ball! A collision likely knocked it over.",
      "It's the coldest planet despite not being the farthest from the Sun.",
      "Uranus was the first planet discovered with a telescope (1781).",
      "Its moons are named after characters from Shakespeare and Alexander Pope.",
      "The planet experiences extreme 42-year seasons due to its tilt.",
      "Uranus has only been visited by one spacecraft - Voyager 2 in 1986.",
    ],
    comparisons: [
      "Uranus is 4× wider than Earth",
      "It could fit 63 Earths inside",
      "Its axial tilt of 98° is the most extreme in the solar system",
      "Uranus and Neptune are 'ice giants' rather than 'gas giants'",
    ],

    emoji: "🔵",
    color: "#D1E7E7",
    orbitRadius: 62,
    size: 1.6,
    orbitSpeed: 0.012,
    ringColor: "#89CFF0",
  },
  {
    id: "neptune",
    name: "Neptune",
    type: "ice giant",

    diameter: 49244,
    mass: "1.024 × 10²⁶ kg (17.1 Earths)",
    volume: "6.254 × 10¹³ km³",
    density: 1.64,
    gravity: 11.15,
    escapeVelocity: 23.5,

    distanceFromSun: {
      average: 4495.1,
      perihelion: 4444.5,
      aphelion: 4545.7,
    },
    orbitalPeriod: "164.8 Earth years",
    orbitalSpeed: 5.4,
    orbitalEccentricity: 0.0113,
    orbitalInclination: 1.77,

    rotationPeriod: "16h 6m 36s",
    axialTilt: 28.32,
    rotationDirection: "prograde",

    hasAtmosphere: true,
    atmosphere: {
      composition: ["Hydrogen (80%)", "Helium (19%)", "Methane (1%)"],
      pressure: "No solid surface",
      features: [
        "Strongest winds in the solar system (2,100 km/h)",
        "Great Dark Spot (observed 1989, now gone)",
        "Methane gives deep blue color",
        "Bright cirrus-like clouds",
      ],
    },

    hasMagneticField: true,
    magneticFieldStrength: "27× Earth's, tilted 47° from rotation axis",

    composition: ["Water, methane, ammonia ices", "Hydrogen, helium atmosphere", "Rocky core"],
    surfaceFeatures: [
      "No solid surface",
      "Dynamic storm systems",
      "Varying dark and bright spots",
    ],
    internalStructure: [
      "Rocky core (~1.2 Earth masses)",
      "Icy mantle (water, methane, ammonia)",
      "Hydrogen/helium atmosphere",
    ],

    tempRange: { min: -218, max: -200, average: -214 },

    confirmedMoons: 16,
    hasRings: true,
    ringSystem: "5 main rings, clumpy structure",

    missions: [
      { name: "Voyager 2", year: 1989, type: "flyby", agency: "NASA", highlights: "Only spacecraft to visit, discovered 6 moons and rings" },
    ],

    funFacts: [
      "Neptune has the strongest winds in the solar system - over 2,100 km/h!",
      "It was the first planet discovered by mathematical prediction (1846).",
      "Neptune's largest moon Triton orbits backwards - it was probably captured.",
      "One Neptune year is 165 Earth years - it completed its first orbit since discovery in 2011!",
      "The Great Dark Spot seen by Voyager 2 was Earth-sized but has since disappeared.",
      "Neptune radiates 2.6× more energy than it receives from the Sun.",
    ],
    comparisons: [
      "Neptune is 4× wider than Earth",
      "It could fit 57 Earths inside",
      "Neptune is 30× farther from the Sun than Earth",
      "Light from the Sun takes 4 hours to reach Neptune",
    ],

    emoji: "💙",
    color: "#5B5DDF",
    orbitRadius: 76,
    size: 1.55,
    orbitSpeed: 0.006,
  },
];

export const getPlanetById = (id: string): PlanetData | undefined => {
  return planetsData.find(p => p.id === id);
};

export const getTerrestrialPlanets = (): PlanetData[] => {
  return planetsData.filter(p => p.type === 'terrestrial');
};

export const getGasGiants = (): PlanetData[] => {
  return planetsData.filter(p => p.type === 'gas giant');
};

export const getIceGiants = (): PlanetData[] => {
  return planetsData.filter(p => p.type === 'ice giant');
};
