import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Flower of Life ─── */

function generateFlowerPositions(layers: number): [number, number][] {
  const positions: [number, number][] = [[0, 0]];
  const radius = 1;
  const visited = new Set<string>();
  visited.add('0,0');

  for (let layer = 1; layer <= layers; layer++) {
    const prev = [...positions];
    for (const [cx, cy] of prev) {
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const nx = Math.round((cx + radius * Math.cos(angle)) * 1000) / 1000;
        const ny = Math.round((cy + radius * Math.sin(angle)) * 1000) / 1000;
        const key = `${nx},${ny}`;
        if (!visited.has(key)) {
          visited.add(key);
          positions.push([nx, ny]);
        }
      }
    }
  }
  return positions;
}

function makeCircleGeometry(r: number, segments = 64): THREE.BufferGeometry {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r, 0));
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

/* ─── Circle ring ─── */

interface CircleRingProps {
  cx: number;
  cy: number;
  cz: number;
  radius: number;
  delay: number;
}

const CircleRing: React.FC<CircleRingProps> = ({ cx, cy, cz, radius, delay }) => {
  const mat = useMemo(
    () => new THREE.LineBasicMaterial({ color: '#C8C0B4', transparent: true, opacity: 0.18 }),
    []
  );
  const geo = useMemo(() => makeCircleGeometry(radius), [radius]);
  const obj = useMemo(() => new THREE.Line(geo, mat), [geo, mat]);
  const ref = useRef<THREE.Line>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      (ref.current.material as THREE.LineBasicMaterial).opacity =
        0.12 + Math.sin(t * 0.5 + delay) * 0.06;
    }
  });

  return <primitive object={obj} ref={ref} position={[cx, cy, cz]} />;
};

/* ─── Metatron lines ─── */

const MetatronsCube: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const lineObjects = useMemo(() => {
    const innerRing: [number, number][] = [];
    const outerRing: [number, number][] = [];
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3 - Math.PI / 6;
      innerRing.push([Math.cos(a), Math.sin(a)]);
      outerRing.push([Math.cos(a) * 2, Math.sin(a) * 2]);
    }
    const allPts: [number, number][] = [[0, 0], ...innerRing, ...outerRing];
    const objects: THREE.Line[] = [];

    for (let i = 0; i < allPts.length; i++) {
      for (let j = i + 1; j < allPts.length; j++) {
        const geo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(allPts[i][0], allPts[i][1], 0),
          new THREE.Vector3(allPts[j][0], allPts[j][1], 0),
        ]);
        const mat = new THREE.LineBasicMaterial({
          color: '#C8C0B4',
          transparent: true,
          opacity: 0.05,
        });
        objects.push(new THREE.Line(geo, mat));
      }
    }
    return objects;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {lineObjects.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}
    </group>
  );
};

/* ─── Particles ─── */

const ParticleField: React.FC<{ count?: number }> = ({ count = 250 }) => {
  const ref = useRef<THREE.Points>(null);

  const particleObj = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    const mat = new THREE.PointsMaterial({
      color: '#C8C0B4',
      size: 0.02,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });
    return new THREE.Points(geo, mat);
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.015;
      ref.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.08) * 0.04;
    }
  });

  return <primitive object={particleObj} ref={ref} />;
};

/* ─── Mouse camera (desktop only) ─── */

const CameraRig: React.FC = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const handleMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [handleMove]);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.4 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.current.y * 0.4 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

/* ─── Full scene ─── */

const Scene: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const flowerPositions = useMemo(() => generateFlowerPositions(isMobile ? 1 : 2), [isMobile]);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = clock.getElapsedTime() * 0.025;
    }
  });

  return (
    <>
      {/* Mouse-reactive camera — desktop only (no mouse on touch) */}
      {!isMobile && <CameraRig />}
      <ambientLight intensity={0.3} />

      {/* Flower of Life — fewer circles on mobile */}
      <group ref={groupRef} scale={1.2}>
        {flowerPositions.map(([x, y], i) => (
          <CircleRing key={i} cx={x} cy={y} cz={0} radius={1} delay={i * 0.3} />
        ))}
      </group>

      {/* Metatron overlay — skip on mobile (very subtle at 0.05 opacity, ~78 line draws) */}
      {!isMobile && <MetatronsCube />}

      {/* Outer rings — keep 1 on mobile, both on desktop */}
      <CircleRing cx={0} cy={0} cz={-0.1} radius={4} delay={0} />
      {!isMobile && <CircleRing cx={0} cy={0} cz={-0.2} radius={5.5} delay={1} />}

      {/* Particles — 300 desktop, 80 mobile */}
      <ParticleField count={isMobile ? 80 : 300} />
    </>
  );
};

/* ─── Export ─── */

interface SacredGeometryProps {
  style?: React.CSSProperties;
  className?: string;
}

const SacredGeometry: React.FC<SacredGeometryProps> = ({ style, className }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Skip entire Three.js canvas if user prefers reduced motion
  if (reducedMotion) return null;

  return (
    <div className={className || 'canvas-container'}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={isMobile ? [1, 1] : [1, 2]}
        gl={{ antialias: !isMobile, alpha: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        style={style || { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
      >
        <Scene isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default SacredGeometry;
