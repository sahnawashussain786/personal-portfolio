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

/* MERN palette: React cyan, MongoDB green, Node green, volt lime */
const C = {
  react: "#61dafb",
  mongo: "#00ed64",
  node: "#3c873a",
  volt: "#a3e635",
};

/* ------------------------------- particles ---------------------------------- */

function Particles({ count = 1600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color(C.mongo),
      new THREE.Color(C.react),
      new THREE.Color(C.volt),
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

/* ------------------------------- react atom --------------------------------- */
/* Hero set-piece: the React logo as a 3D atom — glowing nucleus with three
   orbital rings, each carrying an orbiting electron. */

function ReactAtom() {
  const group = useRef<THREE.Group>(null);
  const orbits = useRef<THREE.Group>(null);
  const e1 = useRef<THREE.Mesh>(null);
  const e2 = useRef<THREE.Mesh>(null);
  const e3 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (orbits.current) {
      orbits.current.rotation.z += delta * 0.12;
      orbits.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
    // Electrons ride their rings (ring radius 2.5 tilted by 60° around X).
    const R = 2.5;
    if (e1.current) {
      const a = t * 1.1;
      e1.current.position.set(Math.cos(a) * R, 0, Math.sin(a) * R);
    }
    if (e2.current) {
      const a = -t * 0.85 + 2.1;
      e2.current.position.set(
        Math.cos(a) * R,
        Math.sin(a) * R * Math.sin(Math.PI / 3),
        Math.sin(a) * R * Math.cos(Math.PI / 3)
      );
    }
    if (e3.current) {
      const a = t * 0.95 + 4.2;
      e3.current.position.set(
        Math.cos(a) * R,
        Math.sin(a) * R * Math.sin(-Math.PI / 3),
        Math.sin(a) * R * Math.cos(-Math.PI / 3)
      );
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
      {/* nucleus — softly morphing core */}
      <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.9}>
        <mesh>
          <sphereGeometry args={[1.15, 64, 64]} />
          <MeshDistortMaterial
            color="#0e7490"
            emissive={C.react}
            emissiveIntensity={0.55}
            metalness={0.85}
            roughness={0.18}
            distort={0.38}
            speed={2.2}
          />
        </mesh>
        {/* hex wireframe shell — a nod to the Node hexagon */}
        <mesh scale={1.5}>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshBasicMaterial color={C.mongo} wireframe transparent opacity={0.3} />
        </mesh>
      </Float>

      {/* three orbital rings, React-logo style */}
      <group ref={orbits}>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.5, 0.02, 16, 160]} />
          <meshBasicMaterial color={C.react} transparent opacity={0.8} />
        </mesh>
        <mesh rotation={[-Math.PI / 3, 0, Math.PI / 3]}>
          <torusGeometry args={[2.5, 0.02, 16, 160]} />
          <meshBasicMaterial color={C.react} transparent opacity={0.65} />
        </mesh>
        <mesh rotation={[-Math.PI / 3, 0, -Math.PI / 3]}>
          <torusGeometry args={[2.5, 0.02, 16, 160]} />
          <meshBasicMaterial color={C.react} transparent opacity={0.65} />
        </mesh>
      </group>

      {/* electrons */}
      <mesh ref={e1}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial
          color={C.mongo}
          emissive={C.mongo}
          emissiveIntensity={1.6}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
      <mesh ref={e2}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial
          color={C.volt}
          emissive={C.volt}
          emissiveIntensity={1.5}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
      <mesh ref={e3}>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial
          color={C.react}
          emissive={C.react}
          emissiveIntensity={1.6}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

/* ----------------------------- mongo data stack ------------------------------ */
/* Second set-piece: a stack of glowing database discs (MongoDB storage vibe)
   with a leaf-like octahedron blooming above. */

function MongoStack() {
  const group = useRef<THREE.Group>(null);
  const leaf = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.z += delta * 0.08;
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.2;
    }
    if (leaf.current) leaf.current.rotation.y += delta * 0.6;
  });

  const discs = [1.9, 1.55, 1.2].map((r, i) => ({
    y: -0.9 + i * 0.85,
    r,
    c: [C.mongo, "#10b981", C.node][i],
    o: [0.85, 0.7, 0.55][i],
  }));

  return (
    <group position={[0, -11, -1]}>
      <group ref={group}>
        {/* database discs */}
        {discs.map((d, i) => (
          <group key={i} position={[0, d.y, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[d.r, d.r, 0.28, 48]} />
              <meshStandardMaterial
                color={d.c}
                emissive={d.c}
                emissiveIntensity={0.35}
                metalness={0.85}
                roughness={0.2}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.001}>
              <torusGeometry args={[d.r, 0.022, 12, 96]} />
              <meshBasicMaterial color={C.mongo} transparent opacity={d.o} />
            </mesh>
          </group>
        ))}

        {/* leaf crystal rising from the stack */}
        <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.2}>
          <mesh ref={leaf} position={[0, 1.9, 0]}>
            <octahedronGeometry args={[0.62, 0]} />
            <meshStandardMaterial
              color={C.mongo}
              emissive="#059669"
              emissiveIntensity={0.9}
              metalness={0.9}
              roughness={0.15}
              flatShading
            />
          </mesh>
        </Float>

        {/* orbiting data bits */}
        <mesh>
          <torusGeometry args={[2.7, 0.014, 8, 128]} />
          <meshBasicMaterial color={C.volt} transparent opacity={0.4} />
        </mesh>
      </group>

      <Sparkles count={90} scale={[9, 9, 5] as const} size={2.4} speed={0.4} color="#6ee7b7" />
    </group>
  );
}

