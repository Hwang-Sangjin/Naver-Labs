import { Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const HomeScene = () => {
  return (
    <>
      <Canvas>
        <mesh>
          <boxGeometry />
          <meshBasicMaterial />
        </mesh>
        <OrbitControls />
      </Canvas>
      <Loader />
    </>
  );
};

export default HomeScene;
