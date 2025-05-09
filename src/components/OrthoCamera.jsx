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
      zoom={3}
      near={1}
      far={400}
      position={[10, 5, 10]}
      left={-50}
      right={50}
      top={30}
      bottom={-30}
    />
  );
};

export default OrthoCamera;
