// =============================================================================
// HISTORICAL EVENTS FOR TIME MACHINE
// =============================================================================

export interface HistoricalEvent {
  id: string;
  name: string;
  date: Date;
  description: string;
  category: 'mission' | 'discovery' | 'celestial' | 'human';
  emoji: string;
  relatedBodies?: string[];
  significance: string;
}

export const HISTORICAL_EVENTS: HistoricalEvent[] = [
  // SPACE MISSIONS
  {
    id: 'sputnik',
    name: 'Sputnik 1 Launch',
    date: new Date('1957-10-04'),
    description: 'First artificial satellite launched by the Soviet Union',
    category: 'mission',
    emoji: '🛰️',
    relatedBodies: ['earth'],
    significance: 'Started the Space Age and the Space Race',
  },
  {
    id: 'gagarin',
    name: 'Yuri Gagarin\'s Flight',
    date: new Date('1961-04-12'),
    description: 'First human in space aboard Vostok 1',
    category: 'human',
    emoji: '👨‍🚀',
    relatedBodies: ['earth'],
    significance: 'Proved humans could survive in space',
  },
  {
    id: 'apollo11',
    name: 'Apollo 11 Moon Landing',
    date: new Date('1969-07-20'),
    description: 'Neil Armstrong and Buzz Aldrin become first humans on the Moon',
    category: 'human',
    emoji: '🌙',
    relatedBodies: ['earth', 'luna'],
    significance: '"One small step for man, one giant leap for mankind"',
  },
  {
    id: 'mariner4',
    name: 'Mariner 4 Mars Flyby',
    date: new Date('1965-07-15'),
    description: 'First successful Mars flyby, first close-up photos of Mars',
    category: 'mission',
    emoji: '🔴',
    relatedBodies: ['mars'],
    significance: 'Revealed Mars as a cratered, barren world',
  },
  {
    id: 'voyager1',
    name: 'Voyager 1 Launch',
    date: new Date('1977-09-05'),
    description: 'Launched on its grand tour of the outer solar system',
    category: 'mission',
    emoji: '🛸',
    relatedBodies: ['earth', 'jupiter', 'saturn'],
    significance: 'Now the farthest human-made object from Earth',
  },
  {
    id: 'voyager2',
    name: 'Voyager 2 Launch',
    date: new Date('1977-08-20'),
    description: 'Launched to visit all four outer planets',
    category: 'mission',
    emoji: '🛸',
    relatedBodies: ['earth', 'jupiter', 'saturn', 'uranus', 'neptune'],
    significance: 'Only spacecraft to visit Uranus and Neptune',
  },
  {
    id: 'viking1',
    name: 'Viking 1 Mars Landing',
    date: new Date('1976-07-20'),
    description: 'First successful Mars landing and operations',
    category: 'mission',
    emoji: '🔴',
    relatedBodies: ['mars'],
    significance: 'First photos from Mars surface and life detection experiments',
  },
  {
    id: 'pioneer10_jupiter',
    name: 'Pioneer 10 Jupiter Flyby',
    date: new Date('1973-12-03'),
    description: 'First spacecraft to fly past Jupiter',
    category: 'mission',
    emoji: '🟠',
    relatedBodies: ['jupiter'],
    significance: 'First close-up images of Jupiter',
  },
  {
    id: 'cassini_saturn',
    name: 'Cassini Arrives at Saturn',
    date: new Date('2004-07-01'),
    description: 'Cassini spacecraft enters Saturn orbit',
    category: 'mission',
    emoji: '🪐',
    relatedBodies: ['saturn', 'titan', 'enceladus'],
    significance: 'Revealed Saturn\'s rings and moons in unprecedented detail',
  },
  {
    id: 'huygens_titan',
    name: 'Huygens Lands on Titan',
    date: new Date('2005-01-14'),
    description: 'First landing on a moon in the outer solar system',
    category: 'mission',
    emoji: '🌫️',
    relatedBodies: ['titan', 'saturn'],
    significance: 'Revealed methane lakes and rivers on Titan',
  },
  {
    id: 'new_horizons_pluto',
    name: 'New Horizons Reaches Pluto',
    date: new Date('2015-07-14'),
    description: 'First spacecraft to fly by Pluto',
    category: 'mission',
    emoji: '❄️',
    relatedBodies: [],
    significance: 'Revealed Pluto as a geologically active world',
  },
  {
    id: 'curiosity_landing',
    name: 'Curiosity Rover Landing',
    date: new Date('2012-08-06'),
    description: 'NASA\'s Curiosity rover lands on Mars',
    category: 'mission',
    emoji: '🔴',
    relatedBodies: ['mars'],
    significance: 'Confirmed ancient habitable conditions on Mars',
  },
  {
    id: 'perseverance_landing',
    name: 'Perseverance Rover Landing',
    date: new Date('2021-02-18'),
    description: 'Perseverance and Ingenuity helicopter land on Mars',
    category: 'mission',
    emoji: '🚁',
    relatedBodies: ['mars'],
    significance: 'First powered flight on another planet',
  },
  {
    id: 'juno_jupiter',
    name: 'Juno Arrives at Jupiter',
    date: new Date('2016-07-05'),
    description: 'Juno spacecraft enters Jupiter polar orbit',
    category: 'mission',
    emoji: '🟠',
    relatedBodies: ['jupiter'],
    significance: 'Studying Jupiter\'s interior and magnetic field',
  },
  {
    id: 'messenger_mercury',
    name: 'MESSENGER Orbits Mercury',
    date: new Date('2011-03-18'),
    description: 'First spacecraft to orbit Mercury',
    category: 'mission',
    emoji: '☿️',
    relatedBodies: ['mercury'],
    significance: 'Discovered water ice in Mercury\'s polar craters',
  },

  // DISCOVERIES
  {
    id: 'uranus_discovery',
    name: 'Uranus Discovered',
    date: new Date('1781-03-13'),
    description: 'William Herschel discovers Uranus with a telescope',
    category: 'discovery',
    emoji: '🔵',
    relatedBodies: ['uranus'],
    significance: 'First planet discovered with a telescope',
  },
  {
    id: 'neptune_discovery',
    name: 'Neptune Discovered',
    date: new Date('1846-09-23'),
    description: 'Neptune discovered through mathematical prediction',
    category: 'discovery',
    emoji: '💙',
    relatedBodies: ['neptune'],
    significance: 'First planet discovered by mathematical prediction',
  },
  {
    id: 'galilean_moons',
    name: 'Galileo Discovers Jupiter\'s Moons',
    date: new Date('1610-01-07'),
    description: 'Galileo observes Io, Europa, Ganymede, and Callisto',
    category: 'discovery',
    emoji: '🔭',
    relatedBodies: ['jupiter', 'io', 'europa', 'ganymede', 'callisto'],
    significance: 'Proved not everything orbits Earth',
  },
  {
    id: 'titan_discovery',
    name: 'Titan Discovered',
    date: new Date('1655-03-25'),
    description: 'Christiaan Huygens discovers Saturn\'s largest moon',
    category: 'discovery',
    emoji: '🌫️',
    relatedBodies: ['titan', 'saturn'],
    significance: 'First moon discovered after Galilean moons',
  },
  {
    id: 'saturn_rings',
    name: 'Saturn\'s Rings Identified',
    date: new Date('1659-01-01'),
    description: 'Huygens correctly identifies Saturn\'s rings',
    category: 'discovery',
    emoji: '🪐',
    relatedBodies: ['saturn'],
    significance: 'Solved the mystery of Saturn\'s "ears"',
  },

  // CELESTIAL EVENTS
  {
    id: 'total_eclipse_2017',
    name: 'Great American Eclipse',
    date: new Date('2017-08-21'),
    description: 'Total solar eclipse visible across the United States',
    category: 'celestial',
    emoji: '🌑',
    relatedBodies: ['earth', 'luna'],
    significance: 'First coast-to-coast US eclipse since 1918',
  },
  {
    id: 'halley_comet_1986',
    name: 'Halley\'s Comet Returns',
    date: new Date('1986-02-09'),
    description: 'Halley\'s Comet reaches perihelion',
    category: 'celestial',
    emoji: '☄️',
    relatedBodies: [],
    significance: 'First close-up observations by spacecraft',
  },
  {
    id: 'shoemaker_levy_9',
    name: 'Comet Hits Jupiter',
    date: new Date('1994-07-16'),
    description: 'Shoemaker-Levy 9 fragments impact Jupiter',
    category: 'celestial',
    emoji: '💥',
    relatedBodies: ['jupiter'],
    significance: 'First direct observation of extraterrestrial collision',
  },
  {
    id: 'mars_opposition_2003',
    name: 'Mars Closest in 60,000 Years',
    date: new Date('2003-08-27'),
    description: 'Mars comes within 55.8 million km of Earth',
    category: 'celestial',
    emoji: '🔴',
    relatedBodies: ['earth', 'mars'],
    significance: 'Closest Mars approach in recorded history',
  },

  // HUMAN ACHIEVEMENTS
  {
    id: 'iss_first_crew',
    name: 'ISS First Permanent Crew',
    date: new Date('2000-11-02'),
    description: 'Expedition 1 crew arrives at the International Space Station',
    category: 'human',
    emoji: '🏠',
    relatedBodies: ['earth'],
    significance: 'Beginning of continuous human presence in space',
  },
  {
    id: 'hubble_launch',
    name: 'Hubble Space Telescope Launch',
    date: new Date('1990-04-24'),
    description: 'NASA launches the Hubble Space Telescope',
    category: 'mission',
    emoji: '🔭',
    relatedBodies: ['earth'],
    significance: 'Revolutionized astronomy with unprecedented images',
  },
  {
    id: 'jwst_launch',
    name: 'James Webb Space Telescope Launch',
    date: new Date('2021-12-25'),
    description: 'Most powerful space telescope ever launched',
    category: 'mission',
    emoji: '🔭',
    relatedBodies: ['earth'],
    significance: 'Seeing the universe in infrared like never before',
  },
];

