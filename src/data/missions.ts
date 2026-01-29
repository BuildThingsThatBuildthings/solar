// =============================================================================
// SPACE MISSIONS DATA
// =============================================================================

export interface MissionWaypoint {
  bodyId: string;
  date: Date;
  type: 'launch' | 'flyby' | 'orbit' | 'landing' | 'departure' | 'current';
  description: string;
  distanceFromSunAU?: number;
}

export interface SpacecraftMission {
  id: string;
  name: string;
  agency: string;
  launchDate: Date;
  endDate?: Date;
  status: 'active' | 'completed' | 'lost' | 'extended';
  missionType: 'flyby' | 'orbiter' | 'lander' | 'rover' | 'sample-return';
  description: string;
  waypoints: MissionWaypoint[];
  highlights: string[];
  imageUrl?: string;
  emoji: string;
}

export const MISSIONS: SpacecraftMission[] = [
  // VOYAGER 1
  {
    id: 'voyager1',
    name: 'Voyager 1',
    agency: 'NASA',
    launchDate: new Date('1977-09-05'),
    status: 'active',
    missionType: 'flyby',
    description: 'The farthest human-made object from Earth, now exploring interstellar space.',
    emoji: '🛸',
    waypoints: [
      {
        bodyId: 'earth',
        date: new Date('1977-09-05'),
        type: 'launch',
        description: 'Launched from Cape Canaveral',
      },
      {
        bodyId: 'jupiter',
        date: new Date('1979-03-05'),
        type: 'flyby',
        description: 'Jupiter flyby - discovered volcanic activity on Io',
        distanceFromSunAU: 5.2,
      },
      {
        bodyId: 'saturn',
        date: new Date('1980-11-12'),
        type: 'flyby',
        description: 'Saturn flyby - close pass of Titan',
        distanceFromSunAU: 9.5,
      },
      {
        bodyId: 'sun', // Represents interstellar space direction
        date: new Date('2012-08-25'),
        type: 'departure',
        description: 'Entered interstellar space!',
        distanceFromSunAU: 121,
      },
      {
        bodyId: 'sun',
        date: new Date('2024-01-01'),
        type: 'current',
        description: 'Currently 24+ billion km from Earth',
        distanceFromSunAU: 163,
      },
    ],
    highlights: [
      'Farthest human-made object from Earth',
      'Discovered active volcanoes on Io',
      'First to enter interstellar space',
      'Carries the Golden Record with sounds and images of Earth',
    ],
  },

  // VOYAGER 2
  {
    id: 'voyager2',
    name: 'Voyager 2',
    agency: 'NASA',
    launchDate: new Date('1977-08-20'),
    status: 'active',
    missionType: 'flyby',
    description: 'The only spacecraft to visit all four outer planets.',
    emoji: '🛸',
    waypoints: [
      {
        bodyId: 'earth',
        date: new Date('1977-08-20'),
        type: 'launch',
        description: 'Launched from Cape Canaveral (before Voyager 1!)',
      },
      {
        bodyId: 'jupiter',
        date: new Date('1979-07-09'),
        type: 'flyby',
        description: 'Jupiter flyby',
        distanceFromSunAU: 5.2,
      },
      {
        bodyId: 'saturn',
        date: new Date('1981-08-26'),
        type: 'flyby',
        description: 'Saturn flyby',
        distanceFromSunAU: 9.5,
      },
      {
        bodyId: 'uranus',
        date: new Date('1986-01-24'),
        type: 'flyby',
        description: 'First and only Uranus flyby - discovered 10 new moons',
        distanceFromSunAU: 19.2,
      },
      {
        bodyId: 'neptune',
        date: new Date('1989-08-25'),
        type: 'flyby',
        description: 'First and only Neptune flyby - discovered Great Dark Spot',
        distanceFromSunAU: 30.1,
      },
      {
        bodyId: 'sun',
        date: new Date('2018-11-05'),
        type: 'departure',
        description: 'Entered interstellar space',
        distanceFromSunAU: 119,
      },
    ],
    highlights: [
      'Only spacecraft to visit Uranus and Neptune',
      'Completed the "Grand Tour" of outer planets',
      'Discovered 16 new moons across the outer planets',
      'Found magnetic fields tilted relative to rotation axes',
    ],
  },

  // CASSINI-HUYGENS
  {
    id: 'cassini',
    name: 'Cassini-Huygens',
    agency: 'NASA/ESA',
    launchDate: new Date('1997-10-15'),
    endDate: new Date('2017-09-15'),
    status: 'completed',
    missionType: 'orbiter',
    description: 'Orbited Saturn for 13 years, landed Huygens probe on Titan.',
    emoji: '🪐',
    waypoints: [
      {
        bodyId: 'earth',
        date: new Date('1997-10-15'),
        type: 'launch',
        description: 'Launched from Cape Canaveral',
      },
      {
        bodyId: 'venus',
        date: new Date('1998-04-26'),
        type: 'flyby',
        description: 'First Venus gravity assist',
        distanceFromSunAU: 0.72,
      },
      {
        bodyId: 'venus',
        date: new Date('1999-06-24'),
        type: 'flyby',
        description: 'Second Venus gravity assist',
        distanceFromSunAU: 0.72,
      },
      {
        bodyId: 'earth',
        date: new Date('1999-08-18'),
        type: 'flyby',
        description: 'Earth gravity assist',
      },
      {
        bodyId: 'jupiter',
        date: new Date('2000-12-30'),
        type: 'flyby',
        description: 'Jupiter gravity assist',
        distanceFromSunAU: 5.2,
      },
      {
        bodyId: 'saturn',
        date: new Date('2004-07-01'),
        type: 'orbit',
        description: 'Saturn orbit insertion - began 13-year mission',
        distanceFromSunAU: 9.5,
      },
      {
        bodyId: 'titan',
        date: new Date('2005-01-14'),
        type: 'landing',
        description: 'Huygens probe lands on Titan - first landing in outer solar system',
      },
      {
        bodyId: 'saturn',
        date: new Date('2017-09-15'),
        type: 'departure',
        description: '"Grand Finale" - intentional plunge into Saturn',
        distanceFromSunAU: 9.5,
      },
    ],
    highlights: [
      'First spacecraft to orbit Saturn',
      'Huygens: first landing in the outer solar system (on Titan)',
      'Discovered geysers on Enceladus',
      'Revealed methane lakes on Titan',
      '294 orbits of Saturn over 13 years',
    ],
  },

  // NEW HORIZONS
  {
    id: 'newhorizons',
    name: 'New Horizons',
    agency: 'NASA',
    launchDate: new Date('2006-01-19'),
    status: 'active',
    missionType: 'flyby',
    description: 'First spacecraft to explore Pluto and the Kuiper Belt.',
    emoji: '❄️',
    waypoints: [
      {
        bodyId: 'earth',
        date: new Date('2006-01-19'),
        type: 'launch',
        description: 'Launched - fastest spacecraft ever at launch',
      },
      {
        bodyId: 'jupiter',
        date: new Date('2007-02-28'),
        type: 'flyby',
        description: 'Jupiter gravity assist - speed boost',
        distanceFromSunAU: 5.2,
      },
      {
        bodyId: 'sun', // Pluto not in our data
        date: new Date('2015-07-14'),
        type: 'flyby',
        description: 'Pluto flyby - first close-up images',
        distanceFromSunAU: 33,
      },
      {
        bodyId: 'sun', // Arrokoth not in our data
        date: new Date('2019-01-01'),
        type: 'flyby',
        description: 'Arrokoth flyby - farthest object ever explored',
        distanceFromSunAU: 44,
      },
      {
        bodyId: 'sun',
        date: new Date('2024-01-01'),
        type: 'current',
        description: 'Exploring Kuiper Belt, heading toward interstellar space',
        distanceFromSunAU: 58,
      },
    ],
    highlights: [
      'Fastest spacecraft at launch (58,000 km/h)',
      'First to explore Pluto system',
      'Revealed Pluto as a geologically active world',
      'Explored Arrokoth - most distant object ever visited',
    ],
  },

  // JUNO
  {
    id: 'juno',
    name: 'Juno',
    agency: 'NASA',
    launchDate: new Date('2011-08-05'),
    status: 'extended',
    missionType: 'orbiter',
    description: 'Studying Jupiter\'s interior, atmosphere, and magnetic field.',
    emoji: '🟠',
    waypoints: [
      {
        bodyId: 'earth',
        date: new Date('2011-08-05'),
        type: 'launch',
        description: 'Launched from Cape Canaveral',
      },
      {
        bodyId: 'earth',
        date: new Date('2013-10-09'),
        type: 'flyby',
        description: 'Earth gravity assist',
      },
      {
        bodyId: 'jupiter',
        date: new Date('2016-07-05'),
        type: 'orbit',
        description: 'Jupiter orbit insertion - polar orbit',
        distanceFromSunAU: 5.2,
      },
      {
        bodyId: 'jupiter',
        date: new Date('2024-01-01'),
        type: 'current',
        description: 'Extended mission - studying moons',
      },
    ],
    highlights: [
      'First solar-powered spacecraft at Jupiter',
      'Discovered Jupiter\'s core is "fuzzy" not solid',
      'Detailed polar storm observations',
      'Extended to study Galilean moons',
    ],
  },

  // MARS PERSEVERANCE
  {
    id: 'perseverance',
    name: 'Perseverance',
    agency: 'NASA',
    launchDate: new Date('2020-07-30'),
    status: 'active',
    missionType: 'rover',
    description: 'Mars rover searching for signs of ancient life and collecting samples.',
    emoji: '🔴',
    waypoints: [
      {
        bodyId: 'earth',
        date: new Date('2020-07-30'),
        type: 'launch',
        description: 'Launched during Mars opposition window',
      },
      {
        bodyId: 'mars',
        date: new Date('2021-02-18'),
        type: 'landing',
        description: 'Landed in Jezero Crater - ancient river delta',
        distanceFromSunAU: 1.52,
      },
      {
        bodyId: 'mars',
        date: new Date('2024-01-01'),
        type: 'current',
        description: 'Exploring Jezero Crater, collecting samples for return',
      },
    ],
    highlights: [
      'First powered flight on another planet (Ingenuity helicopter)',
      'Collected samples for future Earth return',
      'Produced oxygen from Mars atmosphere (MOXIE)',
      'Exploring ancient river delta for biosignatures',
    ],
  },

  // CURIOSITY
  {
    id: 'curiosity',
    name: 'Curiosity',
    agency: 'NASA',
    launchDate: new Date('2011-11-26'),
    status: 'active',
    missionType: 'rover',
    description: 'Mars Science Laboratory exploring Gale Crater.',
    emoji: '🔴',
    waypoints: [
      {
        bodyId: 'earth',
        date: new Date('2011-11-26'),
        type: 'launch',
        description: 'Launched from Cape Canaveral',
      },
      {
        bodyId: 'mars',
        date: new Date('2012-08-06'),
        type: 'landing',
        description: 'Sky crane landing in Gale Crater',
        distanceFromSunAU: 1.52,
      },
      {
        bodyId: 'mars',
        date: new Date('2024-01-01'),
        type: 'current',
        description: 'Climbing Mount Sharp, still operational after 11+ years',
      },
    ],
    highlights: [
      'Revolutionary sky crane landing',
      'Confirmed Mars was once habitable',
      'Detected organic molecules',
      'Over 30 km traveled, 11+ years operational',
    ],
  },

  // MESSENGER
  {
    id: 'messenger',
    name: 'MESSENGER',
    agency: 'NASA',
    launchDate: new Date('2004-08-03'),
    endDate: new Date('2015-04-30'),
    status: 'completed',
    missionType: 'orbiter',
    description: 'First spacecraft to orbit Mercury.',
    emoji: '☿️',
    waypoints: [
      {
        bodyId: 'earth',
        date: new Date('2004-08-03'),
        type: 'launch',
        description: 'Launched from Cape Canaveral',
      },
      {
        bodyId: 'earth',
        date: new Date('2005-08-02'),
        type: 'flyby',
        description: 'Earth gravity assist',
      },
      {
        bodyId: 'venus',
        date: new Date('2006-10-24'),
        type: 'flyby',
        description: 'First Venus flyby',
        distanceFromSunAU: 0.72,
      },
      {
        bodyId: 'venus',
        date: new Date('2007-06-05'),
        type: 'flyby',
        description: 'Second Venus flyby',
        distanceFromSunAU: 0.72,
      },
      {
        bodyId: 'mercury',
        date: new Date('2008-01-14'),
        type: 'flyby',
        description: 'First Mercury flyby',
        distanceFromSunAU: 0.39,
      },
      {
        bodyId: 'mercury',
        date: new Date('2011-03-18'),
        type: 'orbit',
        description: 'Mercury orbit insertion',
        distanceFromSunAU: 0.39,
      },
      {
        bodyId: 'mercury',
        date: new Date('2015-04-30'),
        type: 'departure',
        description: 'Intentional impact after fuel exhaustion',
        distanceFromSunAU: 0.39,
      },
    ],
    highlights: [
      'First spacecraft to orbit Mercury',
      'Discovered water ice in polar craters',
      'Mapped entire surface',
      'Revealed Mercury\'s volcanic history',
    ],
  },
];

// Helper functions
export const getMissionById = (id: string): SpacecraftMission | undefined => {
  return MISSIONS.find(m => m.id === id);
};

export const getMissionsByStatus = (status: SpacecraftMission['status']): SpacecraftMission[] => {
  return MISSIONS.filter(m => m.status === status);
};

export const getMissionsByBody = (bodyId: string): SpacecraftMission[] => {
  return MISSIONS.filter(m =>
    m.waypoints.some(w => w.bodyId === bodyId)
  );
};

export const getActiveMissions = (): SpacecraftMission[] => {
  return MISSIONS.filter(m => m.status === 'active' || m.status === 'extended');
};

export const getMissionDuration = (mission: SpacecraftMission): string => {
  const end = mission.endDate || new Date();
  const start = mission.launchDate;
  const years = Math.floor((end.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
  const months = Math.floor(((end.getTime() - start.getTime()) % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));

  if (years === 0) return `${months} months`;
  if (months === 0) return `${years} years`;
  return `${years} years, ${months} months`;
};
