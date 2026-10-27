'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function GlassCube() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.8}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.2}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          color="#2EA44F"
          transmissionSampler={false}
          roughness={0.1}
          toneMapped={true}
        />
      </mesh>
    </Float>
  );
}

function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = 12;
  const nodes = useRef(
    Array.from({ length: nodeCount }, () => ({
      position: [
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 2.5,
      ] as [number, number, number],
      speed: 0.5 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
    }))
  ).current;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <NodeOrb key={i} position={node.position} speed={node.speed} phase={node.phase} />
      ))}
      {nodes.map((node, i) =>
        nodes.slice(i + 1).map((other, j) => {
          const dist = Math.sqrt(
            (node.position[0] - other.position[0]) ** 2 +
            (node.position[1] - other.position[1]) ** 2 +
            (node.position[2] - other.position[2]) ** 2
          );
          if (dist > 1.8) return null;
          return <ConnectionLine key={`${i}-${j}`} start={node.position} end={other.position} />;
        })
      )}
    </group>
  );
}

function NodeOrb({
  position,
  speed,
  phase,
}: {
  position: [number, number, number];
  speed: number;
  phase: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime * speed + phase;
      meshRef.current.scale.setScalar(0.5 + Math.sin(t) * 0.3);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshBasicMaterial color="#00F2FE" transparent opacity={0.8} />
    </mesh>
  );
}

function ConnectionLine({
  start,
  end,
}: {
  start: [number, number, number];
  end: [number, number, number];
}) {
  const points = [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end),
  ];
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [start, end]);
  const material = useMemo(() => new THREE.LineBasicMaterial({ color: '#2EA44F', transparent: true, opacity: 0.2 }), []);
  const line = useMemo(() => new THREE.Line(geometry, material), [geometry, material]);

  return <primitive object={line} />;
}

export function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#2EA44F" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F2FE" />
        <GlassCube />
        <NetworkNodes />
      </Canvas>
    </div>
  );
}
