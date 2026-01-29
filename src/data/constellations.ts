export interface Star {
  name: string;
  x: number;
  y: number;
  z: number;
  magnitude: number; // apparent magnitude (lower = brighter)
  spectralClass?: string;
  distanceLY?: number; // light years from Earth
}

export interface ConstellationData {
  id: string;
  name: string;
  latinName: string;
  abbreviation: string;
  stars: Star[];
  lines: [number, number][]; // indices of stars to connect
  area: number; // square degrees
  quadrant: string;
  brightestStar: string;
  notableObjects: string[];
  mythology: string;
  history: string;
  bestViewing: {
    months: string[];
    hemisphere: 'Northern' | 'Southern' | 'Both';
    latitudes: string;
  };
  funFact: string;
  emoji: string;
  color: string;
}

// Helper to create star positions on a celestial sphere
// RA in hours (0-24), Dec in degrees (-90 to +90)
const createStar = (
  name: string,
  ra: number,
  dec: number,
  magnitude: number,
  spectralClass?: string,
  distanceLY?: number,
  radius: number = 200
): Star => {
  const raRad = (ra / 24) * Math.PI * 2;
  const decRad = (dec / 180) * Math.PI;

  return {
    name,
    x: radius * Math.cos(decRad) * Math.cos(raRad),
    y: radius * Math.sin(decRad),
    z: radius * Math.cos(decRad) * Math.sin(raRad),
    magnitude,
    spectralClass,
    distanceLY,
  };
};

