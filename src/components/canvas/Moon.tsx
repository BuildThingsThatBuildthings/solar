import { useRef, Suspense, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import type { MoonData } from '../../data/moons';
import { useSolarSystemStore } from '../../stores/solarSystemStore';
import { textureUrls } from '../../data/textures';

interface MoonProps {
  data: MoonData;
  parentPosition: [number, number, number];
}

// Create procedural moon texture
const createMoonTexture = (color: string, type: 'rocky' | 'icy' | 'volcanic' = 'rocky', size: number = 512): THREE.CanvasTexture => {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size / 2;
  const ctx = canvas.getContext('2d')!;

  // Base color fill
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add surface features
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const i = (y * canvas.width + x) * 4;

      let variation = 0;

      if (type === 'rocky') {
        // Crater-like features
        const craterNoise = Math.sin(x * 0.08) * Math.cos(y * 0.12) * 20;
        variation = craterNoise + (Math.random() - 0.5) * 30;
      } else if (type === 'icy') {
        // Smooth with subtle cracks
        const cracks = Math.abs(Math.sin(x * 0.15 + y * 0.1)) < 0.1 ? -20 : 0;
        variation = cracks + (Math.random() - 0.5) * 15;
      } else if (type === 'volcanic') {
        // Io-like volcanic features
        const volcanic = Math.sin(x * 0.06) * Math.sin(y * 0.08) * 25;
        const spots = Math.random() < 0.02 ? 40 : 0;
        variation = volcanic + spots + (Math.random() - 0.5) * 20;
      }

      data[i] = Math.max(0, Math.min(255, data[i] + variation));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + variation * 0.9));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + variation * 0.8));
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  return texture;
};

// Get moon type based on characteristics
const getMoonType = (moonId: string): 'rocky' | 'icy' | 'volcanic' => {
  if (moonId === 'io') return 'volcanic';
  if (['europa', 'enceladus', 'titan', 'triton', 'miranda', 'ariel', 'umbriel', 'titania', 'oberon', 'nereid'].includes(moonId)) {
    return 'icy';
  }
  return 'rocky';
};

// Luna (Earth's moon) with real texture
const LunaTextured = ({
  data,
  meshRef,
  scale,
  onClick,
  onPointerEnter,
  onPointerLeave,
}: {
  data: MoonData;
  meshRef: React.RefObject<THREE.Mesh | null>;
  scale: number;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) => {
  const texture = useLoader(THREE.TextureLoader, textureUrls.moon);
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh
      ref={meshRef}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      scale={scale}
    >
      <sphereGeometry args={[data.size, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  );
};

// Procedural moon sphere
const ProceduralMoonSphere = ({
  data,
  meshRef,
  scale,
  onClick,
  onPointerEnter,
  onPointerLeave,
}: {
  data: MoonData;
  meshRef: React.RefObject<THREE.Mesh | null>;
  scale: number;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) => {
  const texture = useMemo(() => {
    const type = getMoonType(data.id);
    return createMoonTexture(data.color, type, 512);
  }, [data.id, data.color]);

  return (
    <mesh
      ref={meshRef}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      scale={scale}
    >
      <sphereGeometry args={[data.size, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.85}
        metalness={0.05}
      />
    </mesh>
  );
};

// Loading fallback
const LoadingMoon = ({ data, scale }: { data: MoonData; scale: number }) => (
  <mesh scale={scale}>
    <sphereGeometry args={[data.size, 16, 16]} />
    <meshBasicMaterial color={data.color} wireframe opacity={0.5} transparent />
  </mesh>
);

export const Moon = ({ data, parentPosition }: MoonProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const angleRef = useRef(Math.random() * Math.PI * 2);

  const { selectBody, setHoveredBody, hoveredBody, isPlaying, speed, showMoons, showLabels } = useSolarSystemStore();

  useFrame((_, delta) => {
    if (!isPlaying) return;

    // Orbit around parent planet
    const direction = data.orbitDirection === 'retrograde' ? -1 : 1;
    angleRef.current += delta * data.orbitSpeed * speed * 0.3 * direction;

    if (groupRef.current) {
      const x = parentPosition[0] + Math.cos(angleRef.current) * data.orbitRadius;
      const z = parentPosition[2] + Math.sin(angleRef.current) * data.orbitRadius;
      const y = parentPosition[1] + Math.sin(angleRef.current * 2) * 0.05;
      groupRef.current.position.set(x, y, z);
    }

    // Self rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5 * speed;
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    selectBody({ type: 'moon', data });
  };

  const isHovered = hoveredBody === data.id;
  const scale = isHovered ? 1.3 : 1;

  if (!showMoons) return null;

  // Check if this is Earth's moon (Luna) for texture loading
  const isLuna = data.id === 'luna';

  return (
    <group ref={groupRef}>
      {isLuna ? (
        <Suspense fallback={<LoadingMoon data={data} scale={scale} />}>
          <LunaTextured
            data={data}
            meshRef={meshRef}
            scale={scale}
            onClick={handleClick}
            onPointerEnter={() => setHoveredBody(data.id)}
            onPointerLeave={() => setHoveredBody(null)}
          />
        </Suspense>
      ) : (
        <ProceduralMoonSphere
          data={data}
          meshRef={meshRef}
          scale={scale}
          onClick={handleClick}
          onPointerEnter={() => setHoveredBody(data.id)}
          onPointerLeave={() => setHoveredBody(null)}
        />
      )}

      {/* Special effects for specific moons */}
      {data.id === 'io' && (
        // Volcanic glow for Io
        <mesh scale={1.1}>
          <sphereGeometry args={[data.size, 16, 16]} />
          <meshBasicMaterial
            color="#FF6600"
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {data.id === 'europa' && (
        // Icy glow for Europa
        <mesh scale={1.1}>
          <sphereGeometry args={[data.size, 16, 16]} />
          <meshBasicMaterial
            color="#ADD8E6"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {data.id === 'titan' && (
        // Thick atmosphere for Titan
        <mesh scale={1.15}>
          <sphereGeometry args={[data.size, 16, 16]} />
          <meshBasicMaterial
            color="#E8A946"
            transparent
            opacity={0.25}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {data.id === 'enceladus' && (
        // Ice plumes hint for Enceladus
        <mesh scale={1.08}>
          <sphereGeometry args={[data.size, 16, 16]} />
          <meshBasicMaterial
            color="#FFFFFF"
            transparent
            opacity={0.12}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Hover glow effect */}
      {isHovered && (
        <mesh scale={1.5}>
          <sphereGeometry args={[data.size, 16, 16]} />
          <meshBasicMaterial
            color={data.color}
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {/* Moon label */}
      {(isHovered || (showLabels && data.size > 0.15)) && (
        <Html
          position={[0, data.size + 0.5, 0]}
          center
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            style={{
              background: isHovered ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.5)',
              color: isHovered ? data.color : '#cccccc',
              padding: isHovered ? '4px 10px' : '2px 6px',
              borderRadius: '12px',
              fontSize: isHovered ? '12px' : '9px',
              fontFamily: 'Comic Neue, sans-serif',
              fontWeight: isHovered ? 'bold' : 'normal',
              whiteSpace: 'nowrap',
              border: isHovered ? `2px solid ${data.color}` : '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.2s ease',
            }}
          >
            {data.emoji} {data.name.replace(/\s*\([^)]*\)/g, '')}
          </div>
        </Html>
      )}
    </group>
  );
};
