import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BoxGeometry, MeshBasicMaterial } from "three";
import NaverBuilding from "./model/NaverBuilding";

const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={5} color="#ffffff" />

      <NaverBuilding />
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
