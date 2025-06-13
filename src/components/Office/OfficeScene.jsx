import { Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import ImageSplitBox from "./ImageSplitBox";

const OfficeScene = () => {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight />
        <ImageSplitBox />
      </Canvas>
      <Loader />
    </>
  );
};

export default OfficeScene;
