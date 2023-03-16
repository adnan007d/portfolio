"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";

function Spehere() {
  const mesh = useRef<THREE.Mesh>(null!);
  const colorMap = useLoader(TextureLoader, "/ket.webp");
  useFrame(() => {
    mesh.current.rotation.y += 0.01;
  });
  return (
    <mesh ref={mesh} rotation-x={Math.PI * 0.25} rotation-y={Math.PI * 0.25}>
      <sphereGeometry args={[1, 500, 500]} />
      <meshStandardMaterial map={colorMap} />
      <OrbitControls />

      <sphereGeometry args={[0.34, 200, 200]} />
    </mesh>
  );
}

const TechStack = () => {
  return (
    <div className="h-96 w-96 max-w-[95vw] mx-auto">
      <Canvas className="border border-primary">
        <ambientLight />
        <Spehere />
      </Canvas>
    </div>
  );
};

export default TechStack;
