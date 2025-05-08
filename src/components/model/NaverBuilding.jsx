import React, { useLayoutEffect, useRef } from "react";
import { Center, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function NaverBuilding(props) {
  const { nodes, materials } = useGLTF("/NaverLabs1784.glb");

  const scroll = useScroll();

  useFrame((state, delta) => {
    const offset = 1 - scroll.offset;

    state.camera.position.set(
      Math.sin(offset) * 100,
      Math.atan(offset * Math.PI * 2) * 50,
      Math.cos((offset * Math.PI) / 3) * 200
    );
    state.camera.zoom = 5 + (1 - offset) * 10; // Zoom ranges from 5 to 15 based on scroll
    state.camera.updateProjectionMatrix();

    state.camera.lookAt(0, 0, 0);
  });

  return (
    <Center>
      <group castShadow receiveShadow {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015.geometry}
          material={materials.Material}
          position={[14.358, 0.094, 13.891]}
          scale={0.25}
        />
      </group>
    </Center>
  );
}

useGLTF.preload("/NaverLabs1784.glb");
