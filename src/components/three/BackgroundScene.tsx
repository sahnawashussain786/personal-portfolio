"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Sparkles,
  MeshDistortMaterial,
  MeshWobbleMaterial,
} from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { scrollProgress, SCENE_DEPTH } from "@/lib/scroll";

/* ------------------------------- particles ---------------------------------- */

function Particles({ count = 1600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#22d3ee"),
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#e879f9"),
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 32;
      positions[i * 3 + 1] = 5 - Math.random() * (SCENE_DEPTH + 12);
      positions[i * 3 + 2] = (Math.random() - 0.5) * 24;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        size={0.055}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* --------------------------------- hero core -------------------------------- */

function HeroCore() {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const sat1 = useRef<THREE.Mesh>(null);
  const sat2 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (rings.current) {
      rings.current.rotation.z += delta * 0.15;
      rings.current.rotation.x = Math.sin(t * 0.3) * 0.25;
    }
    if (sat1.current) {
      const a = t * 0.7;
      sat1.current.position.set(
        Math.cos(a) * 3.1,
        Math.sin(a) * 0.9,
        Math.sin(a) * 3.1
      );
      sat1.current.rotation.y += delta;
    }
    if (sat2.current) {
      const a = -t * 0.5 + 2;
      sat2.current.position.set(
        Math.cos(a) * 3.8,
        Math.cos(a * 0.7) * 1.2,
        Math.sin(a) * 3.8
      );
      sat2.current.rotation.x += delta * 1.4;
    }
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        state.pointer.x * 0.35,
        2.5,
        delta
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        -state.pointer.y * 0.2,
        2.5,
        delta
      );
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh>
          <sphereGeometry args={[1.55, 64, 64]} />
          <MeshDistortMaterial
            color="#7c3aed"
            emissive="#4c1d95"
            emissiveIntensity={0.55}
            metalness={0.85}
            roughness={0.18}
            distort={0.42}
            speed={2.2}
          />
        </mesh>
        <mesh scale={1.32}>
          <icosahedronGeometry args={[1.55, 1]} />
          <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.28} />
        </mesh>
      </Float>

      <group ref={rings}>
        <mesh rotation={[Math.PI / 2.15, 0.3, 0]}>
          <torusGeometry args={[2.5, 0.018, 16, 128]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.75} />
        </mesh>
        <mesh rotation={[Math.PI / 1.8, -0.5, 0.4]}>
          <torusGeometry args={[2.95, 0.014, 16, 128]} />
          <meshBasicMaterial color="#e879f9" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[Math.PI / 2.5, 0.9, -0.3]}>
          <torusGeometry args={[3.35, 0.01, 16, 128]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.5} />
        </mesh>
      </group>

      <mesh ref={sat1}>
        <octahedronGeometry args={[0.22]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#0e7490"
          emissiveIntensity={1.4}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={sat2}>
        <torusKnotGeometry args={[0.18, 0.06, 96, 12]} />
        <meshStandardMaterial
          color="#e879f9"
          emissive="#a21caf"
          emissiveIntensity={1.2}
          metalness={0.85}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

/* --------------------------- scroll gate (portal 1) -------------------------- */

function ScrollGate() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.z += delta * 0.1;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.2;
  });

  return (
    <group position={[0, -11, -1]}>
      <group ref={group}>
        {[4.2, 3.3, 2.4].map((r, i) => (
          <mesh key={r} rotation={[0, 0, i * 0.9]}>
            <torusGeometry args={[r, 0.025, 16, 160]} />
            <meshBasicMaterial
              color={["#22d3ee", "#8b5cf6", "#e879f9"][i]}
              transparent
              opacity={0.55}
            />
          </mesh>
        ))}
      </group>
      <mesh>
        <sphereGeometry args={[1.1, 48, 48]} />
        <MeshWobbleMaterial
          color="#312e81"
          emissive="#6d28d9"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.2}
          factor={0.7}
          speed={1.5}
        />
      </mesh>
      <Sparkles count={90} scale={[9, 9, 5] as const} size={2.4} speed={0.4} color="#a5f3fc" />
    </group>
  );
}

