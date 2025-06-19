import {
  CuboidCollider,
  Physics,
  RigidBody,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useMemo, useEffect, useRef, useState, Suspense } from "react";
import { InstancedMesh, MathUtils, Color } from "three";
import {
  AccumulativeShadows,
  Environment,
  Lightformer,
  RandomizedLight,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import useHomePattern4OnClickIndex from "../../store/useHomePattern4OnClickIndex";
import useHomePattern4Rotation from "../../store/useHomePattern4Rotation";
import HomePattern4MeshGenerator from "./HomePattern4MeshGenerator";

const HomePattern4PhysicsScene = ({ count = 200 }) => {
  const meshRef = useRef();
  const colors = ["#04ea6c", "#043940", "#045d4c", "#048143", "#20525c"];
  const { onClickedIndex } = useHomePattern4OnClickIndex();
  const { homePattern4Rotation } = useHomePattern4Rotation();
  const [isGroundExist, setIsGroundExist] = useState(true);

  useEffect(() => {
    setIsGroundExist(false);
  }, [onClickedIndex]);

  useEffect(() => {
    setIsGroundExist(false);

    const timeout = setTimeout(() => {
      setIsGroundExist(true);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [homePattern4Rotation]);

  // 각 박스의 초기 위치와 회전을 설정
  // const instances = useMemo(
  //   () =>
  //     Array.from({ length: count }, (_, i) => ({
  //       key: i,
  //       position: [
  //         MathUtils.randFloatSpread(5), // x: -5 ~ 5
  //         10 + i * 0.2, // y: 10부터 순차적으로 약간씩 높게
  //         MathUtils.randFloatSpread(5) + 10, // z: -5 ~ 5
  //       ],
  //       rotation: [
  //         Math.random() * Math.PI,
  //         Math.random() * Math.PI,
  //         Math.random() * Math.PI,
  //       ],
  //     })),
  //   [count]
  // );

  // useEffect(() => {
  //   if (meshRef.current) {
  //     for (let i = 0; i < count; i++) {
  //       meshRef.current.setColorAt(
  //         i,
  //         new Color(colors[Math.floor(Math.random() * colors.length)])
  //       );
  //     }
  //     meshRef.current.instanceColor.needsUpdate = true;
  //   }
  // }, []);

  return (
    <Suspense>
      <Physics>
        <Environment resolution={32}>
          <Lightformer position={[10, 10, 10]} scale={10} intensity={4} />
          <Lightformer
            position={[10, 0, -10]}
            scale={10}
            color="red"
            intensity={6}
          />
          <Lightformer position={[-10, -10, -10]} scale={10} intensity={4} />
        </Environment>
        {/* 여러 개의 박스 생성 */}
        {/* <InstancedRigidBodies instances={instances} colliders="cuboid">
          <instancedMesh
            ref={meshRef}
            args={[undefined, undefined, count]}
            castShadow
          >
            <boxGeometry args={[1.5, 0.15, 1]} />
            <meshStandardMaterial />
          </instancedMesh>
          <CuboidCollider args={[1, 1, 1]} restitution={0.1} />
        </InstancedRigidBodies> */}
        <HomePattern4MeshGenerator />

        {/* 고정된 바닥 */}
        {isGroundExist ? (
          <RigidBody colliders={false} position={[0, -5, 0]} type="fixed">
            <CuboidCollider args={[10, 1, 15]} restitution={0.1} />
            <mesh position={[0, 0, 0]} receiveShadow>
              <boxGeometry args={[20, 2, 20]} />
              <meshBasicMaterial />
              {/* <MeshTransmissionMaterial
                 transmission={0.9}
                 thickness={0.2}
                 roughness={0.1}
                 ior={1.5}
                 chromaticAberration={0.05}
                 backside={true}
               /> */}
            </mesh>
          </RigidBody>
        ) : null}
      </Physics>

      {/* 그림자 효과 */}
      <AccumulativeShadows
        temporal
        frames={100}
        alphaTest={0.85}
        scale={25}
        position={[0, -4.9, 0]}
      >
        <RandomizedLight
          amount={8}
          radius={5}
          ambient={0.5}
          position={[-10, 10, 5]}
          bias={0.001}
        />
      </AccumulativeShadows>
    </Suspense>
  );
};

export default HomePattern4PhysicsScene;
