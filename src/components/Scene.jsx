import { Loader, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { BoxGeometry, MeshBasicMaterial } from "three";
import NaverBuilding from "./model/NaverBuilding";

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
        <OrthographicCamera
          makeDefault
          zoom={10}
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
