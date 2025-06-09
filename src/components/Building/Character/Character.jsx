import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Character(props) {
  const { nodes, materials } = useGLTF("/model/character.glb");
  return (
    <group
      scale={[0.5, 0.5, 0.5]}
      position={[10, 0, 0]}
      {...props}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={nodes.Plane.material}
      />
    </group>
  );
}

useGLTF.preload("/model/character.glb");