/* ------------------------------ crystal cluster ------------------------------ */

const CRYSTALS: { p: [number, number, number]; s: number; c: string }[] = [
  { p: [-3.2, 0.4, -1.5], s: 0.9, c: "#22d3ee" },
  { p: [3.4, -0.8, -2], s: 1.1, c: "#8b5cf6" },
  { p: [0.6, 1.6, -3], s: 0.7, c: "#e879f9" },
  { p: [-1.8, -1.8, -0.5], s: 0.6, c: "#8b5cf6" },
  { p: [2.2, 1.2, 0.5], s: 0.5, c: "#22d3ee" },
  { p: [4.6, 0.2, -4], s: 0.8, c: "#e879f9" },
];

function CrystalCluster() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08;
  });

  return (
    <group position={[0, -20, 0]}>
      <group ref={group}>
        {CRYSTALS.map((cr, i) => (
          <Float
            key={i}
            speed={1.4 + i * 0.2}
            rotationIntensity={1.2}
            floatIntensity={1.6}
          >
            <group position={cr.p} scale={cr.s}>
              <mesh>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial
                  color={cr.c}
                  emissive={cr.c}
                  emissiveIntensity={0.35}
                  metalness={0.9}
                  roughness={0.15}
                  flatShading
                />
              </mesh>
              <mesh scale={1.35}>
                <icosahedronGeometry args={[1, 0]} />
                <meshBasicMaterial color={cr.c} wireframe transparent opacity={0.3} />
              </mesh>
            </group>
          </Float>
        ))}
      </group>
      <Sparkles count={70} scale={[10, 8, 6] as const} size={2} speed={0.35} color="#c4b5fd" />
    </group>
  );
}

/* --------------------------- portal core (contact) --------------------------- */

function PortalCore() {
  const ring = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta * 0.25;
  });

  return (
    <group position={[0, -30, -0.5]}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh>
          <torusGeometry args={[2.1, 0.35, 32, 128]} />
          <MeshWobbleMaterial
            color="#7c3aed"
            emissive="#c026d3"
            emissiveIntensity={0.45}
            metalness={0.85}
            roughness={0.2}
            factor={0.5}
            speed={1.2}
          />
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.9, 0.02, 8, 128]} />
          <meshBasicMaterial color="#22d3ee" transparent opacity={0.8} />
        </mesh>
        <mesh scale={0.55}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#0369a1"
            emissiveIntensity={1}
            metalness={1}
            roughness={0.1}
            flatShading
          />
        </mesh>
      </Float>
      <Sparkles count={110} scale={[10, 10, 6] as const} size={2.6} speed={0.5} color="#f0abfc" />
    </group>
  );
}

/* --------------------------------- camera rig -------------------------------- */

function CameraRig() {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const p = scrollProgress.current;
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      state.pointer.x * 0.7,
      2.2,
      delta
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      -p * SCENE_DEPTH + state.pointer.y * 0.35,
      2.6,
      delta
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      7 - p * 1.2,
      2.6,
      delta
    );
    target.set(state.pointer.x * 0.4, camera.position.y, camera.position.z - 6);
    camera.lookAt(target);
  });

  return null;
}

/* ------------------------------- main component ------------------------------ */

export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#05010f", 9, 26]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 4, 6]} intensity={80} color="#22d3ee" distance={30} />
        <pointLight position={[-6, -2, 4]} intensity={80} color="#8b5cf6" distance={30} />
        <pointLight position={[0, -12, 5]} intensity={70} color="#e879f9" distance={30} />
        <Particles />
        <HeroCore />
        <ScrollGate />
        <CrystalCluster />
        <PortalCore />
        <CameraRig />
      </Canvas>
      {/* vignette keeps text readable over the scene */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,1,15,0.55)_100%)]" />
    </div>
  );
}
