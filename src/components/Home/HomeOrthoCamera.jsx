import {
  OrthographicCamera,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const HomeOrthoCamera = () => {
  return (
    <OrthographicCamera
      makeDefault
      zoom={2.5}
      near={-100}
      far={400}
      position={[0, 0, 10]}
      left={-40}
      right={40}
      top={20}
      bottom={-20}
    />
  );
};

export default HomeOrthoCamera;
