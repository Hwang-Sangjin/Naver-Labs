import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function NaverBuilding(props) {
  const { nodes, materials } = useGLTF("/NaverLabs1784.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube015.geometry}
        material={materials.Material}
        position={[14.358, 0.094, 13.891]}
        scale={0.25}
      />
    </group>
  );
}

useGLTF.preload("/NaverLabs1784.glb");
