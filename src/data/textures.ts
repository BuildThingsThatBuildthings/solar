// Planet textures using accessible CDN sources
// These are NASA planetary textures available from various educational CDNs

// Using James Hastings-Trew's planetary textures (widely used, reliable)
// http://planetpixelemporium.com/planets.html (also mirrored on many CDNs)

const BASE_URL = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures';

export const textureUrls = {
  // Sun texture
  sun: `${BASE_URL}/lensflare/lensflare0.png`,

  // Planet textures from three.js examples (reliable)
  earth: `${BASE_URL}/planets/earth_atmos_2048.jpg`,
  earthNormal: `${BASE_URL}/planets/earth_normal_2048.jpg`,
  earthSpecular: `${BASE_URL}/planets/earth_specular_2048.jpg`,
  earthClouds: `${BASE_URL}/planets/earth_clouds_1024.png`,

  moon: `${BASE_URL}/planets/moon_1024.jpg`,

  // For other planets, we'll use procedural colors as fallback
  // since reliable texture sources for all planets aren't always CORS-friendly
} as const;

// Alternative texture sources (backup URLs)
export const altTextureUrls = {
  earth: 'https://unpkg.com/three-globe@2.24.13/example/img/earth-blue-marble.jpg',
  earthNight: 'https://unpkg.com/three-globe@2.24.13/example/img/earth-night.jpg',
  earthClouds: 'https://unpkg.com/three-globe@2.24.13/example/img/earth-clouds.png',
  earthTopology: 'https://unpkg.com/three-globe@2.24.13/example/img/earth-topology.png',
} as const;

// Milky Way background
export const backgroundUrls = {
  stars: `${BASE_URL}/cube/MilkyWay/dark-s_px.jpg`,
  milkyway: 'https://unpkg.com/three-globe@2.24.13/example/img/night-sky.png',
} as const;

// Get texture URL for a planet by ID
export const getPlanetTexture = (planetId: string): string | null => {
  const textureMap: Record<string, string | undefined> = {
    earth: textureUrls.earth,
  };
  return textureMap[planetId] || null;
};

// Get moon texture
export const getMoonTexture = (moonId: string): string | null => {
  if (moonId === 'luna') return textureUrls.moon;
  return null;
};

// Create a procedural texture for planets without available textures
export const createProceduralPlanetTexture = (
  baseColor: string,
  features: 'rocky' | 'gas' | 'ice' = 'rocky',
  size: number = 512
): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size / 2;
  const ctx = canvas.getContext('2d')!;

  // Base color fill
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add noise/features based on type
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const i = (y * canvas.width + x) * 4;

      // Add subtle variation
      let variation = 0;

      if (features === 'rocky') {
        // Crater-like noise for rocky planets
        variation = (Math.random() - 0.5) * 30;
        // Add some larger features
        const noise = Math.sin(x * 0.05) * Math.cos(y * 0.08) * 15;
        variation += noise;
      } else if (features === 'gas') {
        // Band patterns for gas giants
        const band = Math.sin(y * 0.1) * 20;
        const turbulence = Math.sin(x * 0.02 + y * 0.01) * 10;
        variation = band + turbulence + (Math.random() - 0.5) * 10;
      } else if (features === 'ice') {
        // Smooth with subtle streaks for ice giants
        const streaks = Math.sin(y * 0.15 + x * 0.01) * 15;
        variation = streaks + (Math.random() - 0.5) * 8;
      }

      // Apply variation to RGB
      data[i] = Math.max(0, Math.min(255, data[i] + variation));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + variation * 0.8));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + variation * 0.6));
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

// Pre-defined procedural texture configurations for each planet
export const planetTextureConfigs: Record<string, { color: string; type: 'rocky' | 'gas' | 'ice' }> = {
  mercury: { color: '#8c8c8c', type: 'rocky' },
  venus: { color: '#e6c073', type: 'rocky' },
  mars: { color: '#c1440e', type: 'rocky' },
  jupiter: { color: '#d8ca9d', type: 'gas' },
  saturn: { color: '#f4d59e', type: 'gas' },
  uranus: { color: '#d1e7e7', type: 'ice' },
  neptune: { color: '#5b5ddf', type: 'ice' },
};
