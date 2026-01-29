import { planetsData } from './planets';
import { sunData } from './sun';

// =============================================================================
// WEIGHT CALCULATOR
// =============================================================================

export interface WeightResult {
  planetId: string;
  planetName: string;
  emoji: string;
  weightKg: number;
  weightLbs: number;
  gravity: number;
  gravityRatio: number;
  funFact: string;
}

const EARTH_GRAVITY = 9.81; // m/s²

export const calculateWeight = (earthWeightKg: number, planetId: string): WeightResult | null => {
  const planet = planetsData.find(p => p.id === planetId);
  if (!planet) return null;

  const gravityRatio = planet.gravity / EARTH_GRAVITY;
  const weightKg = earthWeightKg * gravityRatio;
  const weightLbs = weightKg * 2.20462;

  const funFacts: Record<string, string> = {
    mercury: "You could jump about 2.5x higher here than on Earth!",
    venus: "You'd feel almost the same weight - Venus is Earth's twin in size!",
    earth: "That's your normal weight - nothing special here!",
    mars: "You could lift almost 3x more weight here. Time to be a superhero!",
    jupiter: "Your bones would struggle here - this is where your weight training pays off!",
    saturn: "Despite being huge, Saturn's low density means you're not much heavier here.",
    uranus: "You'd weigh almost the same as Earth, but good luck with the -224°C weather!",
    neptune: "Slightly heavier than Earth - bring a warm jacket, it's cold out here!",
  };

  return {
    planetId: planet.id,
    planetName: planet.name,
    emoji: planet.emoji,
    weightKg,
    weightLbs,
    gravity: planet.gravity,
    gravityRatio,
    funFact: funFacts[planet.id] || "Gravity is different everywhere in the solar system!",
  };
};

export const calculateWeightOnAllPlanets = (earthWeightKg: number): WeightResult[] => {
  return planetsData.map(planet => calculateWeight(earthWeightKg, planet.id)!);
};

export const calculateWeightOnSun = (earthWeightKg: number): WeightResult => {
  const gravityRatio = sunData.gravity / EARTH_GRAVITY;
  const weightKg = earthWeightKg * gravityRatio;
  return {
    planetId: 'sun',
    planetName: 'Sun',
    emoji: sunData.emoji,
    weightKg,
    weightLbs: weightKg * 2.20462,
    gravity: sunData.gravity,
    gravityRatio,
    funFact: "You'd be crushed instantly - the Sun's gravity is 28x Earth's! (And it's a bit warm...)",
  };
};

// =============================================================================
// AGE CALCULATOR
// =============================================================================

export interface AgeResult {
  planetId: string;
  planetName: string;
  emoji: string;
  ageYears: number;
  ageDays: number;
  orbitalPeriodDays: number;
  funFact: string;
}

// Orbital periods in Earth days
const ORBITAL_PERIODS: Record<string, number> = {
  mercury: 87.97,
  venus: 224.7,
  earth: 365.25,
  mars: 687,
  jupiter: 4333, // 11.86 years
  saturn: 10759, // 29.46 years
  uranus: 30687, // 84.01 years
  neptune: 60190, // 164.8 years
};

export const calculateAge = (earthAgeYears: number, planetId: string): AgeResult | null => {
  const planet = planetsData.find(p => p.id === planetId);
  if (!planet) return null;

  const orbitalPeriodDays = ORBITAL_PERIODS[planetId];
  const earthAgeDays = earthAgeYears * 365.25;
  const planetAgeYears = earthAgeDays / orbitalPeriodDays;

  const funFacts: Record<string, string> = {
    mercury: "You'd celebrate a birthday every 88 days - that's a lot of cake!",
    venus: "A Venus year is shorter than a Venus day. Time works weird here!",
    earth: "Happy birthday! Same as always.",
    mars: "If you moved to Mars at 20 Earth years old, you'd be 10.6 Mars years old!",
    jupiter: "Most humans never live to see their first Jupiter birthday.",
    saturn: "Saturn birthdays are RARE - you might get 2-3 in a lifetime!",
    uranus: "No human has ever lived one full Uranus year (84 Earth years)!",
    neptune: "Neptune was discovered in 1846 and just completed its first orbit in 2011!",
  };

  return {
    planetId: planet.id,
    planetName: planet.name,
    emoji: planet.emoji,
    ageYears: planetAgeYears,
    ageDays: earthAgeDays / orbitalPeriodDays * orbitalPeriodDays,
    orbitalPeriodDays,
    funFact: funFacts[planet.id] || "Time passes differently everywhere!",
  };
};

