import React, { useLayoutEffect, useRef } from "react";
import { Center, OrbitControls, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function NaverBuilding(props) {
  const { nodes, materials } = useGLTF("/model/NaverLabs1784_001.glb");

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
      <OrbitControls />
      <group {...props} dispose={null}>
        <group position={[3.299, -1.732, 12.929]} scale={[41.42, 8.284, 41.42]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_1.geometry}
            material={materials.Terrain}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube_2.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.SkyBridge.geometry}
          material={materials.glass2}
          position={[1.851, 10.836, -3.729]}
          scale={1.035}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["1784Cafe"].geometry}
          material={materials["1784"]}
          position={[1.851, 10.836, -3.729]}
          scale={1.035}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["1784CafeRoof"].geometry}
          material={materials["1784"]}
          position={[1.851, 10.836, -3.729]}
          scale={1.035}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["1784Base"].geometry}
          material={materials.base1}
          position={[1.851, 10.836, -3.729]}
          scale={1.035}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["1784Main"].geometry}
          material={materials["1784"]}
          position={[1.851, 10.836, -3.729]}
          scale={1.035}
        />
        <group position={[1.851, 10.836, -3.729]} scale={1.035}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube010.geometry}
            material={materials.base1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube010_1.geometry}
            material={materials.glass}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["1784Base2"].geometry}
          material={materials.base1}
          position={[1.851, 10.836, -3.729]}
          scale={1.035}
        />
        <group position={[1.901, 10.836, -3.729]} scale={1.035}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube020.geometry}
            material={materials.base1}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube020_1.geometry}
            material={materials.glass}
          />
        </group>
        <group position={[1.851, 10.836, -3.729]} scale={1.035}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube014.geometry}
            material={materials.GreenFac}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube014_1.geometry}
            material={materials.Steel}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube014_2.geometry}
            material={materials.GreenFacRoof}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials.parkingStone}
          position={[4.616, 7.368, 14.119]}
          scale={[1.179, 0.828, 0.828]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.parkingStone}
          position={[4.616, 7.368, 12.638]}
          scale={[1.179, 0.828, 0.828]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials.parkingStone}
          position={[3.785, 7.368, 10.723]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1.179, 0.828, 0.828]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials.parkingStone}
          position={[3.785, 7.368, 8.05]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1.179, 0.828, 0.828]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={materials.parkingStone}
          position={[9.821, 7.368, 14.119]}
          scale={[1.179, 0.828, 0.828]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={materials.parkingStone}
          position={[3.785, 7.368, 5.283]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[1.179, 0.828, 0.828]}
        />
        <group
          position={[-10.719, 6.839, 13.271]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.828}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane001_1.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane001_2.geometry}
            material={materials["glass.001"]}
          />
        </group>
        <group
          position={[-9.652, 6.839, 13.271]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.828}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane002_1.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane002_2.geometry}
            material={materials["glass.001"]}
          />
        </group>
        <group
          position={[-8.582, 6.839, 13.271]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.828}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane003_1.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane003_2.geometry}
            material={materials["glass.001"]}
          />
        </group>
        <group
          position={[-7.516, 6.839, 13.271]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.828}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane004_1.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane004_2.geometry}
            material={materials["glass.001"]}
          />
        </group>
        <group
          position={[-6.449, 6.839, 13.271]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.828}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane005_1.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane005_2.geometry}
            material={materials["glass.001"]}
          />
        </group>
        <group
          position={[-5.379, 6.839, 13.271]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.828}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane006_1.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane006_2.geometry}
            material={materials["glass.001"]}
          />
        </group>
        <group
          position={[-4.309, 6.839, 13.271]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.828}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane007_1.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane007_2.geometry}
            material={materials["glass.001"]}
          />
        </group>
        <group
          position={[-3.242, 6.839, 13.271]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.828}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane008_1.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane008_2.geometry}
            material={materials["glass.001"]}
          />
        </group>
        <group
          position={[-2.172, 6.839, 13.271]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.828}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane009_1.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane009_2.geometry}
            material={materials["glass.001"]}
          />
        </group>
        <group
          position={[-1.097, 6.839, 13.271]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.828}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane010_1.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane010_2.geometry}
            material={materials["glass.001"]}
          />
        </group>
        <group
          position={[-0.545, 6.839, 12.746]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.828}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane011_1.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane011_2.geometry}
            material={materials["glass.001"]}
          />
        </group>
        <group
          position={[-0.545, 6.839, 11.675]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.828}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane012_1.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane012_2.geometry}
            material={materials["glass.001"]}
          />
        </group>
        <group
          position={[-0.545, 6.839, 10.952]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[0.288, 0.828, 0.828]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane013.geometry}
            material={materials.Material}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane013_1.geometry}
            material={materials["glass.001"]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube006.geometry}
          material={materials.Steel}
          position={[7.639, 52.446, -13.213]}
          scale={0.165}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube007.geometry}
          material={materials.Steel}
          position={[7.639, 52.446, -10.901]}
          scale={0.165}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={materials.Steel}
          position={[5.58, 52.446, -1.859]}
          scale={0.165}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube009.geometry}
          material={materials.Steel}
          position={[7.495, 52.446, -2.589]}
          scale={0.165}
        />
      </group>
    </Center>
  );
}

useGLTF.preload("/model/NaverLabs1784_001.glb");
