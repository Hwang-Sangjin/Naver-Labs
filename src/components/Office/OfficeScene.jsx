import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const OfficeScene = () => {
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

export default OfficeScene;