export const calculateAgeOnAllPlanets = (earthAgeYears: number): AgeResult[] => {
  return planetsData.map(planet => calculateAge(earthAgeYears, planet.id)!);
};

// =============================================================================
// DAY LENGTH COMPARISON
// =============================================================================

export interface DayLengthResult {
  planetId: string;
  planetName: string;
  emoji: string;
  dayLengthHours: number;
  dayLengthEarthDays: number;
  comparedToEarth: string;
  funFact: string;
}

// Rotation periods in hours
const ROTATION_PERIODS: Record<string, number> = {
  mercury: 1407.6, // 58.65 Earth days
  venus: 5832.5, // 243.02 Earth days (retrograde)
  earth: 24,
  mars: 24.62,
  jupiter: 9.92,
  saturn: 10.56,
  uranus: 17.24,
  neptune: 16.11,
};

export const getDayLength = (planetId: string): DayLengthResult | null => {
  const planet = planetsData.find(p => p.id === planetId);
  if (!planet) return null;

  const dayLengthHours = ROTATION_PERIODS[planetId];
  const dayLengthEarthDays = dayLengthHours / 24;

  let comparedToEarth: string;
  if (dayLengthHours < 24) {
    comparedToEarth = `${(24 / dayLengthHours).toFixed(1)}x shorter`;
  } else if (dayLengthHours > 24) {
    comparedToEarth = `${(dayLengthHours / 24).toFixed(1)}x longer`;
  } else {
    comparedToEarth = 'Same as Earth';
  }

  const funFacts: Record<string, string> = {
    mercury: "A day on Mercury (sunrise to sunrise) is 176 Earth days - twice its year!",
    venus: "Venus rotates backwards AND slower than it orbits - a day is longer than a year!",
    earth: "Our 24-hour day was shorter in the past - dinosaurs had ~23-hour days!",
    mars: "Mars days (sols) are so close to Earth's that NASA uses 'Mars time' for rover operations!",
    jupiter: "Jupiter spins so fast it bulges at the equator by 7%!",
    saturn: "Saturn's fast rotation creates massive storms at its equator!",
    uranus: "A day on Uranus is 17 hours, but seasons last 21 Earth years due to its tilt!",
    neptune: "Neptune has the fastest winds in the solar system despite its slow-ish rotation!",
  };

  return {
    planetId: planet.id,
    planetName: planet.name,
    emoji: planet.emoji,
    dayLengthHours,
    dayLengthEarthDays,
    comparedToEarth,
    funFact: funFacts[planet.id] || "Every planet has its own unique rotation!",
  };
};

export const getAllDayLengths = (): DayLengthResult[] => {
  return planetsData.map(planet => getDayLength(planet.id)!);
};

// =============================================================================
// SURVIVABILITY CHECKER
// =============================================================================

export type SurvivabilityRating = 'instant-death' | 'minutes' | 'hours' | 'days' | 'survivable-with-tech' | 'comfortable';

export interface SurvivabilityResult {
  planetId: string;
  planetName: string;
  emoji: string;
  rating: SurvivabilityRating;
  ratingEmoji: string;
  survivalTime: string;
  dangers: string[];
  whatWouldHappen: string;
  couldWeColonize: string;
}

