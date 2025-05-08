import {
  AccumulativeShadows,
  Center,
  Environment,
  Loader,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  RandomizedLight,
  ScrollControls,
  useHelper,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import NaverBuilding from "./model/NaverBuilding";
import * as THREE from "three";
import { useRef } from "react";
import OrthoCamera from "./OrthoCamera";
import Suzi from "./model/Suzi";

const Scene = () => {
  return (
    <>
      <Canvas shadows>
        <OrthoCamera />

        <ScrollControls
          style={{
            width: "100%",
            height: "100%",
            overflow: "auto",
            position: "absolute",
            top: 0,
            left: 0,
            scrollbarWidth: "none" /* Firefox */,
            msOverflowStyle: "none" /* IE and Edge */,
          }}
          pages={5}
        >
          <Center top>
            <NaverBuilding position={[0, -20, 0]} />
          </Center>

          {/* <Center top>
            <Suzi rotation={[-0.63, 0, 0]} scale={20} />
          </Center> */}
          <mesh
            receiveShadow
            castShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -20, 0]}
          >
            <boxGeometry args={[1000, 1000, 1, 1]} />
            <meshStandardMaterial side={THREE.DoubleSide} color="white" />
          </mesh>
          <AccumulativeShadows
            temporal
            frames={60}
            color="black"
            colorBlend={2}
            toneMapped={true}
            alphaTest={0.75}
            opacity={2}
            scale={50}
          >
            <RandomizedLight
              intensity={Math.PI}
              amount={10}
              radius={200}
              ambient={0.5}
              position={[60, 60, 200]}
              bias={0.001}
            />
          </AccumulativeShadows>
        </ScrollControls>
        <Environment preset="city" />
      </Canvas>
      <Loader />
    </>
  );
};

export default Scene;
