import { useMemo } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { constellationsData } from '../../data/constellations';
import type { ConstellationData } from '../../data/constellations';
import { useSolarSystemStore } from '../../stores/solarSystemStore';
import { Html } from '@react-three/drei';

interface ConstellationProps {
  data: ConstellationData;
}

const Constellation = ({ data }: ConstellationProps) => {
  const { selectBody, setHoveredBody, hoveredBody, showLabels } = useSolarSystemStore();

  // Create geometry for line segments
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const points: number[] = [];
    data.lines.forEach(([startIdx, endIdx]) => {
      const start = data.stars[startIdx];
      const end = data.stars[endIdx];
      if (start && end) {
        points.push(start.x, start.y, start.z);
        points.push(end.x, end.y, end.z);
      }
    });
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(points), 3));
    return geo;
  }, [data]);

  const isHovered = hoveredBody === data.id;

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    selectBody({ type: 'constellation', data });
  };

  // Calculate center position for label
  const centerPosition = useMemo((): [number, number, number] => {
    if (data.stars.length === 0) return [0, 0, 0];
    const sum = data.stars.reduce(
      (acc, star) => ({
        x: acc.x + star.x,
        y: acc.y + star.y,
        z: acc.z + star.z,
      }),
      { x: 0, y: 0, z: 0 }
    );
    return [
      sum.x / data.stars.length,
      sum.y / data.stars.length,
      sum.z / data.stars.length,
    ];
  }, [data.stars]);

  // Calculate star size based on magnitude (lower magnitude = brighter = bigger)
  const getStarSize = (magnitude: number) => {
    // Magnitude range is typically -1 to 6 for visible stars
    // Map to size range 0.5 to 2.5
    const normalizedMag = Math.max(-1, Math.min(6, magnitude));
    return 2.5 - (normalizedMag + 1) * 0.3;
  };

  return (
    <group>
      {/* Constellation lines */}
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          color={isHovered ? data.color : '#3355aa'}
          transparent
          opacity={isHovered ? 0.9 : 0.35}
        />
      </lineSegments>

      {/* Individual stars */}
      {data.stars.map((star, idx) => (
        <mesh
          key={idx}
          position={[star.x, star.y, star.z]}
          onClick={handleClick}
          onPointerEnter={() => setHoveredBody(data.id)}
          onPointerLeave={() => setHoveredBody(null)}
        >
          <sphereGeometry args={[getStarSize(star.magnitude), 12, 12]} />
          <meshBasicMaterial
            color={isHovered ? data.color : '#ffffff'}
            transparent
            opacity={isHovered ? 1 : 0.85}
          />
        </mesh>
      ))}

      {/* Star labels on hover */}
      {isHovered && showLabels && data.stars.slice(0, 5).map((star, idx) => (
        <Html
          key={`label-${idx}`}
          position={[star.x, star.y + 5, star.z]}
          center
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              color: '#ffffff',
              padding: '2px 8px',
              borderRadius: '10px',
              fontSize: '10px',
              fontFamily: 'Comic Neue, sans-serif',
              whiteSpace: 'nowrap',
            }}
          >
            {star.name}
          </div>
        </Html>
      ))}

      {/* Constellation name label */}
      {(isHovered || showLabels) && (
        <Html
          position={[centerPosition[0], centerPosition[1] + 15, centerPosition[2]]}
          center
          style={{
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              background: isHovered ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.4)',
              color: isHovered ? data.color : '#aaaaaa',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: isHovered ? '14px' : '11px',
              fontFamily: 'Comic Neue, sans-serif',
              fontWeight: isHovered ? 'bold' : 'normal',
              whiteSpace: 'nowrap',
              border: isHovered ? `2px solid ${data.color}` : '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.2s ease',
            }}
          >
            {data.emoji} {data.name}
          </div>
        </Html>
      )}
    </group>
  );
};

export const Constellations = () => {
  const { showConstellations } = useSolarSystemStore();

  if (!showConstellations) return null;

  return (
    <group>
      {constellationsData.map(constellation => (
        <Constellation key={constellation.id} data={constellation} />
      ))}
    </group>
  );
};
