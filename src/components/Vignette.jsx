import vignetteVertexShader from "../shaders/vignette/vertex.glsl";
import vignetteFragmentShader from "../shaders/vignette/fragment.glsl";
import { useMemo } from "react";
import * as THREE from "three";

const Vignette = () => {
  const uniform = useMemo(
    () => ({
      uVignetteColor: { value: new THREE.Color("#4f1f96") }, // THREE.Color 사용 권장
      uVignetteMultiplier: { value: 1.16 },
      uVignetteOffset: { value: -1 },
      uOverlayColor: { value: new THREE.Color("#130621") }, // THREE.Color 사용 권장
      uOverlayAlpha: { value: 1 },
    }),
    []
  );

  return (
    <mesh>
      <planeGeometry args={[40, 30, 10, 10]} />
      <shaderMaterial
        attach="material"
        //uniform={uniform}
        vertexShader={vignetteVertexShader}
        fragmentShader={vignetteFragmentShader}
        transparent={true}
        depthTest={false}
      />
    </mesh>
  );
};

export default Vignette;