const SURVIVABILITY_DATA: Record<string, Omit<SurvivabilityResult, 'planetId' | 'planetName' | 'emoji'>> = {
  mercury: {
    rating: 'instant-death',
    ratingEmoji: '💀',
    survivalTime: 'Seconds to minutes',
    dangers: [
      'Temperature swings: -180°C to 430°C',
      'No atmosphere to breathe',
      'Intense solar radiation',
      'No protection from meteoroids',
    ],
    whatWouldHappen: "You'd either freeze or cook depending on location, while being irradiated and suffocating.",
    couldWeColonize: "Theoretically possible in permanently shadowed craters near poles where water ice exists. Solar power would be abundant!",
  },
  venus: {
    rating: 'instant-death',
    ratingEmoji: '💀',
    survivalTime: 'Seconds',
    dangers: [
      '462°C surface temperature (hotter than Mercury!)',
      '92x Earth atmospheric pressure (like 900m underwater)',
      'Sulfuric acid clouds and rain',
      'No oxygen to breathe',
    ],
    whatWouldHappen: "You'd be simultaneously crushed, cooked, and dissolved by acid. Soviet Venera landers only survived 23-127 minutes!",
    couldWeColonize: "Floating cloud cities at 50km altitude could work - temperature and pressure are Earth-like there! The sulfuric acid is a problem though...",
  },
  earth: {
    rating: 'comfortable',
    ratingEmoji: '🏠',
    survivalTime: '~80 years average',
    dangers: [
      'Natural disasters (earthquakes, hurricanes)',
      'Extreme weather in some regions',
      'Various wildlife hazards',
      'Need food and water',
    ],
    whatWouldHappen: "You'd live a normal human life! Earth is perfectly suited for us (because we evolved here!).",
    couldWeColonize: "Already colonized! 8 billion humans and counting.",
  },
  mars: {
    rating: 'minutes',
    ratingEmoji: '😰',
    survivalTime: '1-2 minutes without a suit',
    dangers: [
      'No breathable atmosphere (95% CO2)',
      'Very low pressure (0.6% of Earth)',
      '-60°C average temperature',
      'High radiation (no magnetic field)',
      'Dust storms lasting months',
    ],
    whatWouldHappen: "Your blood would boil due to low pressure, you'd suffocate, and get a lethal radiation dose. But with a spacesuit, you could survive!",
    couldWeColonize: "Mars is humanity's best candidate for colonization! Water ice exists, days are similar to Earth's, and we could terraform it over centuries.",
  },
  jupiter: {
    rating: 'instant-death',
    ratingEmoji: '💀',
    survivalTime: 'Seconds',
    dangers: [
      'No solid surface to stand on',
      'Crushing pressure increases with depth',
      'Violent storms with 620 km/h winds',
      'Extreme radiation from magnetosphere',
      'Lightning 1,000x stronger than Earth',
    ],
    whatWouldHappen: "You'd fall through increasingly dense gas, being crushed, electrocuted, and irradiated. Eventually you'd be dissolved in metallic hydrogen.",
    couldWeColonize: "Jupiter itself? No. But its moons Europa and Callisto are possible! Europa might have life in its subsurface ocean.",
  },
  saturn: {
    rating: 'instant-death',
    ratingEmoji: '💀',
    survivalTime: 'Seconds',
    dangers: [
      'No solid surface',
      'Wind speeds up to 1,800 km/h',
      'Crushing pressure at depth',
      'Extreme cold (-178°C at cloud tops)',
    ],
    whatWouldHappen: "Similar to Jupiter - you'd sink through the atmosphere while being frozen, crushed, and battered by supersonic winds.",
    couldWeColonize: "Saturn's moon Titan is actually the most Earth-like world we know! It has a thick atmosphere and liquid lakes (of methane, not water).",
  },
  uranus: {
    rating: 'instant-death',
    ratingEmoji: '💀',
    survivalTime: 'Seconds',
    dangers: [
      'No solid surface',
      '-224°C temperatures',
      'No breathable atmosphere',
      'Extreme distance from Sun',
    ],
    whatWouldHappen: "You'd freeze instantly while falling through methane-rich atmosphere. The cold here is beyond comprehension.",
    couldWeColonize: "Its moons Miranda and Ariel are interesting, but the extreme cold and distance make colonization very challenging.",
  },
  neptune: {
    rating: 'instant-death',
    ratingEmoji: '💀',
    survivalTime: 'Seconds',
    dangers: [
      'Fastest winds in solar system (2,100 km/h)',
      '-214°C average temperature',
      'No solid surface',
      'Takes 4 hours for light to reach here from Sun',
    ],
    whatWouldHappen: "You'd be frozen solid and ripped apart by supersonic winds before you could even process what's happening.",
    couldWeColonize: "Triton (Neptune's moon) has nitrogen geysers and might have a subsurface ocean. But it's SO far away...",
  },
};

export const getSurvivability = (planetId: string): SurvivabilityResult | null => {
  const planet = planetsData.find(p => p.id === planetId);
  const data = SURVIVABILITY_DATA[planetId];
  if (!planet || !data) return null;

  return {
    planetId: planet.id,
    planetName: planet.name,
    emoji: planet.emoji,
    ...data,
  };
};

