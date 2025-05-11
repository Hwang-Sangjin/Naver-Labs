import { Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import HomeSlide from "./HomeSlide";

const HomeScene = () => {
  return (
    <>
      <Canvas>
        <HomeSlide />
        <OrbitControls />
      </Canvas>
      <Loader />
    </>
  );
};

export default HomeScene;
