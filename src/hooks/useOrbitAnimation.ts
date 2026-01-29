import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSolarSystemStore } from '../stores/solarSystemStore';
import * as THREE from 'three';

interface UseOrbitAnimationOptions {
  orbitRadius: number;
  orbitSpeed: number;
  initialAngle?: number;
  tilt?: number;
}

export const useOrbitAnimation = ({
  orbitRadius,
  orbitSpeed,
  initialAngle = Math.random() * Math.PI * 2,
  tilt = 0,
}: UseOrbitAnimationOptions) => {
  const angleRef = useRef(initialAngle);
  const { isPlaying, speed } = useSolarSystemStore();

  useFrame((_, delta) => {
    if (isPlaying) {
      angleRef.current += delta * orbitSpeed * speed * 0.1;
    }
  });

  const getPosition = (): [number, number, number] => {
    const x = Math.cos(angleRef.current) * orbitRadius;
    const z = Math.sin(angleRef.current) * orbitRadius;
    const y = Math.sin(angleRef.current) * Math.sin(tilt) * orbitRadius * 0.1;
    return [x, y, z];
  };

  return { angleRef, getPosition };
};

// Hook for planet self-rotation
export const useSelfRotation = (rotationSpeed: number = 1) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isPlaying, speed } = useSolarSystemStore();

  useFrame((_, delta) => {
    if (meshRef.current && isPlaying) {
      meshRef.current.rotation.y += delta * rotationSpeed * speed * 0.5;
    }
  });

  return meshRef;
};

// Hook for moon orbital animation (relative to parent planet)
export const useMoonOrbit = (orbitRadius: number, orbitSpeed: number) => {
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const { isPlaying, speed } = useSolarSystemStore();

  useFrame((_, delta) => {
    if (isPlaying) {
      angleRef.current += delta * orbitSpeed * speed * 0.3;
    }
  });

  const getLocalPosition = (): [number, number, number] => {
    const x = Math.cos(angleRef.current) * orbitRadius;
    const z = Math.sin(angleRef.current) * orbitRadius;
    // Add slight vertical oscillation for visual interest
    const y = Math.sin(angleRef.current * 2) * 0.1;
    return [x, y, z];
  };

  return { angleRef, getLocalPosition };
};
