import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BoxGeometry, MeshBasicMaterial } from "three";

const Scene = () => {
  return (
    <Canvas>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
