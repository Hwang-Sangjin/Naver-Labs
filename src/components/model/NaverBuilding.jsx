import React, { useLayoutEffect, useRef } from "react";
import { Center, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function NaverBuilding(props) {
  const { nodes, materials } = useGLTF("/NaverLabs1784.glb");

  const scroll = useScroll();

  useFrame((state, delta) => {
    const offset = 1 - scroll.offset;

    state.camera.position.set(
      Math.sin(offset) * 100 + 100,
      Math.atan(offset * Math.PI * 2) + 100,
      Math.cos((offset * Math.PI) / 3) * 200 + 100
    );
    state.camera.zoom = 10 + (1 - offset) * 5; // Zoom ranges from 5 to 15 based on scroll
    state.camera.updateProjectionMatrix();

    state.camera.lookAt(0, 0, 0);
  });

  return (
    <Center>
      <group castShadow receiveShadow {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Combined.geometry}
          material={nodes.Combined.material}
          position={[-2, 3, -7]}
          scale={0.763}
        />
      </group>
    </Center>
  );
}

useGLTF.preload("/NaverLabs1784.glb");
