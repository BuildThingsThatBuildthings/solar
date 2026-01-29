export interface SunData {
  name: string;
  type: string;
  spectralClass: string;

  // Physical properties
  diameter: number; // km
  radius: string; // solar radii
  mass: string;
  volume: string;
  density: number; // g/cm³
  gravity: number; // m/s²
  escapeVelocity: number; // km/s

  // Temperature
  surfaceTemp: number; // K
  coreTemp: number; // K
  coronaTemp: number; // K

  // Energy output
  luminosity: string;
  energyOutput: string;

  // Rotation
  rotationPeriod: {
    equator: string;
    poles: string;
  };
  axialTilt: number;

  // Age and lifecycle
  age: string;
  lifeExpectancy: string;
  currentPhase: string;
  futureEvolution: string[];

  // Composition
  composition: {
    element: string;
    percentage: number;
  }[];

  // Structure
  layers: {
    name: string;
    thickness: string;
    description: string;
    temperature: string;
  }[];

  // Activity
  solarCycle: string;
  phenomena: {
    name: string;
    description: string;
  }[];

  // Influence
  heliosphere: string;
  solarWind: string;

  // Education
  funFacts: string[];
  comparisons: string[];

  // Visualization
  emoji: string;
  color: string;
}

export const sunData: SunData = {
  name: "The Sun",
  type: "G-type Main Sequence Star (Yellow Dwarf)",
  spectralClass: "G2V",

  diameter: 1392700,
  radius: "1 Solar radius (R☉) = 696,340 km",
  mass: "1.989 × 10³⁰ kg (333,000 Earths)",
  volume: "1.41 × 10¹⁸ km³ (1.3 million Earths)",
  density: 1.41,
  gravity: 274,
  escapeVelocity: 617.7,

  surfaceTemp: 5772,
  coreTemp: 15000000,
  coronaTemp: 2000000,

  luminosity: "3.828 × 10²⁶ watts",
  energyOutput: "Every second: 600 million tons of hydrogen → 596 million tons of helium",

  rotationPeriod: {
    equator: "25.05 days",
    poles: "34.4 days",
  },
  axialTilt: 7.25,

  age: "4.6 billion years",
  lifeExpectancy: "~10 billion years (5.4 billion remaining)",
  currentPhase: "Main Sequence (hydrogen burning)",
  futureEvolution: [
    "In ~5 billion years: Expand into a Red Giant",
    "Will engulf Mercury, Venus, and possibly Earth",
    "Core will contract and heat up",
    "Will shed outer layers as a planetary nebula",
    "Core will become a White Dwarf",
    "Will slowly cool over trillions of years",
  ],

  composition: [
    { element: "Hydrogen", percentage: 73.46 },
    { element: "Helium", percentage: 24.85 },
    { element: "Oxygen", percentage: 0.77 },
    { element: "Carbon", percentage: 0.29 },
    { element: "Iron", percentage: 0.16 },
    { element: "Neon", percentage: 0.12 },
    { element: "Nitrogen", percentage: 0.09 },
    { element: "Silicon", percentage: 0.07 },
    { element: "Magnesium", percentage: 0.05 },
    { element: "Sulfur", percentage: 0.04 },
  ],

  layers: [
    {
      name: "Core",
      thickness: "0-0.25 R☉ (175,000 km radius)",
      description: "Nuclear fusion occurs here, converting hydrogen to helium",
      temperature: "15,000,000 K",
    },
    {
      name: "Radiative Zone",
      thickness: "0.25-0.7 R☉ (314,000 km thick)",
      description: "Energy transported outward by radiation (photons)",
      temperature: "7,000,000 - 2,000,000 K",
    },
    {
      name: "Convective Zone",
      thickness: "0.7-1.0 R☉ (200,000 km thick)",
      description: "Energy transported by convection (hot plasma rising, cool falling)",
      temperature: "2,000,000 - 5,700 K",
    },
    {
      name: "Photosphere",
      thickness: "~500 km thick",
      description: "Visible 'surface' of the Sun, source of most sunlight",
      temperature: "5,772 K",
    },
    {
      name: "Chromosphere",
      thickness: "~2,000 km thick",
      description: "Lower atmosphere, visible during eclipses as pink/red rim",
      temperature: "4,500 - 25,000 K",
    },
    {
      name: "Corona",
      thickness: "Extends millions of km into space",
      description: "Outer atmosphere, visible during total solar eclipses",
      temperature: "1,000,000 - 2,000,000 K",
    },
  ],

  solarCycle: "~11 year cycle of activity (sunspot minimum to maximum)",
  phenomena: [
    {
      name: "Sunspots",
      description: "Cooler, darker regions caused by magnetic activity. Can be larger than Earth.",
    },
    {
      name: "Solar Flares",
      description: "Sudden bursts of radiation from magnetic energy release. Can disrupt radio communications.",
    },
    {
      name: "Coronal Mass Ejections (CMEs)",
      description: "Massive bubbles of plasma ejected into space. Can cause geomagnetic storms on Earth.",
    },
    {
      name: "Solar Wind",
      description: "Constant stream of charged particles flowing outward at 400-800 km/s.",
    },
    {
      name: "Solar Prominences",
      description: "Giant loops of plasma held above the surface by magnetic fields.",
    },
    {
      name: "Granulation",
      description: "Convection cells visible on surface, each about 1,000 km across.",
    },
  ],

  heliosphere: "Extends 100+ AU from the Sun, protecting solar system from interstellar radiation",
  solarWind: "400-800 km/s, carries ~1 million tons of matter per second",

  funFacts: [
    "The Sun contains 99.86% of all mass in the solar system!",
    "Light from the Sun's core takes 100,000-200,000 years to reach the surface, but only 8 minutes to reach Earth.",
    "About 1.3 million Earths could fit inside the Sun.",
    "The Sun loses about 4 million tons of mass every second through nuclear fusion.",
    "The Sun is almost a perfect sphere - only 10 km difference between polar and equatorial diameter.",
    "The corona is hotter than the surface - this 'coronal heating problem' is still not fully understood!",
    "Sound waves cause the Sun to ring like a bell, allowing us to study its interior.",
    "The Sun travels through the Milky Way at about 220 km/s, orbiting the galactic center every 230 million years.",
  ],
  comparisons: [
    "The Sun is one of 200-400 billion stars in the Milky Way",
    "It's brighter than 85% of stars in our galaxy",
    "The largest known star (UY Scuti) is 1,700× larger than the Sun",
    "The Sun could hold about 960,000 spherical Earths inside it",
    "Earth receives only 0.00000005% of the Sun's total energy output",
  ],

  emoji: "☀️",
  color: "#FDB813",
};
