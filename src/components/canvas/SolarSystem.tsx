import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { Starfield } from './Starfield';
import { Constellations } from './Constellations';
import { planetsData } from '../../data/planets';
import { useCameraTransition } from '../../hooks/useCameraTransition';

// Component to handle camera transitions inside the Canvas
const CameraController = () => {
  useCameraTransition();
  return null;
};

export const SolarSystem = () => {
  return (
    <Canvas
      camera={{
        position: [0, 50, 100],
        fov: 60,
        near: 0.1,
        far: 1000,
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        {/* Ambient light for base visibility */}
        <ambientLight intensity={0.1} />

        {/* Camera controller for smooth transitions */}
        <CameraController />

        {/* Background stars */}
        <Starfield count={6000} radius={400} />

        {/* Additional drei Stars for depth */}
        <Stars
          radius={350}
          depth={100}
          count={2000}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Constellations in the background */}
        <Constellations />

        {/* The Sun at the center */}
        <Sun />

        {/* All planets */}
        {planetsData.map(planet => (
          <Planet key={planet.id} data={planet} />
        ))}

        {/* Orbit controls for user navigation */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={300}
          autoRotate={false}
          zoomSpeed={0.8}
          rotateSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  );
};
