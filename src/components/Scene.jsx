import {
  AccumulativeShadows,
  Loader,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  RandomizedLight,
  ScrollControls,
  useHelper,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import NaverBuilding from "./model/NaverBuilding";
import * as THREE from "three";
import { useRef } from "react";
import OrthoCamera from "./OrthoCamera";

const Scene = () => {
  return (
    <>
      <Canvas>
        <ambientLight intensity={1} color="#ffffff" />
        <directionalLight
          position={[3.3, 1.0, 4.4]}
          castShadow
          intensity={Math.PI * 2}
        />
        <OrthoCamera />

        <ScrollControls
          style={{
            width: "100%",
            height: "100%",
            overflow: "auto",
            position: "absolute",
            top: 0,
            left: 0,
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
          }}
          pages={5}
        >
          <NaverBuilding position={[0, -20, 0]} />
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -20, 0]}
          >
            <boxGeometry args={[100, 100, 1, 1]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="green" />
          </mesh>
        </ScrollControls>
      </Canvas>
      <Loader />
    </>
  );
};

export default Scene;
