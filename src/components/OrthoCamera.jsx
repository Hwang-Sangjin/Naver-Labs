import {
  OrthographicCamera,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const OrthoCamera = () => {
  return (
    <OrthographicCamera
      makeDefault
      zoom={5}
      near={1}
      far={400}
      position={[30, 0, 100]}
      left={-500}
      right={500}
      top={300}
      bottom={-300}
    />
  );
};

export default OrthoCamera;
