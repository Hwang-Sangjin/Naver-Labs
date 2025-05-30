import {
  OrthographicCamera,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const OrthoCamera = () => {
  return (
    <OrthographicCamera
      makeDefault
      zoom={1} // Decrease zoom to show more of the scene
      near={0}
      far={400}
      left={-200} // Expand frustum to cover plane width
      right={200}
      top={120} // Expand frustum to cover plane height
      bottom={-120}
    />
  );
};
export default OrthoCamera;
