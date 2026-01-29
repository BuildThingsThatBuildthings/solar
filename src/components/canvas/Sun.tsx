import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useSolarSystemStore } from '../../stores/solarSystemStore';
import { sunData } from '../../data/sun';

// Create a procedural sun texture
const createSunTexture = (size: number = 1024): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size / 2;
  const ctx = canvas.getContext('2d')!;

  // Create radial gradient for the base
  const gradient = ctx.createRadialGradient(
    size / 2, size / 4, 0,
    size / 2, size / 4, size / 2
  );
  gradient.addColorStop(0, '#FFFFFF');
  gradient.addColorStop(0.2, '#FFF5E0');
  gradient.addColorStop(0.4, '#FFD700');
  gradient.addColorStop(0.6, '#FFA500');
  gradient.addColorStop(0.8, '#FF8C00');
  gradient.addColorStop(1, '#FF6600');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size / 2);

  // Add granulation (solar surface texture)
  const imageData = ctx.getImageData(0, 0, size, size / 2);
  const data = imageData.data;

  for (let y = 0; y < size / 2; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;

      // Granulation noise
      const noise1 = Math.sin(x * 0.05) * Math.cos(y * 0.08) * 20;
      const noise2 = Math.sin(x * 0.1 + y * 0.05) * 15;
      const noise3 = (Math.random() - 0.5) * 25;

      // Sunspot-like darker regions (rare)
      let sunspot = 0;
      if (Math.random() < 0.001) {
        sunspot = -50;
      }

      const variation = noise1 + noise2 + noise3 + sunspot;

      data[i] = Math.max(200, Math.min(255, data[i] + variation));
      data[i + 1] = Math.max(100, Math.min(255, data[i + 1] + variation * 0.7));
      data[i + 2] = Math.max(0, Math.min(180, data[i + 2] + variation * 0.3));
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  return texture;
};

export const Sun = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const corona2Ref = useRef<THREE.Mesh>(null);
  const { selectBody, setHoveredBody, hoveredBody, isPlaying, speed, showLabels } = useSolarSystemStore();

  // Create procedural sun texture
  const sunTexture = useMemo(() => createSunTexture(1024), []);

  useFrame((_, delta) => {
    if (meshRef.current && isPlaying) {
      meshRef.current.rotation.y += delta * 0.1 * speed;
    }
    if (glowRef.current && isPlaying) {
      // Pulsing glow effect
      const scale = 1 + Math.sin(Date.now() * 0.002) * 0.03;
      glowRef.current.scale.setScalar(scale);
    }
    if (coronaRef.current && isPlaying) {
      // Slower corona pulse
      const scale = 1 + Math.sin(Date.now() * 0.001) * 0.05;
      coronaRef.current.scale.setScalar(scale);
      coronaRef.current.rotation.y += delta * 0.02;
    }
    if (corona2Ref.current && isPlaying) {
      // Second corona layer
      const scale = 1 + Math.sin(Date.now() * 0.0008 + 1) * 0.07;
      corona2Ref.current.scale.setScalar(scale);
      corona2Ref.current.rotation.y -= delta * 0.015;
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    selectBody({ type: 'sun', data: sunData });
  };

  const isHovered = hoveredBody === 'sun';

  return (
    <group>
      {/* Core sun sphere with texture */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerEnter={() => setHoveredBody('sun')}
        onPointerLeave={() => setHoveredBody(null)}
      >
        <sphereGeometry args={[5, 64, 64]} />
        <meshBasicMaterial
          map={sunTexture}
          toneMapped={false}
        />
      </mesh>

      {/* Inner bright glow */}
      <mesh scale={1.05}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial
          color="#FFEE88"
          transparent
          opacity={0.4}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Inner glow layer */}
      <mesh ref={glowRef} scale={1.12}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial
          color="#FFDD44"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Middle glow layer */}
      <mesh scale={1.25}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial
          color="#FF9900"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Corona effect - outermost glow */}
      <mesh ref={coronaRef} scale={1.5}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial
          color="#FF6600"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Second corona layer */}
      <mesh ref={corona2Ref} scale={1.8}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial
          color="#FF5500"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer corona */}
      <mesh scale={2.2}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial
          color="#FF4400"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Hover highlight */}
      {isHovered && (
        <mesh scale={2.5}>
          <sphereGeometry args={[5, 32, 32]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Sun label */}
      {(showLabels || isHovered) && (
        <Html
          position={[0, 9, 0]}
          center
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            style={{
              background: isHovered ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.5)',
              color: isHovered ? '#FDB813' : '#FFDD44',
              padding: isHovered ? '8px 16px' : '4px 12px',
              borderRadius: '20px',
              fontSize: isHovered ? '16px' : '12px',
              fontFamily: 'Comic Neue, sans-serif',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              border: isHovered ? '2px solid #FDB813' : '1px solid rgba(255,221,68,0.4)',
              transition: 'all 0.2s ease',
              boxShadow: isHovered ? '0 0 20px rgba(253, 184, 19, 0.5)' : 'none',
            }}
          >
            ☀️ The Sun
            {isHovered && (
              <span style={{ marginLeft: '8px', fontSize: '11px', opacity: 0.8 }}>
                ({sunData.spectralClass})
              </span>
            )}
          </div>
        </Html>
      )}

      {/* Point light from sun */}
      <pointLight
        color="#FFFFFF"
        intensity={3}
        distance={500}
        decay={0.5}
      />

      {/* Secondary warmer light */}
      <pointLight
        color="#FFE4B5"
        intensity={1.5}
        distance={200}
        decay={1}
      />
    </group>
  );
};
