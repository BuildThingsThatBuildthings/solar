import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useSolarSystemStore } from '../stores/solarSystemStore';
import * as THREE from 'three';

const DEFAULT_POSITION: [number, number, number] = [0, 50, 100];
const DEFAULT_TARGET: [number, number, number] = [0, 0, 0];

export const useCameraTransition = () => {
  const { camera } = useThree();
  const { cameraTarget, shouldResetCamera, clearResetCamera } = useSolarSystemStore();

  const targetPosition = useRef(new THREE.Vector3(...DEFAULT_POSITION));
  const targetLookAt = useRef(new THREE.Vector3(...DEFAULT_TARGET));
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (cameraTarget) {
      const [x, y, z] = cameraTarget;
      // Position camera at an offset from the target
      const distance = 15;
      targetPosition.current.set(x + distance * 0.5, y + distance * 0.3, z + distance);
      targetLookAt.current.set(x, y, z);
      isTransitioning.current = true;
    }
  }, [cameraTarget]);

  useEffect(() => {
    if (shouldResetCamera) {
      targetPosition.current.set(...DEFAULT_POSITION);
      targetLookAt.current.set(...DEFAULT_TARGET);
      isTransitioning.current = true;
      clearResetCamera();
    }
  }, [shouldResetCamera, clearResetCamera]);

  useFrame(() => {
    if (isTransitioning.current) {
      // Smooth camera transition using lerp
      const lerpFactor = 0.05;

      camera.position.lerp(targetPosition.current, lerpFactor);

      // Check if we're close enough to stop transitioning
      if (camera.position.distanceTo(targetPosition.current) < 0.1) {
        isTransitioning.current = false;
      }
    }
  });

  return { isTransitioning };
};
