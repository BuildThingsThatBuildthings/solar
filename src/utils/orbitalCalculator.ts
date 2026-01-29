/**
 * Simplified orbital mechanics calculator for educational purposes.
 * Uses Keplerian orbital elements to approximate planet positions at any date.
 * Note: This is a simplified model - actual planetary positions require more complex calculations.
 */

import { planetsData } from '../data/planets';

// Orbital elements at J2000.0 (January 1, 2000, 12:00 TT)
// Semi-major axis (AU), eccentricity, inclination (deg),
// longitude of ascending node (deg), argument of perihelion (deg), mean anomaly at epoch (deg)

interface OrbitalElements {
  a: number;    // Semi-major axis in AU
  e: number;    // Eccentricity
  i: number;    // Inclination in degrees
  omega: number; // Longitude of ascending node in degrees
  w: number;    // Argument of perihelion in degrees
  M0: number;   // Mean anomaly at J2000.0 in degrees
  n: number;    // Mean motion in degrees per day
}

const ORBITAL_ELEMENTS: Record<string, OrbitalElements> = {
  mercury: {
    a: 0.38709927,
    e: 0.20563593,
    i: 7.00497902,
    omega: 48.33076593,
    w: 77.45779628,
    M0: 174.79252722,
    n: 4.09233445,
  },
  venus: {
    a: 0.72333566,
    e: 0.00677672,
    i: 3.39467605,
    omega: 76.67984255,
    w: 131.60246718,
    M0: 50.37663232,
    n: 1.60213034,
  },
  earth: {
    a: 1.00000261,
    e: 0.01671123,
    i: 0.00001531,
    omega: -11.26064,
    w: 102.94719,
    M0: 100.46457166,
    n: 0.98560028,
  },
  mars: {
    a: 1.52371034,
    e: 0.09339410,
    i: 1.84969142,
    omega: 49.55953891,
    w: 336.04084,
    M0: 355.45332,
    n: 0.52402068,
  },
  jupiter: {
    a: 5.20288700,
    e: 0.04838624,
    i: 1.30439695,
    omega: 100.47390909,
    w: 14.72847983,
    M0: 34.39644051,
    n: 0.08308529,
  },
  saturn: {
    a: 9.53667594,
    e: 0.05386179,
    i: 2.48599187,
    omega: 113.66242448,
    w: 92.59887831,
    M0: 49.95424423,
    n: 0.03344414,
  },
  uranus: {
    a: 19.18916464,
    e: 0.04725744,
    i: 0.77263783,
    omega: 74.01692503,
    w: 170.95427630,
    M0: 313.23218,
    n: 0.01172834,
  },
  neptune: {
    a: 30.06992276,
    e: 0.00859048,
    i: 1.77004347,
    omega: 131.78422574,
    w: 44.96476227,
    M0: 304.88003,
    n: 0.00598103,
  },
};

// J2000.0 epoch (January 1, 2000, 12:00 TT)
const J2000 = new Date('2000-01-01T12:00:00Z');

/**
 * Calculate days since J2000.0 epoch
 */
const daysSinceJ2000 = (date: Date): number => {
  const msPerDay = 24 * 60 * 60 * 1000;
  return (date.getTime() - J2000.getTime()) / msPerDay;
};

/**
 * Convert degrees to radians
 */
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Normalize angle to 0-360 range
 */
const normalizeAngle = (angle: number): number => {
  while (angle < 0) angle += 360;
  while (angle >= 360) angle -= 360;
  return angle;
};

/**
 * Solve Kepler's equation for eccentric anomaly using Newton-Raphson iteration
 */
const solveKeplerEquation = (M: number, e: number, tolerance: number = 1e-8): number => {
  const MRad = toRadians(M);
  let E = MRad; // Initial guess

  for (let i = 0; i < 100; i++) {
    const dE = (E - e * Math.sin(E) - MRad) / (1 - e * Math.cos(E));
    E -= dE;
    if (Math.abs(dE) < tolerance) break;
  }

  return E;
};

/**
 * Calculate true anomaly from eccentric anomaly
 */