export const getAllSurvivability = (): SurvivabilityResult[] => {
  return planetsData.map(planet => getSurvivability(planet.id)!);
};

// =============================================================================
// SIZE COMPARISONS
// =============================================================================

export interface SizeComparison {
  baseId: string;
  baseName: string;
  baseEmoji: string;
  comparedId: string;
  comparedName: string;
  comparedEmoji: string;
  howManyFit: number;
  diameterRatio: number;
  volumeRatio: number;
  description: string;
}

export const comparePlanetSizes = (planetId1: string, planetId2: string): SizeComparison | null => {
  const planet1 = planetsData.find(p => p.id === planetId1);
  const planet2 = planetsData.find(p => p.id === planetId2);

  if (!planet1 || !planet2) return null;

  const diameterRatio = planet1.diameter / planet2.diameter;

  // Determine which is larger
  const [larger, smaller] = diameterRatio >= 1
    ? [planet1, planet2]
    : [planet2, planet1];

  const actualVolumeRatio = Math.pow(larger.diameter / smaller.diameter, 3);

  return {
    baseId: larger.id,
    baseName: larger.name,
    baseEmoji: larger.emoji,
    comparedId: smaller.id,
    comparedName: smaller.name,
    comparedEmoji: smaller.emoji,
    howManyFit: actualVolumeRatio,
    diameterRatio: larger.diameter / smaller.diameter,
    volumeRatio: actualVolumeRatio,
    description: `${Math.round(actualVolumeRatio).toLocaleString()} ${smaller.name}s could fit inside ${larger.name}!`,
  };
};

// Pre-computed fun comparisons
export const FUN_SIZE_FACTS = [
  { fact: "1,321 Earths could fit inside Jupiter", emoji: "🟠" },
  { fact: "764 Earths could fit inside Saturn", emoji: "🪐" },
  { fact: "The Sun could hold 1.3 million Earths", emoji: "☀️" },
  { fact: "Mercury is only 40% larger than Earth's Moon", emoji: "☿️" },
  { fact: "Ganymede (Jupiter's moon) is larger than Mercury!", emoji: "🏆" },
  { fact: "Jupiter's Great Red Spot could swallow Earth whole", emoji: "🔴" },
  { fact: "Saturn's rings extend 282,000 km but are only 10m thick", emoji: "💿" },
];

// =============================================================================
// TEMPERATURE COMPARISONS
// =============================================================================

export interface TemperatureComparison {
  planetId: string;
  planetName: string;
  emoji: string;
  tempCelsius: number;
  tempFahrenheit: number;
  tempKelvin: number;
  earthComparison: string;
  whatWouldHappen: string;
}

export const getTemperatureInfo = (planetId: string): TemperatureComparison | null => {
  const planet = planetsData.find(p => p.id === planetId);
  if (!planet) return null;

  const tempC = planet.tempRange.average;
  const tempF = (tempC * 9/5) + 32;
  const tempK = tempC + 273.15;

  const earthAvg = 15; // °C
  const diff = tempC - earthAvg;

  let earthComparison: string;
  if (Math.abs(diff) < 5) {
    earthComparison = "About the same as Earth!";
  } else if (diff > 0) {
    earthComparison = `${diff}°C hotter than Earth`;
  } else {
    earthComparison = `${Math.abs(diff)}°C colder than Earth`;
  }

  const whatWouldHappen: Record<string, string> = {
    mercury: "You'd experience the most extreme temperature swings in the solar system!",
    venus: "Hot enough to melt lead and cook a pizza in seconds.",
    earth: "Just right for liquid water and life as we know it!",
    mars: "Cold but manageable with good insulation. Some Earth deserts get this cold at night!",
    jupiter: "Cloud top temperature - it gets much hotter as you descend.",
    saturn: "Freezing at the cloud tops, but temperatures increase rapidly with depth.",
    uranus: "The coldest planet! Even colder than Neptune despite being closer to the Sun.",
    neptune: "Cold enough to freeze methane solid. That's really cold.",
  };

  return {
    planetId: planet.id,
    planetName: planet.name,
    emoji: planet.emoji,
    tempCelsius: tempC,
    tempFahrenheit: tempF,
    tempKelvin: tempK,
    earthComparison,
    whatWouldHappen: whatWouldHappen[planet.id] || "Temperatures vary throughout the solar system!",
  };
};