export const constellationsData: ConstellationData[] = [
  // MAJOR NORTHERN CONSTELLATIONS
  {
    id: "ursa-major",
    name: "Ursa Major",
    latinName: "The Great Bear",
    abbreviation: "UMa",
    stars: [
      createStar("Dubhe", 11.06, 61.75, 1.79, "K0III", 123),
      createStar("Merak", 11.03, 56.38, 2.37, "A1V", 79),
      createStar("Phecda", 11.90, 53.69, 2.44, "A0V", 84),
      createStar("Megrez", 12.26, 57.03, 3.31, "A3V", 81),
      createStar("Alioth", 12.90, 55.96, 1.77, "A1III-IVp", 81),
      createStar("Mizar", 13.40, 54.93, 2.27, "A2V", 78),
      createStar("Alkaid", 13.79, 49.31, 1.86, "B3V", 104),
      createStar("Muscida", 8.50, 60.72, 3.35, "G4II-III", 184),
      createStar("Talitha", 8.99, 48.04, 3.14, "A7V", 48),
      createStar("Tania Borealis", 10.28, 42.91, 3.45, "A7IV", 140),
      createStar("Tania Australis", 10.37, 41.50, 3.06, "M0III", 249),
      createStar("Alula Borealis", 11.18, 33.09, 3.49, "K3III", 399),
      createStar("Alula Australis", 11.31, 31.53, 3.79, "G1V", 30),
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [0, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12]],
    area: 1280,
    quadrant: "NQ2",
    brightestStar: "Alioth",
    notableObjects: [
      "M81 (Bode's Galaxy)",
      "M82 (Cigar Galaxy)",
      "M101 (Pinwheel Galaxy)",
      "M97 (Owl Nebula)",
      "Mizar-Alcor double star system"
    ],
    mythology: "In Greek mythology, Ursa Major represents Callisto, a nymph who was transformed into a bear by Zeus's jealous wife Hera. Zeus later placed her among the stars to protect her.",
    history: "One of the 48 constellations listed by the 2nd-century astronomer Ptolemy. The Big Dipper asterism within it has been recognized by virtually every culture throughout history.",
    bestViewing: {
      months: ["March", "April", "May"],
      hemisphere: "Northern",
      latitudes: "+90° to -30°"
    },
    funFact: "The Big Dipper's pointer stars (Dubhe and Merak) point directly to Polaris, the North Star. This navigation technique has been used by sailors and travelers for thousands of years.",
    emoji: "🐻",
    color: "#48DBFB",
  },
  {
    id: "ursa-minor",
    name: "Ursa Minor",
    latinName: "The Little Bear",
    abbreviation: "UMi",
    stars: [
      createStar("Polaris", 2.53, 89.26, 1.98, "F7Ib", 433),
      createStar("Kochab", 14.85, 74.16, 2.08, "K4III", 131),
      createStar("Pherkad", 15.35, 71.83, 3.05, "A3II-III", 487),
      createStar("Yildun", 17.54, 86.59, 4.36, "A1V", 183),
      createStar("Urodelus", 16.29, 75.76, 4.23, "K4III", 376),
      createStar("Ahfa al Farkadain", 15.73, 77.79, 4.25, "A3V", 97),
      createStar("Anwar al Farkadain", 15.49, 75.08, 4.95, "A3V", 347),
    ],
    lines: [[0, 3], [3, 4], [4, 5], [5, 6], [6, 1], [1, 2]],
    area: 256,
    quadrant: "NQ3",
    brightestStar: "Polaris",
    notableObjects: [
      "Polaris (North Star)",
      "Polarissima Borealis (closest star to celestial pole)"
    ],
    mythology: "Represents Arcas, the son of Callisto and Zeus, who was also transformed into a bear. Together with his mother (Ursa Major), they circle the celestial pole eternally.",
    history: "The constellation has been essential for navigation since ancient times. Polaris wasn't always the pole star - Earth's axial precession means different stars hold this position over a 26,000-year cycle.",
    bestViewing: {
      months: ["June", "July", "August"],
      hemisphere: "Northern",
      latitudes: "+90° to -10°"
    },
    funFact: "Polaris is actually a triple star system, and it's a Cepheid variable star that pulsates. It's currently 433 light-years away and will be closest to true north around 2100 CE.",
    emoji: "⭐",
    color: "#FFD700",
  },
  {
    id: "orion",
    name: "Orion",
    latinName: "The Hunter",
    abbreviation: "Ori",
    stars: [
      createStar("Betelgeuse", 5.92, 7.41, 0.42, "M1-2Ia-ab", 700),
      createStar("Rigel", 5.24, -8.20, 0.13, "B8Ia", 860),
      createStar("Bellatrix", 5.42, 6.35, 1.64, "B2III", 250),
      createStar("Mintaka", 5.53, -0.30, 2.23, "O9.5II", 1200),
      createStar("Alnilam", 5.60, -1.20, 1.69, "B0Ia", 2000),
      createStar("Alnitak", 5.68, -1.94, 1.77, "O9.5Ib", 1260),
      createStar("Saiph", 5.80, -9.67, 2.09, "B0.5Ia", 720),
      createStar("Meissa", 5.59, 9.93, 3.33, "O8III", 1100),
      createStar("Tabit", 4.83, 6.96, 3.16, "F6V", 26),
    ],
    lines: [[0, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1], [1, 5], [2, 7], [0, 7]],
    area: 594,
    quadrant: "NQ1",
    brightestStar: "Rigel",
    notableObjects: [
      "M42 (Orion Nebula) - stellar nursery",
      "M43 (De Mairan's Nebula)",
      "Horsehead Nebula (IC 434)",
      "Barnard's Loop",
      "M78 (reflection nebula)",
      "Orion's Belt asterism"
    ],
    mythology: "Orion was a giant huntsman in Greek mythology. He boasted he would kill every animal on Earth, prompting Gaia to send a scorpion to kill him. Both were placed in opposite ends of the sky.",
    history: "One of the most recognizable constellations, known to virtually every ancient culture. The Egyptians associated it with Osiris, and the three belt stars aligned with the pyramids of Giza.",
    bestViewing: {
      months: ["December", "January", "February"],
      hemisphere: "Both",
      latitudes: "+85° to -75°"
    },
    funFact: "Betelgeuse is a red supergiant so large that if it replaced our Sun, it would extend past the orbit of Jupiter. It's expected to explode as a supernova within the next 100,000 years!",
    emoji: "🏹",
    color: "#FF6B6B",
  },
  {
    id: "cassiopeia",
    name: "Cassiopeia",
    latinName: "The Queen",
    abbreviation: "Cas",
    stars: [
      createStar("Schedar", 0.68, 56.54, 2.24, "K0IIIa", 228),
      createStar("Caph", 0.15, 59.15, 2.28, "F2III", 54),
      createStar("Gamma Cassiopeiae", 0.95, 60.72, 2.47, "B0IVe", 550),
      createStar("Ruchbah", 1.43, 60.24, 2.68, "A5III-IV", 99),
      createStar("Segin", 1.91, 63.67, 3.37, "B3III", 440),
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
    area: 598,
    quadrant: "NQ1",
    brightestStar: "Schedar",
    notableObjects: [
      "M52 (open cluster)",
      "M103 (open cluster)",
      "NGC 457 (Owl Cluster/ET Cluster)",
      "NGC 7789 (Caroline's Rose)",
      "Tycho's Supernova remnant (SN 1572)",
      "Cassiopeia A (supernova remnant)"
    ],
    mythology: "Queen Cassiopeia boasted her beauty surpassed the sea nymphs. As punishment, Poseidon sent a sea monster to ravage her kingdom. She was placed in the sky, sometimes upside down as humiliation.",
    history: "In 1572, Tycho Brahe observed a supernova in Cassiopeia (SN 1572), proving that the heavens could change - revolutionary for astronomy. Cassiopeia A is now the strongest radio source in the sky.",
    bestViewing: {
      months: ["September", "October", "November"],
      hemisphere: "Northern",
      latitudes: "+90° to -20°"
    },
    funFact: "Cassiopeia's distinctive W (or M) shape never sets below the horizon in the Northern Hemisphere. The constellation is circumpolar and can be seen year-round from northern latitudes.",
    emoji: "👑",
    color: "#A55EEA",
  },
  {
    id: "cygnus",
    name: "Cygnus",
    latinName: "The Swan",
    abbreviation: "Cyg",
    stars: [
      createStar("Deneb", 20.69, 45.28, 1.25, "A2Ia", 2615),
      createStar("Albireo", 19.51, 27.96, 3.18, "K3II", 430),
      createStar("Sadr", 20.37, 40.26, 2.20, "F8Ib", 1800),
      createStar("Gienah", 20.77, 33.97, 2.46, "K0III", 72),
      createStar("Delta Cygni", 19.75, 45.13, 2.87, "B9.5III", 165),
      createStar("Zeta Cygni", 21.22, 30.23, 3.21, "G8III", 151),
    ],
    lines: [[0, 2], [2, 1], [2, 3], [2, 4], [3, 5]],
    area: 804,
    quadrant: "NQ4",
    brightestStar: "Deneb",
    notableObjects: [
      "Cygnus X-1 (first confirmed black hole)",
      "NGC 7000 (North America Nebula)",
      "IC 5070 (Pelican Nebula)",
      "M29 (open cluster)",
      "M39 (open cluster)",
      "Veil Nebula (supernova remnant)",
      "Albireo double star (gold and blue)"
    ],
    mythology: "Multiple myths: Zeus disguised as a swan to seduce Leda, or Orpheus transformed into a swan and placed beside his lyre (Lyra constellation) after death.",
    history: "Contains Cygnus X-1, identified in 1964 and the first widely accepted black hole candidate. Also contains Kepler's field of view, where the Kepler space telescope discovered thousands of exoplanets.",
    bestViewing: {
      months: ["July", "August", "September"],
      hemisphere: "Northern",
      latitudes: "+90° to -40°"
    },
    funFact: "If Deneb were as close to us as Sirius (8.6 ly), it would shine as bright as a half Moon and cast shadows at night! It's one of the most luminous stars visible to the naked eye.",
    emoji: "🦢",
    color: "#54A0FF",
  },
  {
    id: "lyra",
    name: "Lyra",
    latinName: "The Lyre",
    abbreviation: "Lyr",
    stars: [
      createStar("Vega", 18.62, 38.78, 0.03, "A0V", 25),
      createStar("Sheliak", 18.83, 33.36, 3.52, "A8V", 882),
      createStar("Sulafat", 18.98, 32.69, 3.24, "B9III", 620),
      createStar("Delta2 Lyrae", 18.91, 36.90, 4.30, "M4II", 740),
      createStar("Zeta1 Lyrae", 18.75, 37.61, 4.34, "Am", 156),
    ],
    lines: [[0, 1], [0, 4], [1, 2], [2, 3], [3, 4]],
    area: 286,
    quadrant: "NQ4",
    brightestStar: "Vega",
    notableObjects: [
      "M57 (Ring Nebula) - planetary nebula",
      "Vega - once the North Star, will be again in 12,000 years",
      "Epsilon Lyrae (Double Double star)",
      "RR Lyrae variable star prototype"
    ],
    mythology: "Represents the lyre of Orpheus, the legendary musician whose music could charm all living things. After his death, Zeus placed his lyre among the stars.",
    history: "Vega was the first star (other than the Sun) to be photographed (1850) and have its spectrum recorded (1872). It was the northern pole star around 12,000 BCE and will be again around 13,727 CE.",
    bestViewing: {
      months: ["July", "August", "September"],
      hemisphere: "Northern",
      latitudes: "+90° to -40°"
    },
    funFact: "Vega was used as the baseline for defining magnitude 0 in the photometric system. It's also spinning so fast (274 km/s at equator) that it's noticeably flattened at the poles!",
    emoji: "🎵",
    color: "#5CD859",
  },
  {
    id: "draco",
    name: "Draco",
    latinName: "The Dragon",
    abbreviation: "Dra",
    stars: [
      createStar("Eltanin", 17.94, 51.49, 2.23, "K5III", 154),
      createStar("Rastaban", 17.51, 52.30, 2.79, "G2II", 380),
      createStar("Grumium", 17.89, 56.87, 3.75, "K5III", 112),
      createStar("Altais", 19.21, 67.66, 3.07, "G9III", 97),
      createStar("Aldibain", 17.15, 65.71, 3.29, "G8III", 92),
      createStar("Thuban", 14.07, 64.38, 3.67, "A0III", 303),
      createStar("Edasich", 15.42, 58.97, 3.29, "K2III", 102),
      createStar("Giausar", 11.52, 69.33, 3.84, "M0III", 333),
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
    area: 1083,
    quadrant: "NQ3",
    brightestStar: "Eltanin",
    notableObjects: [
      "NGC 6543 (Cat's Eye Nebula)",
      "Thuban - ancient pole star when pyramids were built",
      "Draco Dwarf Galaxy",
      "Kepler-10 system (first confirmed rocky exoplanet)"
    ],
    mythology: "Several myths: Ladon, the dragon guarding the golden apples in the Garden of the Hesperides, killed by Hercules. Or the dragon killed by Cadmus before founding Thebes.",
    history: "Thuban (Alpha Draconis) was the pole star when the Egyptian pyramids were built (around 2700 BCE). The descending passage of the Great Pyramid points directly to where Thuban was located.",
    bestViewing: {
      months: ["May", "June", "July"],
      hemisphere: "Northern",
      latitudes: "+90° to -15°"
    },
    funFact: "The Cat's Eye Nebula (NGC 6543) in Draco was one of the first planetary nebulae discovered and has one of the most complex structures known, with jets, knots, and bubble-like structures.",
    emoji: "🐉",
    color: "#FF9F43",
  },
  {
    id: "perseus",
    name: "Perseus",
    latinName: "The Hero",
    abbreviation: "Per",
    stars: [
      createStar("Mirfak", 3.41, 49.86, 1.79, "F5Ib", 592),
      createStar("Algol", 3.14, 40.96, 2.12, "B8V", 93),
      createStar("Atik", 3.96, 40.01, 2.85, "O7.5III", 1331),
      createStar("Menkib", 3.72, 35.79, 3.77, "O7.5III", 1331),
      createStar("Delta Persei", 3.72, 47.79, 3.01, "B5III", 528),
      createStar("Epsilon Persei", 3.96, 40.01, 2.89, "B1V", 640),
    ],
    lines: [[0, 1], [0, 4], [1, 2], [2, 3], [4, 5]],
    area: 615,
    quadrant: "NQ1",
    brightestStar: "Mirfak",
    notableObjects: [
      "Algol (Demon Star) - famous eclipsing binary",
      "M34 (open cluster)",
      "NGC 869 & NGC 884 (Double Cluster)",
      "California Nebula (NGC 1499)",
      "Perseus Molecular Cloud",
      "Radiant of Perseid meteor shower"
    ],
    mythology: "The hero Perseus who slew Medusa and rescued Andromeda from the sea monster Cetus. He's depicted holding Medusa's severed head (marked by the star Algol).",
    history: "Algol was called the 'Demon Star' by ancient Arabs (Ra's al-Ghul = 'head of the demon'). Its regular dimming every 2.87 days was first explained as an eclipsing binary in 1783.",
    bestViewing: {
      months: ["November", "December", "January"],
      hemisphere: "Northern",
      latitudes: "+90° to -35°"
    },
    funFact: "The Perseid meteor shower (mid-August) appears to radiate from Perseus. It's caused by Earth passing through debris from Comet Swift-Tuttle and can produce up to 100 meteors per hour!",
    emoji: "⚔️",
    color: "#FECA57",
  },
  {
    id: "andromeda",
    name: "Andromeda",
    latinName: "The Chained Princess",
    abbreviation: "And",
    stars: [
      createStar("Alpheratz", 0.14, 29.09, 2.06, "B8IVpMnHg", 97),
      createStar("Mirach", 1.16, 35.62, 2.05, "M0III", 199),
      createStar("Almach", 2.07, 42.33, 2.26, "K3IIb", 355),
      createStar("Delta Andromedae", 0.66, 30.86, 3.27, "K3III", 101),
    ],
    lines: [[0, 1], [1, 2], [0, 3]],
    area: 722,
    quadrant: "NQ1",
    brightestStar: "Alpheratz",
    notableObjects: [
      "M31 (Andromeda Galaxy) - nearest major galaxy",
      "M32 (satellite galaxy of M31)",
      "M110 (satellite galaxy of M31)",
      "NGC 7662 (Blue Snowball Nebula)",
      "Almach - beautiful triple star system"
    ],
    mythology: "Princess Andromeda was chained to a rock as sacrifice to the sea monster Cetus, punishment for her mother Cassiopeia's vanity. She was rescued by Perseus and became his wife.",
    history: "The Andromeda Galaxy (M31) was long thought to be a nebula within our galaxy. In 1923, Edwin Hubble proved it was a separate galaxy, revolutionizing our understanding of the universe's scale.",
    bestViewing: {
      months: ["October", "November", "December"],
      hemisphere: "Northern",
      latitudes: "+90° to -40°"
    },
    funFact: "The Andromeda Galaxy is approaching us at 110 km/s and will collide with the Milky Way in about 4.5 billion years. The two galaxies will eventually merge into a single giant elliptical galaxy!",
    emoji: "🌌",
    color: "#A55EEA",
  },
  {
    id: "leo",
    name: "Leo",
    latinName: "The Lion",
    abbreviation: "Leo",
    stars: [
      createStar("Regulus", 10.14, 11.97, 1.40, "B8IVn", 79),
      createStar("Denebola", 11.82, 14.57, 2.14, "A3V", 36),
      createStar("Algieba", 10.33, 19.84, 2.08, "K0III", 130),
      createStar("Zosma", 11.24, 20.52, 2.56, "A4V", 58),
      createStar("Ras Elased Australis", 9.76, 23.77, 2.98, "G1II", 247),
      createStar("Adhafera", 10.28, 23.42, 3.44, "F0III", 274),
      createStar("Chertan", 11.24, 15.43, 3.33, "A2V", 165),
    ],
    lines: [[0, 2], [2, 3], [3, 1], [2, 4], [4, 5], [0, 6], [6, 1]],
    area: 947,
    quadrant: "NQ2",
    brightestStar: "Regulus",
    notableObjects: [
      "M65 (spiral galaxy - Leo Triplet)",
      "M66 (spiral galaxy - Leo Triplet)",
      "NGC 3628 (Hamburger Galaxy - Leo Triplet)",
      "M95, M96, M105 (galaxies)",
      "Leo I and Leo II (dwarf galaxies)",
      "Radiant of Leonid meteor shower"
    ],
    mythology: "The Nemean Lion, a fierce beast with impenetrable fur killed by Hercules as the first of his twelve labors. He strangled it and wore its skin as armor.",
    history: "Leo is one of the oldest recognized constellations, with representations dating back to ancient Mesopotamia. The Leonid meteor shower (November) has produced spectacular storms, including 100,000+ meteors/hour in 1833.",
    bestViewing: {
      months: ["March", "April", "May"],
      hemisphere: "Both",
      latitudes: "+90° to -65°"
    },
    funFact: "Regulus is actually a quadruple star system! The main star spins so fast (317 km/s) that it completes a rotation every 16 hours and is noticeably oblate - its equator bulges outward.",
    emoji: "🦁",
    color: "#FF6B6B",
  },
  // MAJOR SOUTHERN CONSTELLATIONS
  {
    id: "scorpius",
    name: "Scorpius",
    latinName: "The Scorpion",
    abbreviation: "Sco",
    stars: [
      createStar("Antares", 16.49, -26.43, 0.96, "M1.5Iab-Ib", 550),
      createStar("Shaula", 17.56, -37.10, 1.63, "B2IV", 570),
      createStar("Sargas", 17.62, -42.99, 1.87, "F1II", 272),
      createStar("Dschubba", 16.01, -22.62, 2.32, "B0.3IV", 444),
      createStar("Larawag", 16.84, -34.29, 2.29, "K2.5III", 65),
      createStar("Wei", 16.84, -34.29, 2.29, "K2.5III", 65),
      createStar("Acrab", 16.09, -19.81, 2.62, "B1V", 404),
      createStar("Lesath", 17.53, -37.29, 2.69, "B2IV", 519),
    ],
    lines: [[6, 3], [3, 0], [0, 4], [4, 5], [5, 1], [1, 7], [7, 2]],
    area: 497,
    quadrant: "SQ3",
    brightestStar: "Antares",
    notableObjects: [
      "M4 (globular cluster - nearest to Earth)",
      "M6 (Butterfly Cluster)",
      "M7 (Ptolemy Cluster)",
      "M80 (globular cluster)",
      "NGC 6302 (Bug/Butterfly Nebula)",
      "Scorpius X-1 (first X-ray source discovered outside solar system)"
    ],
    mythology: "The scorpion sent by Gaia (or Artemis) to kill the boastful hunter Orion. They were placed on opposite sides of the sky so they would never meet again.",
    history: "Contains Scorpius X-1, discovered in 1962 as the first cosmic X-ray source outside the solar system. Antares was used by ancient Persians as one of the four 'Royal Stars' marking the seasons.",
    bestViewing: {
      months: ["June", "July", "August"],
      hemisphere: "Southern",
      latitudes: "+40° to -90°"
    },
    funFact: "Antares means 'rival of Mars' because its red color resembles Mars. If Antares replaced our Sun, its surface would extend beyond the orbit of Mars, possibly reaching Jupiter!",
    emoji: "🦂",
    color: "#FF4444",
  },
  {
    id: "centaurus",
    name: "Centaurus",
    latinName: "The Centaur",
    abbreviation: "Cen",
    stars: [
      createStar("Rigil Kentaurus", 14.66, -60.84, -0.27, "G2V", 4.37),
      createStar("Hadar", 14.06, -60.37, 0.61, "B1III", 390),
      createStar("Menkent", 14.11, -36.37, 2.06, "K0III", 61),
      createStar("Muhlifain", 12.69, -48.96, 2.17, "A1V", 130),
      createStar("Epsilon Centauri", 13.67, -53.47, 2.30, "B1III", 376),
    ],
    lines: [[0, 1], [1, 4], [4, 3], [3, 2]],
    area: 1060,
    quadrant: "SQ3",
    brightestStar: "Alpha Centauri",
    notableObjects: [
      "Alpha Centauri system (nearest star system at 4.37 ly)",
      "Proxima Centauri (nearest individual star)",
      "Omega Centauri (largest globular cluster visible from Earth)",
      "Centaurus A (NGC 5128 - peculiar galaxy with jets)",
      "NGC 3918 (Blue Planetary Nebula)"
    ],
    mythology: "Represents Chiron, the wise and kind centaur who tutored heroes like Achilles, Jason, and Hercules. Unlike other savage centaurs, he was known for his knowledge of medicine and music.",
    history: "Contains the nearest star system to our Sun - Alpha Centauri (including Proxima Centauri at 4.24 light-years). Proxima Centauri b, an Earth-sized exoplanet in the habitable zone, was discovered in 2016.",
    bestViewing: {
      months: ["April", "May", "June"],
      hemisphere: "Southern",
      latitudes: "+25° to -90°"
    },
    funFact: "Alpha Centauri A and B orbit each other every 80 years, while Proxima Centauri orbits them both at a distance of 0.24 light-years, taking 550,000 years to complete one orbit!",
    emoji: "🐴",
    color: "#5CD859",
  },
  {
    id: "crux",
    name: "Crux",
    latinName: "The Southern Cross",
    abbreviation: "Cru",
    stars: [
      createStar("Acrux", 12.44, -63.10, 0.76, "B0.5IV", 320),
      createStar("Mimosa", 12.80, -59.69, 1.25, "B0.5III", 280),
      createStar("Gacrux", 12.52, -57.11, 1.63, "M3.5III", 88),
      createStar("Imai", 12.25, -58.75, 2.80, "B2IV", 360),
      createStar("Ginan", 12.35, -60.40, 3.59, "M4III", 230),
    ],
    lines: [[0, 2], [1, 3]],
    area: 68,
    quadrant: "SQ3",
    brightestStar: "Acrux",
    notableObjects: [
      "Coalsack Nebula (dark nebula near the cross)",
      "Jewel Box Cluster (NGC 4755)",
      "Acrux - actually a triple star system"
    ],
    mythology: "Not known to ancient Greeks (too far south). Indigenous Australians saw it as the head of the Emu in the sky, while Maori called it Te Punga (the anchor).",
    history: "The smallest of all 88 constellations but one of the most distinctive. It appears on the flags of Australia, New Zealand, Brazil, Papua New Guinea, and Samoa.",
    bestViewing: {
      months: ["April", "May", "June"],
      hemisphere: "Southern",
      latitudes: "+20° to -90°"
    },
    funFact: "The Southern Cross can be used for navigation - extend the long axis 4.5 times to find the South Celestial Pole. Nearby is the Coalsack, one of the most prominent dark nebulae in the sky!",
    emoji: "✝️",
    color: "#48DBFB",
  },
  {
    id: "carina",
    name: "Carina",
    latinName: "The Keel",
    abbreviation: "Car",
    stars: [
      createStar("Canopus", 6.40, -52.70, -0.74, "A9II", 310),
      createStar("Miaplacidus", 9.22, -69.72, 1.68, "A1III", 111),
      createStar("Avior", 8.38, -59.51, 1.86, "K3III", 632),
      createStar("Aspidiske", 9.28, -59.28, 2.25, "A9Ib", 690),
      createStar("Turais", 8.08, -24.30, 2.76, "K3III", 547),
    ],
    lines: [[0, 2], [2, 3], [3, 1], [0, 4]],
    area: 494,
    quadrant: "SQ2",
    brightestStar: "Canopus",
    notableObjects: [
      "Canopus (2nd brightest star in night sky)",
      "Eta Carinae (massive, unstable star)",
      "Carina Nebula (NGC 3372 - vast star-forming region)",
      "IC 2602 (Southern Pleiades)",
      "NGC 3532 (Wishing Well Cluster)"
    ],
    mythology: "Part of the ancient constellation Argo Navis (Jason's ship). Carina represents the keel of the ship that carried Jason and the Argonauts to find the Golden Fleece.",
    history: "Eta Carinae experienced a massive eruption in the 1840s called the 'Great Eruption,' briefly becoming the second-brightest star. It ejected 10-40 solar masses of material and may explode as a supernova soon.",
    bestViewing: {
      months: ["February", "March", "April"],
      hemisphere: "Southern",
      latitudes: "+20° to -90°"
    },
    funFact: "Canopus was used by NASA as a navigation reference for spacecraft. It's the brightest star within 700 light-years, about 10,000 times more luminous than our Sun!",
    emoji: "🚢",
    color: "#FFD700",
  },
  // SEASONAL CONSTELLATIONS
  {
    id: "gemini",
    name: "Gemini",
    latinName: "The Twins",
    abbreviation: "Gem",
    stars: [
      createStar("Pollux", 7.76, 28.03, 1.14, "K0IIIb", 34),
      createStar("Castor", 7.58, 31.89, 1.58, "A1V", 51),
      createStar("Alhena", 6.63, 16.40, 1.93, "A1IV", 109),
      createStar("Wasat", 7.34, 21.98, 3.53, "F0IV", 60),
      createStar("Mebsuta", 6.73, 25.13, 2.98, "G8Ib", 840),
      createStar("Mekbuda", 7.07, 20.57, 3.79, "G0Ibv", 1168),
      createStar("Propus", 6.25, 22.51, 3.31, "M3III", 380),
      createStar("Tejat", 6.38, 22.51, 2.88, "M3III", 232),
    ],
    lines: [[0, 3], [3, 2], [1, 4], [4, 7], [7, 6], [0, 1]],
    area: 514,
    quadrant: "NQ2",
    brightestStar: "Pollux",
    notableObjects: [
      "M35 (open cluster)",
      "NGC 2392 (Eskimo/Clown Nebula)",
      "Castor - sextuple star system",
      "Radiant of Geminid meteor shower",
      "Geminga (gamma-ray pulsar)"
    ],
    mythology: "Castor and Pollux were twin brothers - Castor mortal (son of a king) and Pollux immortal (son of Zeus). When Castor died, Pollux asked Zeus to let them share immortality, alternating between Olympus and Hades.",
    history: "The Geminid meteor shower in December is one of the best annual showers, producing up to 150 meteors/hour. Unlike most showers, it comes from an asteroid (3200 Phaethon), not a comet.",
    bestViewing: {
      months: ["January", "February", "March"],
      hemisphere: "Both",
      latitudes: "+90° to -60°"
    },
    funFact: "Castor appears as one star but is actually SIX stars orbiting each other! It's one of the most impressive multiple star systems known, with three binary pairs gravitationally bound together.",
    emoji: "👯",
    color: "#FECA57",
  },
  {
    id: "aquila",
    name: "Aquila",
    latinName: "The Eagle",
    abbreviation: "Aql",
    stars: [
      createStar("Altair", 19.85, 8.87, 0.76, "A7V", 17),
      createStar("Alshain", 19.92, 6.41, 3.71, "G8IV", 45),
      createStar("Tarazed", 19.77, 10.61, 2.72, "K3II", 395),
      createStar("Delta Aquilae", 19.43, 3.11, 3.36, "F0IV", 50),
      createStar("Zeta Aquilae", 19.09, 13.86, 2.99, "A0Vn", 83),
    ],
    lines: [[0, 1], [0, 2], [0, 3], [0, 4]],
    area: 652,
    quadrant: "NQ4",
    brightestStar: "Altair",
    notableObjects: [
      "Altair (one of closest visible stars)",
      "NGC 6709 (open cluster)",
      "NGC 6755 (open cluster)",
      "Nova Aquilae 1918",
      "SS 433 (unusual X-ray binary)"
    ],
    mythology: "The eagle of Zeus that carried the thunderbolts. Also associated with the eagle that carried Ganymede to Mount Olympus to be cupbearer to the gods.",
    history: "Altair was one of the first stars to have its surface directly imaged (2007). The image showed it's oblate due to rapid rotation - it spins once every 9 hours (compared to the Sun's 25 days).",
    bestViewing: {
      months: ["July", "August", "September"],
      hemisphere: "Both",
      latitudes: "+90° to -75°"
    },
    funFact: "Altair is only 17 light-years away and rotates so fast (286 km/s at equator) that its equatorial diameter is 22% larger than its polar diameter. It completes a full rotation in just 9 hours!",
    emoji: "🦅",
    color: "#54A0FF",
  },
  {
    id: "sagittarius",
    name: "Sagittarius",
    latinName: "The Archer",
    abbreviation: "Sgr",
    stars: [
      createStar("Kaus Australis", 18.40, -34.38, 1.85, "B9.5III", 143),
      createStar("Nunki", 18.92, -26.30, 2.02, "B2.5V", 228),
      createStar("Ascella", 19.04, -29.88, 2.59, "A2.5IV", 89),
      createStar("Kaus Media", 18.35, -29.83, 2.70, "K3III", 306),
      createStar("Kaus Borealis", 18.47, -25.42, 2.81, "K1III", 78),
      createStar("Alnasl", 18.10, -30.42, 2.99, "K0III", 96),
      createStar("Rukbat", 19.40, -40.62, 3.97, "B8V", 170),
    ],
    lines: [[0, 3], [3, 4], [4, 1], [1, 2], [0, 5], [2, 6]],
    area: 867,
    quadrant: "SQ4",
    brightestStar: "Kaus Australis",
    notableObjects: [
      "Sagittarius A* (supermassive black hole at galactic center)",
      "M8 (Lagoon Nebula)",
      "M20 (Trifid Nebula)",
      "M17 (Omega/Swan Nebula)",
      "M22 (globular cluster)",
      "M24 (Sagittarius Star Cloud)",
      "The Teapot asterism"
    ],
    mythology: "Often identified as the centaur Chiron, but more accurately represents Crotus, inventor of archery and son of the goat-god Pan. He's depicted aiming his arrow at Scorpius.",
    history: "Looking toward Sagittarius means looking toward the center of our Milky Way galaxy. The supermassive black hole Sagittarius A* at the galactic center was confirmed in 2020 when astronomers won the Nobel Prize for this work.",
    bestViewing: {
      months: ["July", "August", "September"],
      hemisphere: "Southern",
      latitudes: "+55° to -90°"
    },
    funFact: "The center of our galaxy lies behind the Sagittarius star clouds! Sagittarius A* is 4 million times the mass of our Sun and is about 26,000 light-years away. In 2019, we got the first image of a black hole!",
    emoji: "🏹",
    color: "#FF6B9D",
  },
];

export const getConstellationById = (id: string): ConstellationData | undefined => {
  return constellationsData.find(c => c.id === id);
};

export const getConstellationsByHemisphere = (hemisphere: 'Northern' | 'Southern' | 'Both'): ConstellationData[] => {
  return constellationsData.filter(c =>
    c.bestViewing.hemisphere === hemisphere || c.bestViewing.hemisphere === 'Both'
  );
};

export const getConstellationsByMonth = (month: string): ConstellationData[] => {
  return constellationsData.filter(c => c.bestViewing.months.includes(month));
};