const trueAnomalyFromEccentric = (E: number, e: number): number => {
  const tanHalfNu = Math.sqrt((1 + e) / (1 - e)) * Math.tan(E / 2);
  return 2 * Math.atan(tanHalfNu);
};

export interface PlanetPosition {
  x: number; // Position in 3D space (scaled for visualization)
  y: number;
  z: number;
  distanceFromSun: number; // AU
  angle: number; // Orbital angle in radians
  trueAnomaly: number; // True anomaly in radians
}

/**
 * Calculate the position of a planet at a given date
 */
export const calculatePlanetPosition = (
  planetId: string,
  date: Date,
  visualScale: number = 1
): PlanetPosition | null => {
  const elements = ORBITAL_ELEMENTS[planetId];
  if (!elements) return null;

  const planet = planetsData.find(p => p.id === planetId);
  if (!planet) return null;

  // Days since J2000
  const t = daysSinceJ2000(date);

  // Calculate mean anomaly at date
  const M = normalizeAngle(elements.M0 + elements.n * t);

  // Solve Kepler's equation for eccentric anomaly
  const E = solveKeplerEquation(M, elements.e);

  // Calculate true anomaly
  const nu = trueAnomalyFromEccentric(E, elements.e);

  // Calculate distance from Sun (in AU)
  const r = elements.a * (1 - elements.e * Math.cos(E));

  // Convert orbital elements to 3D position
  // For simplicity, we'll use a simplified 2D projection in the ecliptic plane
  const omegaRad = toRadians(elements.omega);
  const wRad = toRadians(elements.w);
  const iRad = toRadians(elements.i);

  // Position in orbital plane
  const xOrbital = r * Math.cos(nu);
  const yOrbital = r * Math.sin(nu);

  // Rotate to ecliptic coordinates (simplified)
  const cosW = Math.cos(wRad - omegaRad);
  const sinW = Math.sin(wRad - omegaRad);
  const cosI = Math.cos(iRad);
  const sinI = Math.sin(iRad);

  // Simplified rotation (ignoring some transformations for educational purposes)
  const x = xOrbital * cosW - yOrbital * sinW;
  const y = (xOrbital * sinW + yOrbital * cosW) * cosI;
  const z = (xOrbital * sinW + yOrbital * cosW) * sinI;

  // Scale for visualization (use the planet's visual orbit radius)
  const scale = planet.orbitRadius / elements.a;

  return {
    x: x * scale * visualScale,
    y: z * scale * visualScale, // Swap y and z for Three.js coordinate system
    z: y * scale * visualScale,
    distanceFromSun: r,
    angle: nu + wRad,
    trueAnomaly: nu,
  };
};

/**
 * Get all planet positions at a given date
 */
export const getAllPlanetPositions = (
  date: Date,
  visualScale: number = 1
): Map<string, PlanetPosition> => {
  const positions = new Map<string, PlanetPosition>();

  for (const planetId of Object.keys(ORBITAL_ELEMENTS)) {
    const position = calculatePlanetPosition(planetId, date, visualScale);
    if (position) {
      positions.set(planetId, position);
    }
  }

  return positions;
};

/**
 * Calculate the orbital angle (simplified) for animation purposes
 * Returns a value 0-2π representing position along orbit
 */
export const getOrbitalAngle = (planetId: string, date: Date): number | null => {
  const position = calculatePlanetPosition(planetId, date);
  return position ? position.angle : null;
};

/**
 * Get a human-readable description of planet positions
 */
export const describePlanetPositions = (date: Date): string[] => {
  const descriptions: string[] = [];
  const positions = getAllPlanetPositions(date);

  positions.forEach((pos, planetId) => {
    const planet = planetsData.find(p => p.id === planetId);
    if (!planet) return;

    const angleDeg = (pos.angle * 180 / Math.PI) % 360;
    const quadrant = Math.floor(angleDeg / 90);
    const quadrantNames = ['eastern', 'northern', 'western', 'southern'];

    descriptions.push(
      `${planet.emoji} ${planet.name} is in the ${quadrantNames[quadrant]} part of its orbit, ` +
      `${pos.distanceFromSun.toFixed(2)} AU from the Sun.`
    );
  });

  return descriptions;
};
