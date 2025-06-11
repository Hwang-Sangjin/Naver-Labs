import React, { useLayoutEffect, useRef } from "react";
import { Center, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function NaverBuilding(props) {
  const { nodes, materials } = useGLTF("/model/building.glb");

  const scroll = useScroll();

  useFrame((state, delta) => {
    const offset = 1 - scroll.offset;

    state.camera.position.set(
      Math.sin(offset) * 100 + 30,
      Math.atan(offset * Math.PI * 2) + 100,
      Math.cos((offset * Math.PI) / 3) * 200 + 100
    );
    state.camera.zoom = 10 + (1 - offset) * 5; // Zoom ranges from 5 to 15 based on scroll
    state.camera.updateProjectionMatrix();

    state.camera.lookAt(-2, 2, 0);
  });

  return (
    <Center>
      <group {...props} dispose={null}>
        <group position={[-2, 6.363, -7]} scale={1.25}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube020_1.geometry}
            material={materials["Material.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube020_2.geometry}
            material={materials.Material}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials["Material.003"]}
          position={[-7.773, 0.19, 1]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials["Material.004"]}
          position={[-7.773, -0.81, 1.5]}
          scale={[335.697, 1.186, 328.553]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials["Material.003"]}
          position={[79.686, 0.19, 1]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials["Material.003"]}
          position={[79.686, 0.19, 74.227]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={materials["Material.003"]}
          position={[-9.075, 0.19, 74.227]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={materials["Material.005"]}
          position={[0, 2, 87]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube006.geometry}
          material={materials["Material.006"]}
          position={[89, 2, 87]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube007.geometry}
          material={materials["Material.007"]}
          position={[89, 2, 13]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube014.geometry}
          material={materials["Material.008"]}
          position={[38.6, 0, 21]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube034.geometry}
          material={materials["Material.008"]}
          position={[35.9, 0, 45]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={materials["Material.008"]}
          position={[47.6, 0, 35]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube009.geometry}
          material={materials["Material.008"]}
          position={[24.6, 0, 30.9]}
          rotation={[0, 1.571, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={materials["Material.003"]}
          position={[79.686, 0.19, -101.773]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011.geometry}
          material={materials["Material.003"]}
          position={[-9.075, 0.19, -101.773]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube012.geometry}
          material={materials["Material.005"]}
          position={[0, 2, -89]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube013.geometry}
          material={materials["Material.006"]}
          position={[89, 2, -89]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube015.geometry}
          material={materials["Material.003"]}
          position={[79.686, 0.19, -184.773]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube016.geometry}
          material={materials["Material.003"]}
          position={[-9.075, 0.19, -184.773]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017.geometry}
          material={materials["Material.005"]}
          position={[0, 2, -172]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube018.geometry}
          material={materials["Material.006"]}
          position={[89, 2, -172]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019.geometry}
          material={materials["Material.003"]}
          position={[79.686, 0.19, -268.773]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube020.geometry}
          material={materials["Material.003"]}
          position={[-9.075, 0.19, -268.773]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube021.geometry}
          material={materials["Material.005"]}
          position={[0, 2, -256]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube022.geometry}
          material={materials["Material.006"]}
          position={[89, 2, -256]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube023.geometry}
          material={materials["Material.003"]}
          position={[-101.314, 0.19, -101.773]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube024.geometry}
          material={materials["Material.003"]}
          position={[-190.075, 0.19, -101.773]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube025.geometry}
          material={materials["Material.005"]}
          position={[-181, 2, -89]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube026.geometry}
          material={materials["Material.006"]}
          position={[-92, 2, -89]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube027.geometry}
          material={materials["Material.003"]}
          position={[-101.314, 0.19, -184.773]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube028.geometry}
          material={materials["Material.003"]}
          position={[-190.075, 0.19, -184.773]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube029.geometry}
          material={materials["Material.005"]}
          position={[-181, 2, -172]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube030.geometry}
          material={materials["Material.006"]}
          position={[-92, 2, -172]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube031.geometry}
          material={materials["Material.003"]}
          position={[-101.314, 0.19, -268.773]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube032.geometry}
          material={materials["Material.003"]}
          position={[-190.075, 0.19, -268.773]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube033.geometry}
          material={materials["Material.005"]}
          position={[-181, 2, -256]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube035.geometry}
          material={materials["Material.006"]}
          position={[-92, 2, -256]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube036.geometry}
          material={materials["Material.003"]}
          position={[-101.314, 0.19, 2.227]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube037.geometry}
          material={materials["Material.003"]}
          position={[-190.075, 0.19, 2.227]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube038.geometry}
          material={materials["Material.005"]}
          position={[-181, 2, 15]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube039.geometry}
          material={materials["Material.006"]}
          position={[-92, 2, 15]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube040.geometry}
          material={materials["Material.003"]}
          position={[-101.314, 0.19, 75.227]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube041.geometry}
          material={materials["Material.003"]}
          position={[-190.075, 0.19, 75.227]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube042.geometry}
          material={materials["Material.005"]}
          position={[-181, 2, 88]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube043.geometry}
          material={materials["Material.006"]}
          position={[-92, 2, 88]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube044.geometry}
          material={materials["Material.003"]}
          position={[169.686, 0.19, 1]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube045.geometry}
          material={materials["Material.003"]}
          position={[169.686, 0.19, 74.227]}
          scale={[36.351, 1.186, 33.889]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube046.geometry}
          material={materials["Material.006"]}
          position={[179, 2, 87]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube047.geometry}
          material={materials["Material.007"]}
          position={[179, 2, 13]}
        />
      </group>
    </Center>
  );
}

useGLTF.preload("/building.glb");
