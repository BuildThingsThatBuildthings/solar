import { useMemo } from 'react';
import * as THREE from 'three';

interface RingsProps {
  innerRadius: number;
  outerRadius: number;
  color: string;
  opacity?: number;
  tilt?: number;
}

// Create detailed Saturn ring texture
const createSaturnRingTexture = (size: number = 512): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  // Transparent background
  ctx.clearRect(0, 0, size, 64);

  // Create Saturn's ring structure with multiple bands
  // Based on actual ring structure: D, C, B, Cassini Division, A, F rings

  const ringBands = [
    // D ring (innermost, very faint)
    { start: 0, end: 0.05, opacity: 0.1, color: '#8B7355' },
    // C ring (inner)
    { start: 0.05, end: 0.2, opacity: 0.4, color: '#9B8B75' },
    // B ring (brightest, densest)
    { start: 0.2, end: 0.52, opacity: 0.85, color: '#C9B896' },
    // Cassini Division (gap)
    { start: 0.52, end: 0.56, opacity: 0.05, color: '#333333' },
    // A ring (outer bright ring)
    { start: 0.56, end: 0.82, opacity: 0.7, color: '#BBA886' },
    // Encke Gap
    { start: 0.76, end: 0.77, opacity: 0.08, color: '#333333' },
    // Outer A ring
    { start: 0.77, end: 0.82, opacity: 0.6, color: '#A89876' },
    // F ring (narrow outer ring)
    { start: 0.88, end: 0.92, opacity: 0.4, color: '#9B8B75' },
  ];

  // Draw each ring band
  ringBands.forEach(band => {
    const startX = band.start * size;
    const endX = band.end * size;
    const width = endX - startX;

    const gradient = ctx.createLinearGradient(startX, 0, endX, 0);
    const baseColor = band.color;

    // Add some variation within each band
    gradient.addColorStop(0, `rgba(${hexToRgb(baseColor)}, ${band.opacity * 0.7})`);
    gradient.addColorStop(0.3, `rgba(${hexToRgb(baseColor)}, ${band.opacity})`);
    gradient.addColorStop(0.5, `rgba(${hexToRgb(baseColor)}, ${band.opacity * 0.9})`);
    gradient.addColorStop(0.7, `rgba(${hexToRgb(baseColor)}, ${band.opacity})`);
    gradient.addColorStop(1, `rgba(${hexToRgb(baseColor)}, ${band.opacity * 0.7})`);

    ctx.fillStyle = gradient;
    ctx.fillRect(startX, 0, width, 64);
  });

  // Add fine structure noise
  const imageData = ctx.getImageData(0, 0, size, 64);
  const data = imageData.data;

  for (let x = 0; x < size; x++) {
    for (let y = 0; y < 64; y++) {
      const i = (y * size + x) * 4;
      if (data[i + 3] > 10) { // Only modify visible pixels
        const noise = (Math.random() - 0.5) * 15;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  return texture;
};

// Helper to convert hex to RGB
const hexToRgb = (hex: string): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
  }
  return '200, 180, 150';
};

// Saturn rings component
export const Rings = ({
  innerRadius,
  outerRadius,
  tilt = 0.4,
}: RingsProps) => {
  const texture = useMemo(() => createSaturnRingTexture(512), []);

  const geometry = useMemo(() => {
    const segments = 128;
    const geo = new THREE.RingGeometry(innerRadius, outerRadius, segments);
    geo.rotateX(-Math.PI / 2);

    // Update UVs for proper radial texture mapping
    const pos = geo.attributes.position;
    const uv = geo.attributes.uv;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const distance = Math.sqrt(x * x + z * z);

      // Map distance from inner to outer radius to UV x coordinate
      const u = (distance - innerRadius) / (outerRadius - innerRadius);
      uv.setXY(i, u, 0.5);
    }

    return geo;
  }, [innerRadius, outerRadius]);

  return (
    <mesh geometry={geometry} rotation={[tilt, 0, 0]}>
      <meshBasicMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
        opacity={0.9}
        depthWrite={false}
      />
    </mesh>
  );
};

// Simpler rings for Uranus and Neptune (thinner and more subtle)
export const ThinRings = ({
  innerRadius,
  outerRadius,
  color,
  opacity = 0.4,
  tilt = 1.7,
}: RingsProps) => {
  const geometry = useMemo(() => {
    const segments = 64;
    const geo = new THREE.RingGeometry(innerRadius, outerRadius, segments);
    geo.rotateX(-Math.PI / 2);
    return geo;
  }, [innerRadius, outerRadius]);

  // Create subtle ring texture for ice giants
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 8;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, 128, 8);

    // Multiple thin rings
    const ringPositions = [0.1, 0.25, 0.35, 0.5, 0.65, 0.8, 0.95];

    ringPositions.forEach(pos => {
      const x = pos * 128;
      const width = 2 + Math.random() * 4;

      const gradient = ctx.createLinearGradient(x - width / 2, 0, x + width / 2, 0);
      gradient.addColorStop(0, `rgba(${hexToRgb(color)}, 0)`);
      gradient.addColorStop(0.3, `rgba(${hexToRgb(color)}, ${0.3 + Math.random() * 0.3})`);
      gradient.addColorStop(0.5, `rgba(${hexToRgb(color)}, ${0.4 + Math.random() * 0.3})`);
      gradient.addColorStop(0.7, `rgba(${hexToRgb(color)}, ${0.3 + Math.random() * 0.3})`);
      gradient.addColorStop(1, `rgba(${hexToRgb(color)}, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(x - width / 2, 0, width, 8);
    });

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [color]);

  return (
    <mesh geometry={geometry} rotation={[tilt, 0, 0]}>
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};
