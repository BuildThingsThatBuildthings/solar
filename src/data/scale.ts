import { planetsData } from './planets';
import { sunData } from './sun';

// =============================================================================
// DISTANCE DATA (in million km from Sun)
// =============================================================================

export interface DistanceData {
  bodyId: string;
  name: string;
  emoji: string;
  distanceFromSunKm: number; // km
  distanceFromSunAU: number; // Astronomical Units
  lightTravelTime: string; // Time for light to travel from Sun
  lightTravelSeconds: number;
}

const SPEED_OF_LIGHT = 299792.458; // km/s
const AU_IN_KM = 149597870.7; // 1 AU in km

export const getDistanceData = (planetId: string): DistanceData | null => {
  const planet = planetsData.find(p => p.id === planetId);
  if (!planet) return null;

  const distanceKm = planet.distanceFromSun.average * 1_000_000; // Convert million km to km
  const distanceAU = distanceKm / AU_IN_KM;
  const lightTravelSeconds = distanceKm / SPEED_OF_LIGHT;

  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds.toFixed(1)} seconds`;
    if (seconds < 3600) return `${(seconds / 60).toFixed(1)} minutes`;
    if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} hours`;
    return `${(seconds / 86400).toFixed(1)} days`;
  };

  return {
    bodyId: planet.id,
    name: planet.name,
    emoji: planet.emoji,
    distanceFromSunKm: distanceKm,
    distanceFromSunAU: distanceAU,
    lightTravelTime: formatTime(lightTravelSeconds),
    lightTravelSeconds,
  };
};

export const getAllDistances = (): DistanceData[] => {
  return planetsData.map(p => getDistanceData(p.id)!);
};

// =============================================================================
// TRAVEL SPEED DATA
// =============================================================================

export interface TravelSpeed {
  id: string;
  name: string;
  emoji: string;
  speedKmPerHour: number;
  description: string;
}

export const TRAVEL_SPEEDS: TravelSpeed[] = [
  {
    id: 'walking',
    name: 'Walking',
    emoji: '🚶',
    speedKmPerHour: 5,
    description: 'Average human walking speed',
  },
  {
    id: 'car',
    name: 'Car',
    emoji: '🚗',
    speedKmPerHour: 100,
    description: 'Highway driving speed',
  },
  {
    id: 'plane',
    name: 'Airplane',
    emoji: '✈️',
    speedKmPerHour: 900,
    description: 'Commercial jet cruise speed',
  },
  {
    id: 'bullet',
    name: 'Bullet',
    emoji: '💨',
    speedKmPerHour: 2736, // ~760 m/s
    description: 'Rifle bullet speed',
  },
  {
    id: 'rocket',
    name: 'Rocket',
    emoji: '🚀',
    speedKmPerHour: 40000, // ~11 km/s escape velocity
    description: 'Space shuttle orbital speed',
  },
  {
    id: 'voyager',
    name: 'Voyager 1',
    emoji: '🛸',
    speedKmPerHour: 61200, // ~17 km/s
    description: 'Fastest human-made object',
  },
  {
    id: 'light',
    name: 'Light',
    emoji: '⚡',
    speedKmPerHour: 1079252848.8, // 299,792 km/s
    description: 'Speed of light (impossible for matter)',
  },
];

// =============================================================================
// TRAVEL TIME CALCULATOR
// =============================================================================

export interface TravelTimeResult {
  origin: string;
  destination: string;
  distanceKm: number;
  travelSpeed: TravelSpeed;
  travelTimeSeconds: number;
  travelTimeFormatted: string;
  funComparison: string;
}

const formatTravelTime = (seconds: number): string => {
  const minute = 60;
  const hour = 3600;
  const day = 86400;
  const year = 365.25 * day;
  const century = 100 * year;
  const millennium = 1000 * year;

  if (seconds < minute) return `${seconds.toFixed(1)} seconds`;
  if (seconds < hour) return `${(seconds / minute).toFixed(1)} minutes`;
  if (seconds < day) return `${(seconds / hour).toFixed(1)} hours`;
  if (seconds < 30 * day) return `${(seconds / day).toFixed(1)} days`;
  if (seconds < year) return `${(seconds / (30 * day)).toFixed(1)} months`;
  if (seconds < 100 * year) return `${(seconds / year).toFixed(1)} years`;
  if (seconds < millennium) return `${(seconds / century).toFixed(1)} centuries`;
  if (seconds < 1000000 * year) return `${(seconds / millennium).toFixed(1)} millennia`;
  return `${(seconds / (1000000 * year)).toFixed(1)} million years`;
};

