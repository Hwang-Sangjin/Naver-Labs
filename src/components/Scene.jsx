import { Loader, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BoxGeometry, MeshBasicMaterial } from "three";
import NaverBuilding from "./model/NaverBuilding";

const Scene = () => {
  return (
    <>
      <Canvas>
        <ambientLight intensity={0.5} color="#ffffff" />
        <OrthographicCamera
          makeDefault
          zoom={1}
          top={50}
          bottom={-50}
          left={50}
          right={-50}
          near={1}
          far={200}
          position={[0, 0, 100]}
        />
        <NaverBuilding />
        <OrbitControls />
      </Canvas>
      <Loader />
    </>
  );
};

export default Scene;