/* ------------------------------ node hex field ------------------------------- */
/* Third set-piece: a drifting field of hexagonal prisms — the Node.js hexagon,
   standing in as glowing server towers. */

const HEXES: { p: [number, number, number]; s: number; c: string }[] = [
  { p: [-3.2, 0.4, -1.5], s: 0.9, c: C.node },
  { p: [3.4, -0.8, -2], s: 1.1, c: C.mongo },
  { p: [0.6, 1.6, -3], s: 0.7, c: C.react },
  { p: [-1.8, -1.8, -0.5], s: 0.6, c: C.mongo },
  { p: [2.2, 1.2, 0.5], s: 0.5, c: C.volt },
  { p: [4.6, 0.2, -4], s: 0.8, c: C.node },
  { p: [-4.4, -0.6, -3], s: 0.65, c: C.react },
];

function NodeHexField() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08;
  });

  return (
    <group position={[0, -20, 0]}>
      <group ref={group}>
        {HEXES.map((hx, i) => (
          <Float
            key={i}
            speed={1.4 + i * 0.2}
            rotationIntensity={1.2}
            floatIntensity={1.6}
          >
            <group position={hx.p} scale={hx.s}>
              {/* hex prism */}
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.9, 0.9, 1.5, 6]} />
                <meshStandardMaterial
                  color={hx.c}
                  emissive={hx.c}
                  emissiveIntensity={0.32}
                  metalness={0.9}
                  roughness={0.15}
                  flatShading
                />
              </mesh>
              {/* wireframe shell */}
              <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.18}>
                <cylinderGeometry args={[0.9, 0.9, 1.5, 6]} />
                <meshBasicMaterial color={hx.c} wireframe transparent opacity={0.3} />
              </mesh>
            </group>
          </Float>
        ))}
      </group>
      <Sparkles count={70} scale={[10, 8, 6] as const} size={2} speed={0.35} color="#86efac" />
    </group>
  );
}

/* ------------------------------ code knot (contact) -------------------------- */
/* Final set-piece: a torus knot reading as intertwined code/data, with a
   spinning hex ring — the portal to the contact section. */

function CodeKnot() {
  const ring = useRef<THREE.Mesh>(null);
  const knot = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta * 0.25;
    if (knot.current) knot.current.rotation.y += delta * 0.3;
  });

  return (
    <group position={[0, -30, -0.5]}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        <mesh ref={knot}>
          <torusKnotGeometry args={[1.35, 0.38, 180, 24]} />
          <MeshWobbleMaterial
            color="#065f46"
            emissive={C.mongo}
            emissiveIntensity={0.5}
            metalness={0.85}
            roughness={0.2}
            factor={0.45}
            speed={1.2}
          />
        </mesh>
        {/* hex ring — Node hexagon halo */}
        <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.7, 0.02, 8, 6]} />
          <meshBasicMaterial color={C.react} transparent opacity={0.8} />
        </mesh>
        <mesh scale={0.5} position={[0, -2.3, 0.5]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={C.volt}
            emissive="#4d7c0f"
            emissiveIntensity={1}
            metalness={1}
            roughness={0.1}
            flatShading
          />
        </mesh>
      </Float>
      <Sparkles count={110} scale={[10, 10, 6] as const} size={2.6} speed={0.5} color="#6ee7b7" />
    </group>
  );
}

/* --------------------------------- camera rig -------------------------------- */

function CameraRig() {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const p = scrollProgress.current;
    // Pull the camera back on narrow screens so the set-pieces stay in frame.
    const w = state.size.width;
    const portraitZoom = w < 480 ? 4.2 : w < 640 ? 3.4 : w < 1024 ? 2.2 : 0;
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
      7 - p * 1.2 + portraitZoom,
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
        <fog attach="fog" args={["#050a09", 9, 26]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 4, 6]} intensity={80} color={C.react} distance={30} />
        <pointLight position={[-6, -2, 4]} intensity={80} color={C.mongo} distance={30} />
        <pointLight position={[0, -12, 5]} intensity={70} color={C.volt} distance={30} />
        <Particles />
        <ReactAtom />
        <MongoStack />
        <NodeHexField />
        <CodeKnot />
        <CameraRig />
      </Canvas>
      {/* vignette keeps text readable over the scene */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,10,9,0.55)_100%)]" />
    </div>
  );
}
