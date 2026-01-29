// =============================================================================
// GUIDED TOURS DATA
// =============================================================================

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TourWaypoint {
  bodyId: string;
  title: string;
  narration: string;
  duration: number; // seconds to spend here
  cameraOffset?: [number, number, number];
  highlight?: string; // specific feature to highlight
  quizQuestion?: QuizQuestion;
}

export interface Tour {
  id: string;
  name: string;
  emoji: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string; // estimated time
  waypoints: TourWaypoint[];
  category: 'exploration' | 'science' | 'comparison' | 'history';
}

export const TOURS: Tour[] = [
  // TOUR 1: Inner Planets Journey
  {
    id: 'inner-planets',
    name: 'The Inner Planets',
    emoji: '🪨',
    description: 'Explore the four rocky worlds closest to the Sun',
    difficulty: 'beginner',
    duration: '5 minutes',
    category: 'exploration',
    waypoints: [
      {
        bodyId: 'sun',
        title: 'Our Star - The Sun',
        narration: "Welcome! Our journey begins at the Sun, the heart of our solar system. This massive ball of hydrogen and helium provides the light and heat that makes life on Earth possible. It contains 99.86% of all mass in the solar system!",
        duration: 15,
      },
      {
        bodyId: 'mercury',
        title: 'Mercury - The Swift Planet',
        narration: "First stop: Mercury! This tiny world races around the Sun faster than any other planet - completing an orbit in just 88 Earth days. Despite being closest to the Sun, it's NOT the hottest planet. That honor goes to Venus!",
        duration: 15,
        quizQuestion: {
          question: "How long does it take Mercury to orbit the Sun?",
          options: ["30 days", "88 days", "365 days", "687 days"],
          correctIndex: 1,
          explanation: "Mercury orbits the Sun in just 88 Earth days - that's why it's named after the swift Roman messenger god!",
        },
      },
      {
        bodyId: 'venus',
        title: 'Venus - Earth\'s Evil Twin',
        narration: "Venus is almost the same size as Earth, but conditions here are hellish! The thick atmosphere traps heat, making Venus the hottest planet at 462°C. It also rotates backwards - the Sun rises in the west here!",
        duration: 15,
        quizQuestion: {
          question: "Why is Venus hotter than Mercury?",
          options: ["It's closer to the Sun", "Thick atmosphere traps heat", "It has active volcanoes", "It's larger"],
          correctIndex: 1,
          explanation: "Venus's thick CO2 atmosphere creates an extreme greenhouse effect, trapping heat and making it the hottest planet!",
        },
      },
      {
        bodyId: 'earth',
        title: 'Earth - Our Home',
        narration: "Home sweet home! Earth is the only planet known to harbor life, with liquid water on its surface and a protective magnetic field. Our Moon stabilizes Earth's tilt, giving us predictable seasons.",
        duration: 15,
      },
      {
        bodyId: 'mars',
        title: 'Mars - The Red Planet',
        narration: "Mars has captured human imagination for centuries. With the largest volcano (Olympus Mons) and longest canyon (Valles Marineris) in the solar system, it's a world of extremes. One day, humans may call this planet home!",
        duration: 15,
        quizQuestion: {
          question: "What gives Mars its red color?",
          options: ["Hot lava", "Iron oxide (rust)", "Red plants", "Atmospheric gases"],
          correctIndex: 1,
          explanation: "Mars is red because its surface is covered in iron oxide - the same compound that makes rust red on Earth!",
        },
      },
    ],
  },

  // TOUR 2: Gas Giants Adventure
  {
    id: 'gas-giants',
    name: 'Giants of the Solar System',
    emoji: '🟠',
    description: 'Visit the massive gas giants Jupiter and Saturn',
    difficulty: 'beginner',
    duration: '6 minutes',
    category: 'exploration',
    waypoints: [
      {
        bodyId: 'jupiter',
        title: 'Jupiter - King of Planets',
        narration: "Behold Jupiter, the largest planet! It's so massive that 1,321 Earths could fit inside it. The Great Red Spot is a storm that has been raging for over 400 years - it's bigger than Earth itself!",
        duration: 20,
        quizQuestion: {
          question: "How many Earths could fit inside Jupiter?",
          options: ["100", "500", "1,321", "10,000"],
          correctIndex: 2,
          explanation: "Jupiter is so massive that 1,321 Earths could fit inside it by volume!",
        },
      },
      {
        bodyId: 'io',
        title: 'Io - The Volcanic Moon',
        narration: "Io is the most volcanically active body in the solar system! Jupiter's immense gravity creates tidal forces that heat Io's interior, causing over 400 active volcanoes to constantly reshape its surface.",
        duration: 15,
      },
      {
        bodyId: 'europa',
        title: 'Europa - Ocean World',
        narration: "Beneath Europa's icy shell lies a global ocean containing more water than all of Earth's oceans combined! Scientists believe this ocean, warmed by tidal heating, could potentially harbor life.",
        duration: 15,
        quizQuestion: {
          question: "What makes Europa interesting for finding life?",
          options: ["Thick atmosphere", "Warm surface", "Subsurface ocean", "Earth-like gravity"],
          correctIndex: 2,
          explanation: "Europa has a liquid water ocean beneath its ice shell - water is essential for life as we know it!",
        },
      },
      {
        bodyId: 'saturn',
        title: 'Saturn - The Ringed Wonder',
        narration: "Saturn's magnificent rings are made of billions of ice and rock particles, ranging from tiny grains to house-sized chunks. The rings span 282,000 km but are only about 10 meters thick!",
        duration: 20,
      },
      {
        bodyId: 'titan',
        title: 'Titan - A World with Weather',
        narration: "Titan is the only moon with a thick atmosphere and the only place besides Earth with lakes and seas on its surface. But these aren't water - they're liquid methane and ethane!",
        duration: 15,
        quizQuestion: {
          question: "What fills the lakes on Titan?",
          options: ["Water", "Lava", "Liquid methane", "Mercury"],
          correctIndex: 2,
          explanation: "Titan's lakes are filled with liquid methane and ethane - it's so cold that these gases exist as liquids!",
        },
      },
      {
        bodyId: 'enceladus',
        title: 'Enceladus - The Geyser Moon',
        narration: "This tiny moon shoots geysers of water ice into space from cracks at its south pole! These plumes contain organic molecules - possible ingredients for life. Enceladus is a top candidate in the search for extraterrestrial life.",
        duration: 15,
      },
    ],
  },

  // TOUR 3: Ice Giants Expedition
  {
    id: 'ice-giants',
    name: 'The Ice Giants',
    emoji: '🧊',
    description: 'Journey to the distant ice giants Uranus and Neptune',
    difficulty: 'intermediate',
    duration: '5 minutes',
    category: 'exploration',
    waypoints: [
      {
        bodyId: 'uranus',
        title: 'Uranus - The Sideways Planet',
        narration: "Uranus is unique - it rotates on its side! Scientists think a massive collision billions of years ago knocked it over. This means its seasons last 21 Earth years each, with extreme periods of constant daylight or darkness at the poles.",
        duration: 20,
        quizQuestion: {
          question: "What's unusual about Uranus's rotation?",
          options: ["It doesn't rotate", "It rotates sideways", "It rotates backwards", "It rotates twice as fast"],
          correctIndex: 1,
          explanation: "Uranus is tilted 97.77° - it essentially rotates on its side, possibly due to an ancient collision!",
        },
      },
      {
        bodyId: 'miranda',
        title: 'Miranda - A Patchwork Moon',
        narration: "Miranda has the tallest cliff in the solar system - Verona Rupes, at 20 km high! Its bizarre patchwork surface suggests it may have been shattered by impacts and reassembled multiple times.",
        duration: 15,
      },
      {
        bodyId: 'neptune',
        title: 'Neptune - The Windy World',
        narration: "Neptune has the strongest winds in the solar system, reaching 2,100 km/h! Despite being so far from the Sun, Neptune radiates more heat than it receives. It was the first planet discovered by mathematical prediction rather than observation.",
        duration: 20,
        quizQuestion: {
          question: "How was Neptune discovered?",
          options: ["Telescope observation", "Mathematical prediction", "Ancient records", "Spacecraft"],
          correctIndex: 1,
          explanation: "Scientists noticed Uranus wasn't where it should be, calculated where a hidden planet must be, and found Neptune there!",
        },
      },
      {
        bodyId: 'triton',
        title: 'Triton - The Captured Moon',
        narration: "Triton orbits Neptune backwards - it's the only large moon to do this! Scientists believe it was captured from the Kuiper Belt. Nitrogen geysers shoot 8 km high, and it's slowly spiraling toward Neptune - in millions of years, it will be destroyed or form rings.",
        duration: 15,
      },
    ],
  },

  // TOUR 4: Water Worlds
  {
    id: 'water-worlds',
    name: 'Water in the Solar System',
    emoji: '💧',
    description: 'Discover where water exists beyond Earth',
    difficulty: 'intermediate',
    duration: '6 minutes',
    category: 'science',
    waypoints: [
      {
        bodyId: 'earth',
        title: 'Earth - The Blue Planet',
        narration: "Earth is the only planet with liquid water on its surface - covering 71% of our world. But Earth doesn't have the most water in the solar system! Let's explore where else water hides...",
        duration: 15,
      },
      {
        bodyId: 'europa',
        title: 'Europa - Hidden Ocean',
        narration: "Beneath Europa's 15-25 km thick ice shell lies a global ocean containing 2-3 times more water than all of Earth's oceans! Tidal heating from Jupiter keeps this water liquid, and there may be hydrothermal vents on the ocean floor.",
        duration: 20,
        quizQuestion: {
          question: "How much water does Europa have compared to Earth?",
          options: ["Less than Earth", "About the same", "2-3 times more", "100 times more"],
          correctIndex: 2,
          explanation: "Europa's subsurface ocean contains 2-3 times more water than all of Earth's oceans combined!",
        },
      },
      {
        bodyId: 'enceladus',
        title: 'Enceladus - Water Geysers',
        narration: "We know Enceladus has water because we've flown through its geysers! The Cassini spacecraft detected water ice, salt, and organic molecules in the plumes shooting from the moon's south pole.",
        duration: 15,
      },
      {
        bodyId: 'ganymede',
        title: 'Ganymede - Layered Ocean',
        narration: "The largest moon in the solar system may have multiple ocean layers sandwiched between ice layers - like a giant cosmic ice cream sandwich! It could have more water than Europa, though it's harder to access.",
        duration: 15,
      },
      {
        bodyId: 'mars',
        title: 'Mars - Ancient Water',
        narration: "Mars once had rivers, lakes, and possibly an ocean! Today, water exists as ice at the poles and possibly in underground aquifers. Finding this water is crucial for future human missions.",
        duration: 15,
        quizQuestion: {
          question: "Where is water found on Mars today?",
          options: ["In rivers", "As liquid lakes", "As polar ice caps", "On the surface everywhere"],
          correctIndex: 2,
          explanation: "Mars has water ice at its polar caps and possibly underground. Ancient Mars had liquid water on its surface!",
        },
      },
      {
        bodyId: 'titan',
        title: 'Titan - Liquid Methane',
        narration: "Titan has liquid on its surface, but it's not water - it's liquid methane and ethane! The lakes and seas of Titan function much like Earth's water cycle, with methane rain, rivers, and seas.",
        duration: 15,
      },
    ],
  },

  // TOUR 5: Extreme Weather
  {
    id: 'extreme-weather',
    name: 'Extreme Space Weather',
    emoji: '🌪️',
    description: 'Experience the most extreme weather in the solar system',
    difficulty: 'intermediate',
    duration: '5 minutes',
    category: 'science',
    waypoints: [
      {
        bodyId: 'venus',
        title: 'Venus - Acid Rain',
        narration: "Venus has clouds made of sulfuric acid! The atmosphere is so thick it creates 92 times Earth's surface pressure, and lightning storms rage constantly in the upper clouds.",
        duration: 15,
      },
      {
        bodyId: 'jupiter',
        title: 'Jupiter - The Great Red Spot',
        narration: "This is the largest storm in the solar system - a hurricane that could swallow Earth whole! It's been raging for at least 400 years, with winds reaching 644 km/h at its edges.",
        duration: 20,
        quizQuestion: {
          question: "How long has the Great Red Spot existed?",
          options: ["40 years", "400 years", "4,000 years", "400,000 years"],
          correctIndex: 1,
          explanation: "The Great Red Spot has been observed for over 400 years - it was already there when humans first pointed telescopes at Jupiter!",
        },
      },
      {
        bodyId: 'saturn',
        title: 'Saturn - Hexagonal Storm',
        narration: "Saturn's north pole has a giant hexagonal storm 30,000 km across - wider than Earth! This unusual six-sided pattern is caused by jet streams, and scientists are still studying why it forms this shape.",
        duration: 15,
      },
      {
        bodyId: 'neptune',
        title: 'Neptune - Fastest Winds',
        narration: "Neptune holds the record for the fastest winds in the solar system - up to 2,100 km/h! That's supersonic! Despite being so far from the Sun, Neptune's atmosphere is incredibly dynamic.",
        duration: 15,
        quizQuestion: {
          question: "How fast are the winds on Neptune?",
          options: ["200 km/h", "800 km/h", "2,100 km/h", "5,000 km/h"],
          correctIndex: 2,
          explanation: "Neptune has winds reaching 2,100 km/h - that's about 6 times faster than Earth's strongest tornadoes!",
        },
      },
      {
        bodyId: 'mars',
        title: 'Mars - Global Dust Storms',
        narration: "Mars experiences dust storms that can engulf the entire planet for months! These global events block sunlight and have ended the missions of both Spirit and Opportunity rovers.",
        duration: 15,
      },
    ],
  },
];

// Helper functions
export const getTourById = (id: string): Tour | undefined => {
  return TOURS.find(t => t.id === id);
};

export const getToursByDifficulty = (difficulty: Tour['difficulty']): Tour[] => {
  return TOURS.filter(t => t.difficulty === difficulty);
};

export const getToursByCategory = (category: Tour['category']): Tour[] => {
  return TOURS.filter(t => t.category === category);
};

export const getTotalWaypoints = (tour: Tour): number => {
  return tour.waypoints.length;
};

export const getQuizQuestions = (tour: Tour): QuizQuestion[] => {
  return tour.waypoints
    .filter(w => w.quizQuestion)
    .map(w => w.quizQuestion!);
};
