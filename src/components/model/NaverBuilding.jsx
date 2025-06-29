import React, { useLayoutEffect, useRef } from "react";
import { Center, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function NaverBuilding(props) {
  const { nodes, materials } = useGLTF("/model/building.glb");

  // const scroll = useScroll();

  // useFrame((state, delta) => {
  //   const offset = 1 - scroll.offset;

  //   state.camera.position.set(
  //     Math.sin(offset) * 100 + 30,
  //     Math.atan(offset * Math.PI * 2) + 100,
  //     Math.cos((offset * Math.PI) / 3) * 200 + 100
  //   );
  //   state.camera.zoom = 10 + (1 - offset) * 5; // Zoom ranges from 5 to 15 based on scroll
  //   state.camera.updateProjectionMatrix();

  //   state.camera.lookAt(-2, 2, 0);
  // });

  return (
    <Center>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Combined.geometry}
          material={materials.Material}
          position={[-2, 5.171, -7]}
          scale={1.25}
        />
      </group>
    </Center>
  );
}

useGLTF.preload("/building.glb");
