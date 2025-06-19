import { useMemo, useRef } from "react";
import { InstancedMesh, MathUtils, Color } from "three";
import { InstancedRigidBodies, CuboidCollider } from "@react-three/rapier";
import useHomePattern4Rotation from "../../store/useHomePattern4Rotation";

const HomePattern4MeshGenerator = ({ count = 200 }) => {
  const meshRef = useRef();
  const colors = ["#04ea6c", "#043940", "#045d4c", "#048143", "#20525c"];
  const { homePattern4Rotation } = useHomePattern4Rotation();

  // Generate instances when homePattern4Rotation changes
  const instances = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        key: i,
        position: [
          MathUtils.randFloatSpread(5), // x: -5 ~ 5
          10 + i * 0.2, // y: 10부터 순차적으로 약간씩 높게
          MathUtils.randFloatSpread(5) + 10, // z: -5 ~ 5
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
      })),
    [count, homePattern4Rotation] // Re-run when rotation changes
  );

  // Update colors for instanced meshes
  useMemo(() => {
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        meshRef.current.setColorAt(
          i,
          new Color(colors[Math.floor(Math.random() * colors.length)])
        );
      }
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [instances]);

  return (
    <InstancedRigidBodies instances={instances} colliders="cuboid">
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, count]}
        castShadow
      >
        <boxGeometry args={[1.5, 0.15, 1]} />
        <meshStandardMaterial />
      </instancedMesh>
      <CuboidCollider args={[1, 1, 1]} restitution={0.1} />
    </InstancedRigidBodies>
  );
};

export default HomePattern4MeshGenerator;
