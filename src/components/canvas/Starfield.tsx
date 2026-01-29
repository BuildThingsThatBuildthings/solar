import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StarfieldProps {
  count?: number;
  radius?: number;
}

// Create a procedural milky way background texture
const createMilkyWayTexture = (size: number = 2048): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size / 2;
  const ctx = canvas.getContext('2d')!;

  // Dark space background
  ctx.fillStyle = '#000008';
  ctx.fillRect(0, 0, size, size / 2);

  // Add milky way band
  const gradient = ctx.createLinearGradient(0, size / 4 - 100, 0, size / 4 + 100);
  gradient.addColorStop(0, 'rgba(20, 20, 40, 0)');
  gradient.addColorStop(0.3, 'rgba(40, 35, 60, 0.3)');
  gradient.addColorStop(0.5, 'rgba(60, 50, 80, 0.4)');
  gradient.addColorStop(0.7, 'rgba(40, 35, 60, 0.3)');
  gradient.addColorStop(1, 'rgba(20, 20, 40, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size / 2);

  // Add subtle nebula clouds
  for (let i = 0; i < 8; i++) {
    const x = Math.random() * size;
    const y = Math.random() * (size / 2);
    const radius = 50 + Math.random() * 150;

    const nebulaGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    const hue = Math.random() < 0.5 ? 220 + Math.random() * 40 : 280 + Math.random() * 40;
    nebulaGradient.addColorStop(0, `hsla(${hue}, 50%, 30%, 0.1)`);
    nebulaGradient.addColorStop(0.5, `hsla(${hue}, 40%, 20%, 0.05)`);
    nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = nebulaGradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  // Add distant stars
  for (let i = 0; i < 3000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * (size / 2);
    const starSize = Math.random() < 0.95 ? Math.random() * 0.8 : 1 + Math.random();

    // Vary star colors
    const colorRand = Math.random();
    let color: string;
    if (colorRand < 0.6) {
      color = '#FFFFFF';
    } else if (colorRand < 0.75) {
      color = '#AACCFF';
    } else if (colorRand < 0.85) {
      color = '#FFFFCC';
    } else if (colorRand < 0.95) {
      color = '#FFCCAA';
    } else {
      color = '#FFAAAA';
    }

    const opacity = 0.3 + Math.random() * 0.7;

    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.arc(x, y, starSize, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  return texture;
};

// Milky Way background sphere
const MilkyWayBackground = () => {
  const texture = useMemo(() => createMilkyWayTexture(2048), []);

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 64, 64]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

// Particle stars
const ParticleStars = ({ count = 5000, radius = 300 }: StarfieldProps) => {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Distribute stars on a sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius + (Math.random() - 0.5) * 50;

      const i3 = i * 3;
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      // Vary star sizes - magnitude simulation
      const magnitude = Math.random();
      if (magnitude < 0.9) {
        sizes[i] = 0.2 + Math.random() * 0.4;
      } else if (magnitude < 0.97) {
        sizes[i] = 0.6 + Math.random() * 0.5;
      } else {
        sizes[i] = 1.1 + Math.random() * 0.6;
      }

      // Vary star colors based on spectral type
      const spectralType = Math.random();
      if (spectralType < 0.5) {
        // White stars (most common visible)
        colors[i3] = 1;
        colors[i3 + 1] = 1;
        colors[i3 + 2] = 1;
      } else if (spectralType < 0.65) {
        // Blue-white (B/A type)
        colors[i3] = 0.85;
        colors[i3 + 1] = 0.92;
        colors[i3 + 2] = 1;
      } else if (spectralType < 0.75) {
        // Yellow (G type, like our Sun)
        colors[i3] = 1;
        colors[i3 + 1] = 0.97;
        colors[i3 + 2] = 0.85;
      } else if (spectralType < 0.85) {
        // Orange (K type)
        colors[i3] = 1;
        colors[i3 + 1] = 0.85;
        colors[i3 + 2] = 0.65;
      } else if (spectralType < 0.93) {
        // Red (M type)
        colors[i3] = 1;
        colors[i3 + 1] = 0.65;
        colors[i3 + 2] = 0.5;
      } else {
        // Blue (O type - rare)
        colors[i3] = 0.7;
        colors[i3 + 1] = 0.85;
        colors[i3 + 2] = 1;
      }
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    return geo;
  }, [count, radius]);

  // Very subtle rotation for immersion
  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.0005;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.5}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Additional bright stars layer
const BrightStars = ({ count = 150, radius = 280 }: StarfieldProps) => {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius + (Math.random() - 0.5) * 30;

      const i3 = i * 3;
      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      // Bright stars with varied colors
      const colorType = Math.random();
      if (colorType < 0.4) {
        colors[i3] = 1;
        colors[i3 + 1] = 1;
        colors[i3 + 2] = 1;
      } else if (colorType < 0.6) {
        colors[i3] = 0.92;
        colors[i3 + 1] = 0.96;
        colors[i3 + 2] = 1;
      } else if (colorType < 0.8) {
        colors[i3] = 1;
        colors[i3 + 1] = 0.95;
        colors[i3 + 2] = 0.8;
      } else {
        colors[i3] = 1;
        colors[i3 + 1] = 0.75;
        colors[i3 + 2] = 0.55;
      }
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return geo;
  }, [count, radius]);

  // Twinkling effect
  useFrame(() => {
    if (pointsRef.current) {
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.opacity = 0.7 + Math.sin(Date.now() * 0.002) * 0.15;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={1.2}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const Starfield = ({ count = 5000, radius = 300 }: StarfieldProps) => {
  return (
    <group>
      {/* Procedural milky way background */}
      <MilkyWayBackground />

      {/* Main star field */}
      <ParticleStars count={count} radius={radius} />

      {/* Extra bright stars layer */}
      <BrightStars count={150} radius={radius - 20} />
    </group>
  );
};
