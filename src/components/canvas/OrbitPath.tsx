import { useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { useSolarSystemStore } from '../../stores/solarSystemStore';

interface OrbitPathProps {
  radius: number;
  color?: string;
  segments?: number;
  opacity?: number;
}

export const OrbitPath = ({
  radius,
  color = '#ffffff',
  segments = 128,
  opacity = 0.3,
}: OrbitPathProps) => {
  const { showOrbits } = useSolarSystemStore();

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ));
    }
    return pts;
  }, [radius, segments]);

  if (!showOrbits) return null;

  return (
    <Line
      points={points}
      color={color}
      transparent
      opacity={opacity}
      lineWidth={1}
    />
  );
};

// Orbital path for moons (smaller, positioned relative to parent)
interface MoonOrbitPathProps {
  radius: number;
  parentPosition: [number, number, number];
  color?: string;
}

export const MoonOrbitPath = ({
  radius,
  parentPosition,
  color = '#888888',
}: MoonOrbitPathProps) => {
  const { showOrbits, showMoons } = useSolarSystemStore();

  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius
      ));
    }
    return pts;
  }, [radius]);

  if (!showOrbits || !showMoons) return null;

  return (
    <group position={parentPosition}>
      <Line
        points={points}
        color={color}
        transparent
        opacity={0.2}
        lineWidth={1}
      />
    </group>
  );
};
