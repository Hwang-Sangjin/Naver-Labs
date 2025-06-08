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
import { useEffect, useRef, useState, useTransition } from "react";
import OrthoCamera from "../OrthoCamera";
import {
  DepthOfField,
  EffectComposer,
  N8AO,
  ToneMapping,
} from "@react-three/postprocessing";
import BuildingPlane from "./BuildingPlane";

const BuildingScene = ({ sunTime }) => {
  const [envMap, setEnvMap] = useState("warehouse");
  const [inTransition, startTransition] = useTransition();
  {
    /** options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'], Lightformer- color 변경 */
  }
  useEffect(() => {
    if (sunTime === 0) {
      onChangeEnvMap("warehouse");
    } else if (sunTime === 1) {
      onChangeEnvMap("city");
    } else if (sunTime === 2) {
      onChangeEnvMap("night");
    }
  }, [sunTime]);

  const onChangeEnvMap = (value) => {
    startTransition(() => setEnvMap(value));
  };
  return (
    <>
      <Canvas shadows>
        <color attach="background" args={["#c7efce"]} />
        <group position={[0, 0, 0]}>
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
              <BuildingPlane />
            </Center>
          </ScrollControls>
          <directionalLight
            castShadow
            position={
              sunTime === 0
                ? [50, 50, -50]
                : sunTime === 1
                  ? [-50, 50, 50]
                  : [0, -10, 0]
            }
            intensity={3}
            shadow-mapSize={[1024, 1024]}
          />
          {/* <AccumulativeShadows
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
              position={
                sunTime === 0
                  ? [-10, 5, -5]
                  : sunTime === 1
                    ? [5, 5, -10]
                    : [0, 10, 0]
              }
              bias={0.001}
            />
          </AccumulativeShadows> */}
        </group>

        <OrthoCamera />
        <EffectComposer>
          <N8AO aoRadius={0.5} intensity={1} />
          <DepthOfField target={[0, 0, 0]} focusRange={0.1} bokehScale={2} />
          <ToneMapping />
        </EffectComposer>
        {/** options: ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'], Lightformer- color 변경 */}
        <Environment preset={envMap} resolution={32} blur={0.65}>
          <Lightformer position={[10, 10, 10]} scale={10} intensity={4} />
          <Lightformer
            position={[10, 0, -10]}
            scale={10}
            color={sunTime === 0 ? "white" : sunTime === 1 ? "red" : "black"}
            intensity={6}
          />
          <Lightformer position={[-10, -10, -10]} scale={10} intensity={4} />
        </Environment>

        <ambientLight intensity={0.1} />
      </Canvas>
    </>
  );
};

export default BuildingScene;
