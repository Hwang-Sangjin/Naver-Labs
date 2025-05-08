import { useGLTF } from "@react-three/drei";
import { useLayoutEffect } from "react";
import * as THREE from "three";
import { FlakesTexture } from "three/examples/jsm/Addons.js";

function Suzi(props) {
  const { scene, materials } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/suzanne-high-poly/model.gltf"
  );
  useLayoutEffect(() => {
    scene.traverse(
      (obj) => obj.isMesh && (obj.receiveShadow = obj.castShadow = true)
    );
    materials.default.color.set("orange");
    materials.default.roughness = 0;
    materials.default.normalMap = new THREE.CanvasTexture(
      new FlakesTexture(),
      THREE.UVMapping,
      THREE.RepeatWrapping,
      THREE.RepeatWrapping
    );
    materials.default.normalMap.repeat.set(40, 40);
    materials.default.normalScale.set(0.1, 0.1);
  });
  return <primitive object={scene} {...props} />;
}

export default Suzi;