// Sort events by date
export const getEventsByDate = (): HistoricalEvent[] => {
  return [...HISTORICAL_EVENTS].sort((a, b) => a.date.getTime() - b.date.getTime());
};

// Get events by category
export const getEventsByCategory = (category: HistoricalEvent['category']): HistoricalEvent[] => {
  return HISTORICAL_EVENTS.filter(e => e.category === category);
};

// Get events related to a specific body
export const getEventsForBody = (bodyId: string): HistoricalEvent[] => {
  return HISTORICAL_EVENTS.filter(e => e.relatedBodies?.includes(bodyId));
};

// Get the closest event to a given date
export const getClosestEvent = (date: Date): HistoricalEvent | null => {
  if (HISTORICAL_EVENTS.length === 0) return null;

  let closest = HISTORICAL_EVENTS[0];
  let closestDiff = Math.abs(date.getTime() - closest.date.getTime());

  for (const event of HISTORICAL_EVENTS) {
    const diff = Math.abs(date.getTime() - event.date.getTime());
    if (diff < closestDiff) {
      closest = event;
      closestDiff = diff;
    }
  }

  return closest;
};

// FUTURE EVENTS
export const FUTURE_EVENTS: HistoricalEvent[] = [
  {
    id: 'artemis_moon',
    name: 'Artemis III Moon Landing',
    date: new Date('2026-09-01'),
    description: 'First woman and next man to walk on the Moon',
    category: 'human',
    emoji: '🌙',
    relatedBodies: ['earth', 'luna'],
    significance: 'First Moon landing since 1972',
  },
  {
    id: 'europa_clipper_arrival',
    name: 'Europa Clipper Arrives',
    date: new Date('2030-04-01'),
    description: 'NASA spacecraft enters Jupiter orbit to study Europa',
    category: 'mission',
    emoji: '🧊',
    relatedBodies: ['jupiter', 'europa'],
    significance: 'Detailed study of Europa\'s habitability',
  },
  {
    id: 'mars_human_2030s',
    name: 'First Humans on Mars',
    date: new Date('2035-01-01'),
    description: 'Projected first crewed Mars mission',
    category: 'human',
    emoji: '🔴',
    relatedBodies: ['mars'],
    significance: 'Humanity becomes a multi-planetary species',
  },
  {
    id: 'total_eclipse_2024',
    name: 'Great North American Eclipse',
    date: new Date('2024-04-08'),
    description: 'Total solar eclipse visible from Mexico to Canada',
    category: 'celestial',
    emoji: '🌑',
    relatedBodies: ['earth', 'luna'],
    significance: 'Next major total solar eclipse over North America',
  },
  {
    id: 'halley_2061',
    name: 'Halley\'s Comet Returns',
    date: new Date('2061-07-28'),
    description: 'Halley\'s Comet makes its next perihelion passage',
    category: 'celestial',
    emoji: '☄️',
    relatedBodies: [],
    significance: 'The famous comet returns after 75-76 years',
  },
];

export const getAllEvents = (): HistoricalEvent[] => {
  return [...HISTORICAL_EVENTS, ...FUTURE_EVENTS].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );
};
