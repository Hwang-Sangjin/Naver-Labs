import {
  AccumulativeShadows,
  Center,
  Environment,
  Lightformer,
  Loader,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  RandomizedLight,
  ScrollControls,
  useHelper,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import NaverBuilding from "../model/NaverBuilding";
import * as THREE from "three";
import { useRef } from "react";
import OrthoCamera from "../OrthoCamera";
import {
  DepthOfField,
  EffectComposer,
  N8AO,
  ToneMapping,
} from "@react-three/postprocessing";

const BuildingScene = () => {
  return (
    <Canvas shadows camera={{ position: [4, 2.5, 8], fov: 35 }}>
      <color attach="background" args={["#c7efce"]} />
      <group position={[0, -0.5, 0]}>
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
            <NaverBuilding scale={0.2} />
          </Center>
        </ScrollControls>

        <AccumulativeShadows
          temporal
          frames={100}
          color="green"
          colorBlend={2}
          toneMapped={true}
          alphaTest={0.75}
          opacity={2}
          scale={50}
        >
          <RandomizedLight
            intensity={Math.PI}
            amount={8}
            radius={4}
            ambient={0.5}
            position={[5, 5, -10]}
            bias={0.001}
          />
        </AccumulativeShadows>
      </group>

      <Environment preset="city" />
      <OrthoCamera />
      <EffectComposer>
        <N8AO aoRadius={0.5} intensity={1} />
        <DepthOfField target={[0, 0, 0]} focusRange={0.1} bokehScale={2} />
        <ToneMapping />
      </EffectComposer>
      {/** options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'], Lightformer- color 변경 */}
      <Environment preset="sunset" resolution={32}>
        <Lightformer position={[10, 10, 10]} scale={10} intensity={4} />
        <Lightformer
          position={[10, 0, -10]}
          scale={10}
          color="red"
          intensity={6}
        />
        <Lightformer position={[-10, -10, -10]} scale={10} intensity={4} />
      </Environment>
      <ambientLight intensity={0.5} />
    </Canvas>
  );
};

export default BuildingScene;
