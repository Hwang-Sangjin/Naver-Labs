import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Rookie(props) {
  const { nodes, materials } = useGLTF("/model/Rookie.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        material={materials["Material.004"]}
        position={[-0.0, 0.932, 0.0]}
        scale={[1.892, 1.376, 1.539]}
      />
    </group>
  );
}

useGLTF.preload("/model/Rookie.glb");
