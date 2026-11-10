'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Environment, 
  Float, 
  MeshPhysicalMaterial, 
  ContactShadows,
  BakeShadows,
  ScrollControls,
  useScroll,
  Extrude,
  Edges
} from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';

// Procedural Laser Part Component
function LaserPart({ shape, color, position, rotation, exploded, explodedOffset, blueprint }: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  const extrudeSettings = useMemo(() => ({
    steps: 2,
    depth: 2,
    beveled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelOffset: 0,
    bevelSegments: 5
  }), []);

  useFrame((state) => {
    const targetY = exploded ? explodedOffset[1] : 0;
    const targetZ = exploded ? explodedOffset[2] : 0;
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.1);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
  });

  return (
    <group position={position} rotation={rotation}>
      <Extrude ref={meshRef} args={[shape, extrudeSettings]}>
        {blueprint ? (
          <meshBasicMaterial color="#0066ff" transparent opacity={0.1} wireframe />
        ) : (
          <MeshPhysicalMaterial
            color={color}
            metalness={1}
            roughness={0.2}
            reflectivity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            anisotropy={1}
            envMapIntensity={1}
          />
        )}
        <Edges scale={1.0} threshold={15}>
          <meshBasicMaterial color={blueprint ? "#00aaff" : "white"} transparent opacity={0.2} />
        </Edges>
      </Extrude>
    </group>
  );
}

function Handpiece({ exploded, blueprint }: any) {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null!);

  // Create procedural shapes
  const mainBody = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-2, -5);
    s.lineTo(2, -5);
    s.quadraticCurveTo(3, 0, 2, 5);
    s.lineTo(-2, 5);
    s.quadraticCurveTo(-3, 0, -2, -5);
    return s;
  }, []);

  const headPart = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(-1.5, 0);
    s.lineTo(1.5, 0);
    s.lineTo(2, 2);
    s.lineTo(-2, 2);
    return s;
  }, []);

  useFrame((state) => {
    // Scroll-cued rotation
    const r1 = scroll.range(0, 1/3);
    const r2 = scroll.range(1/3, 1/3);
    groupRef.current.rotation.y = r1 * Math.PI;
    groupRef.current.rotation.x = r2 * 0.5;
  });

  return (
    <group ref={groupRef}>
      <LaserPart 
        shape={mainBody} 
        color="#222" 
        position={[0, 0, -1]} 
        exploded={exploded} 
        explodedOffset={[0, 0, -2]}
        blueprint={blueprint}
      />
      <LaserPart 
        shape={headPart} 
        color="#444" 
        position={[0, 5.2, -1]} 
        exploded={exploded} 
        explodedOffset={[0, 3, 0]}
        blueprint={blueprint}
      />
      {/* Sapphire Tip */}
      <mesh position={[0, 7.5, 0]} rotation={[Math.PI/2, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.5, 32]} />
        <meshPhysicalMaterial 
          color="#88ccff" 
          transmission={1} 
          thickness={1} 
          roughness={0} 
          transparent 
          opacity={0.6} 
        />
      </mesh>
    </group>
  );
}

export default function LaserScene({ exploded, blueprint, envRotation }: any) {
  return (
    <Canvas shadows gl={{ antialias: false, stencil: false, depth: true }}>
      <color attach="background" args={['#050505']} />
      
      <ScrollControls pages={6} damping={0.2}>
        <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={35} />
        
        <Handpiece exploded={exploded} blueprint={blueprint} />

        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        
        <Environment 
          preset="studio" 
          rotation={[0, envRotation, 0]} 
          background={false}
        />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Decorative particles or tech elements */}
        </Float>

        <ContactShadows position={[0, -10, 0]} opacity={0.4} scale={20} blur={2.5} far={10} />
        <BakeShadows />
      </ScrollControls>

      <EffectComposer disableNormalPass>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={0.5} radius={0.4} />
        <Noise opacity={0.05} />
      </EffectComposer>
    </Canvas>
  );
}