const getFunComparison = (seconds: number): string => {
  const year = 365.25 * 86400;
  const humanLifespan = 80 * year;
  const recordedHistory = 5000 * year;
  const dinosaurExtinction = 66000000 * year;

  if (seconds < 60) return "Blink and you'll miss it!";
  if (seconds < 3600) return "About as long as a TV episode";
  if (seconds < 86400) return "Pack a lunch!";
  if (seconds < 30 * 86400) return "Time for a vacation";
  if (seconds < year) return "You'd need to take a year off work";
  if (seconds < 10 * year) return "A significant chunk of your life";
  if (seconds < humanLifespan) return "Most of a human lifetime";
  if (seconds < 10 * humanLifespan) return "Multiple human lifetimes";
  if (seconds < recordedHistory) return "Longer than all of recorded history";
  if (seconds < dinosaurExtinction) return "The dinosaurs would be jealous";
  return "The universe itself might not last this long!";
};

export const calculateTravelTime = (
  originId: string,
  destinationId: string,
  speedId: string
): TravelTimeResult | null => {
  const speed = TRAVEL_SPEEDS.find(s => s.id === speedId);
  if (!speed) return null;

  // Get distances (all relative to Sun)
  const originData = originId === 'sun'
    ? { distanceFromSunKm: 0, name: 'Sun', emoji: sunData.emoji }
    : getDistanceData(originId);
  const destData = destinationId === 'sun'
    ? { distanceFromSunKm: 0, name: 'Sun', emoji: sunData.emoji }
    : getDistanceData(destinationId);

  if (!originData || !destData) return null;

  // Simple distance calculation (doesn't account for orbital positions)
  const distanceKm = Math.abs(destData.distanceFromSunKm - originData.distanceFromSunKm);
  const speedKmPerSecond = speed.speedKmPerHour / 3600;
  const travelTimeSeconds = distanceKm / speedKmPerSecond;

  return {
    origin: originData.name,
    destination: destData.name,
    distanceKm,
    travelSpeed: speed,
    travelTimeSeconds,
    travelTimeFormatted: formatTravelTime(travelTimeSeconds),
    funComparison: getFunComparison(travelTimeSeconds),
  };
};

// =============================================================================
// SIZE COMPARISON DATA
// =============================================================================

export interface SizeComparisonFact {
  description: string;
  emoji: string;
  value: number;
  unit: string;
}

export const SIZE_COMPARISON_FACTS: SizeComparisonFact[] = [
  { description: "Earths that fit inside Jupiter", emoji: "🟠", value: 1321, unit: "Earths" },
  { description: "Earths that fit inside Saturn", emoji: "🪐", value: 764, unit: "Earths" },
  { description: "Earths that fit inside the Sun", emoji: "☀️", value: 1300000, unit: "Earths" },
  { description: "Moons that fit inside Earth", emoji: "🌍", value: 49, unit: "Moons" },
  { description: "Mercury's diameter vs Moon's", emoji: "☿️", value: 1.4, unit: "x larger" },
  { description: "Jupiter's Great Red Spot vs Earth", emoji: "🔴", value: 1.3, unit: "x larger" },
];

// True scale factors for visualization
export const TRUE_SIZE_SCALE: Record<string, number> = {
  sun: 109, // 109x Earth's diameter
  mercury: 0.383,
  venus: 0.949,
  earth: 1.0,
  mars: 0.532,
  jupiter: 11.21,
  saturn: 9.45,
  uranus: 4.01,
  neptune: 3.88,
};

// True distance scale (AU, where Earth = 1)
export const TRUE_DISTANCE_SCALE: Record<string, number> = {
  sun: 0,
  mercury: 0.387,
  venus: 0.723,
  earth: 1.0,
  mars: 1.524,
  jupiter: 5.203,
  saturn: 9.537,
  uranus: 19.19,
  neptune: 30.07,
};

// =============================================================================
// LIGHT SPEED ANIMATION DATA
// =============================================================================

export interface LightSpeedTarget {
  bodyId: string;
  name: string;
  emoji: string;
  secondsFromSun: number;
  distanceKm: number;
}

export const getLightSpeedTargets = (): LightSpeedTarget[] => {
  return planetsData.map(planet => {
    const distanceKm = planet.distanceFromSun.average * 1_000_000;
    return {
      bodyId: planet.id,
      name: planet.name,
      emoji: planet.emoji,
      secondsFromSun: distanceKm / SPEED_OF_LIGHT,
      distanceKm,
    };
  });
};

// Time for light to reach each planet from the Sun
export const LIGHT_TRAVEL_TIMES: Record<string, number> = {
  mercury: 193, // 3.2 minutes
  venus: 360, // 6 minutes
  earth: 499, // 8.3 minutes
  mars: 760, // 12.7 minutes
  jupiter: 2595, // 43.3 minutes
  saturn: 4785, // 79.8 minutes (1.33 hours)
  uranus: 9575, // 159.6 minutes (2.66 hours)
  neptune: 14998, // 250 minutes (4.17 hours)
};
