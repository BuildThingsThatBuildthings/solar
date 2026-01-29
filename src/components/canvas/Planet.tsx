import { useRef, useState, Suspense, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import type { PlanetData } from '../../data/planets';
import { getMoonsByPlanet } from '../../data/moons';
import { useSolarSystemStore } from '../../stores/solarSystemStore';
import { Moon } from './Moon';
import { Rings, ThinRings } from './Rings';
import { OrbitPath, MoonOrbitPath } from './OrbitPath';
import { textureUrls, createProceduralPlanetTexture, planetTextureConfigs } from '../../data/textures';

interface PlanetProps {
  data: PlanetData;
}

// Earth with real textures
const EarthTextured = ({
  data,
  meshRef,
  scale,
  onClick,
  onPointerEnter,
  onPointerLeave,
}: {
  data: PlanetData;
  meshRef: React.RefObject<THREE.Mesh | null>;
  scale: number;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) => {
  const texture = useLoader(THREE.TextureLoader, textureUrls.earth);
  const normalMap = useLoader(THREE.TextureLoader, textureUrls.earthNormal);
  const specularMap = useLoader(THREE.TextureLoader, textureUrls.earthSpecular);

  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh
      ref={meshRef}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      scale={scale}
    >
      <sphereGeometry args={[data.size, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        normalMap={normalMap}
        metalnessMap={specularMap}
        roughness={0.5}
        metalness={0.1}
      />
    </mesh>
  );
};

// Earth's cloud layer
const EarthClouds = ({ size }: { size: number }) => {
  const cloudRef = useRef<THREE.Mesh>(null);
  const cloudTexture = useLoader(THREE.TextureLoader, textureUrls.earthClouds);
  cloudTexture.colorSpace = THREE.SRGBColorSpace;

  useFrame((_, delta) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <mesh ref={cloudRef} scale={1.015}>
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial
        map={cloudTexture}
        transparent
        opacity={0.35}
        depthWrite={false}
      />
    </mesh>
  );
};

// Earth's atmosphere glow
const EarthAtmosphere = ({ size }: { size: number }) => {
  return (
    <>
      {/* Inner atmosphere */}
      <mesh scale={1.025}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color="#4a90d9"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Outer atmosphere glow */}
      <mesh scale={1.08}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color="#87ceeb"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
};

// Procedural planet sphere with generated texture
const ProceduralPlanetSphere = ({
  data,
  meshRef,
  scale,
  onClick,
  onPointerEnter,
  onPointerLeave,
}: {
  data: PlanetData;
  meshRef: React.RefObject<THREE.Mesh | null>;
  scale: number;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}) => {
  const texture = useMemo(() => {
    const config = planetTextureConfigs[data.id];
    if (config) {
      const canvas = createProceduralPlanetTexture(config.color, config.type, 1024);
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.ClampToEdgeWrapping;
      return tex;
    }
    return null;
  }, [data.id]);

  return (
    <mesh
      ref={meshRef}
      onClick={onClick}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      scale={scale}
    >
      <sphereGeometry args={[data.size, 64, 64]} />
      {texture ? (
        <meshStandardMaterial
          map={texture}
          roughness={data.id === 'jupiter' || data.id === 'saturn' ? 0.9 : 0.7}
          metalness={0.1}
        />
      ) : (
        <meshStandardMaterial
          color={data.color}
          roughness={0.7}
          metalness={0.1}
        />
      )}
    </mesh>
  );
};

// Venus atmosphere layer
const VenusAtmosphere = ({ size }: { size: number }) => {
  return (
    <>
      {/* Dense yellow-orange atmosphere */}
      <mesh scale={1.04}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color="#e6c073"
          transparent
          opacity={0.25}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Outer haze */}
      <mesh scale={1.1}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial
          color="#d4a855"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </>
  );
};

// Mars atmosphere (thin)
const MarsAtmosphere = ({ size }: { size: number }) => {
  return (
    <mesh scale={1.02}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial
        color="#cc9966"
        transparent
        opacity={0.08}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

// Gas giant atmosphere effects
const GasGiantAtmosphere = ({ size, color }: { size: number; color: string }) => {
  return (
    <mesh scale={1.03}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.1}
        side={THREE.BackSide}
      />
    </mesh>
  );
};

// Loading placeholder
const LoadingPlanet = ({ data, scale }: { data: PlanetData; scale: number }) => (
  <mesh scale={scale}>
    <sphereGeometry args={[data.size, 16, 16]} />
    <meshBasicMaterial color={data.color} wireframe opacity={0.5} transparent />
  </mesh>
);

export const Planet = ({ data }: PlanetProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const [position, setPosition] = useState<[number, number, number]>([data.orbitRadius, 0, 0]);

  const {
    selectBody,
    setHoveredBody,
    hoveredBody,
    isPlaying,
    speed,
    setCameraTarget,
    showLabels,
    showMoons: storeMoons,
  } = useSolarSystemStore();

  const moons = getMoonsByPlanet(data.id);

  useFrame((_, delta) => {
    if (!isPlaying) return;

    // Orbital motion
    angleRef.current += delta * data.orbitSpeed * speed * 0.1;

    const x = Math.cos(angleRef.current) * data.orbitRadius;
    const z = Math.sin(angleRef.current) * data.orbitRadius;
    const newPos: [number, number, number] = [x, 0, z];

    if (groupRef.current) {
      groupRef.current.position.set(x, 0, z);
    }

    setPosition(newPos);

    // Self rotation with axial tilt
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5 * speed;
    }
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    selectBody({ type: 'planet', data });
    setCameraTarget(position);
  };

  const isHovered = hoveredBody === data.id;
  const scale = isHovered ? 1.1 : 1;

  // Calculate axial tilt for the planet
  const axialTiltRad = (data.axialTilt * Math.PI) / 180;

  // Render the appropriate planet sphere based on type
  const renderPlanetSphere = () => {
    if (data.id === 'earth') {
      return (
        <Suspense fallback={<LoadingPlanet data={data} scale={scale} />}>
          <EarthTextured
            data={data}
            meshRef={meshRef}
            scale={scale}
            onClick={handleClick}
            onPointerEnter={() => setHoveredBody(data.id)}
            onPointerLeave={() => setHoveredBody(null)}
          />
          <EarthClouds size={data.size} />
          <EarthAtmosphere size={data.size} />
        </Suspense>
      );
    }

    return (
      <>
        <ProceduralPlanetSphere
          data={data}
          meshRef={meshRef}
          scale={scale}
          onClick={handleClick}
          onPointerEnter={() => setHoveredBody(data.id)}
          onPointerLeave={() => setHoveredBody(null)}
        />
        {/* Atmosphere effects */}
        {data.id === 'venus' && <VenusAtmosphere size={data.size} />}
        {data.id === 'mars' && <MarsAtmosphere size={data.size} />}
        {(data.id === 'jupiter' || data.id === 'saturn') && (
          <GasGiantAtmosphere size={data.size} color={data.color} />
        )}
      </>
    );
  };

  return (
    <>
      {/* Orbital path */}
      <OrbitPath radius={data.orbitRadius} color={data.color} />

      {/* Moon orbital paths */}
      {storeMoons && moons.map(moon => (
        <MoonOrbitPath
          key={`${moon.id}-orbit`}
          radius={moon.orbitRadius}
          parentPosition={position}
          color={moon.color}
        />
      ))}

      {/* Planet group (moves in orbit) */}
      <group ref={groupRef}>
        {/* Planet sphere with axial tilt */}
        <group rotation={[0, 0, axialTiltRad]}>
          {renderPlanetSphere()}

          {/* Rings for Saturn */}
          {data.id === 'saturn' && (
            <Rings
              innerRadius={data.size * 1.3}
              outerRadius={data.size * 2.3}
              color={data.ringColor || '#C9B896'}
              tilt={0.47}
            />
          )}

          {/* Rings for Uranus */}
          {data.id === 'uranus' && (
            <ThinRings
              innerRadius={data.size * 1.4}
              outerRadius={data.size * 1.8}
              color={data.ringColor || '#89CFF0'}
              opacity={0.3}
              tilt={1.7}
            />
          )}

          {/* Faint rings for Neptune */}
          {data.id === 'neptune' && (
            <ThinRings
              innerRadius={data.size * 1.3}
              outerRadius={data.size * 1.5}
              color="#5B5DDF"
              opacity={0.15}
              tilt={0.5}
            />
          )}
        </group>

        {/* Hover glow effect */}
        {isHovered && (
          <mesh scale={1.4}>
            <sphereGeometry args={[data.size, 32, 32]} />
            <meshBasicMaterial
              color={data.color}
              transparent
              opacity={0.25}
              side={THREE.BackSide}
            />
          </mesh>
        )}

        {/* Planet label */}
        {(showLabels || isHovered) && (
          <Html
            position={[0, data.size + 1.5, 0]}
            center
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            <div
              style={{
                background: isHovered ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.5)',
                color: isHovered ? data.color : '#ffffff',
                padding: isHovered ? '6px 14px' : '4px 10px',
                borderRadius: '20px',
                fontSize: isHovered ? '14px' : '11px',
                fontFamily: 'Comic Neue, sans-serif',
                fontWeight: isHovered ? 'bold' : 'normal',
                whiteSpace: 'nowrap',
                border: isHovered ? `2px solid ${data.color}` : '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.2s ease',
                boxShadow: isHovered ? `0 0 15px ${data.color}40` : 'none',
              }}
            >
              {data.emoji} {data.name}
              {isHovered && (
                <span style={{ marginLeft: '6px', fontSize: '10px', opacity: 0.7 }}>
                  ({data.confirmedMoons} moons)
                </span>
              )}
            </div>
          </Html>
        )}
      </group>

      {/* Moons */}
      {storeMoons && moons.map(moon => (
        <Moon key={moon.id} data={moon} parentPosition={position} />
      ))}
    </>
  );
};
