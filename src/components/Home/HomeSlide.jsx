import { useEffect, useState } from "react";
import * as THREE from "three";

const HomeSlide = ({ position, cursorPos }) => {
  const [distanceOpacity, setDistanceOpacity] = useState(0.25);
  const [rotationZ, setRotationZ] = useState(0);
  const [rotationX, setRotationX] = useState(0);

  useEffect(() => {
    const A = new THREE.Vector3(position[0], position[1], position[2]);
    const B = new THREE.Vector3(cursorPos[0], cursorPos[1], cursorPos[2]);
    const distance = A.distanceTo(B);
    setDistanceOpacity(Math.max(0.25, Math.min(1.5, 1 - distance / 8)));

    // Calculate direction from A (position) to B (cursorPos)
    const direction = new THREE.Vector3().subVectors(B, A); // B - A for cursor direction
    const rotationZ = Math.atan2(direction.y, direction.x);
    setRotationZ(rotationZ);

    // Calculate the angle between the x-axis and the direction vector
    const maxRotation = 0.5; // Maximum rotation in radians (adjust as needed)
    const smoothRotationX =
      distance > 8
        ? 0
        : maxRotation *
          (distance / 8) *
          Math.exp(-Math.max(0, distance - 8) / 2);
    setRotationX(smoothRotationX);
  }, [cursorPos, position]);

  return (
    <mesh position={position} rotation={[rotationX, 0, rotationZ]}>
      <boxGeometry args={[1.5, 0.15, 1]} />
      <meshBasicMaterial
        color={"#14cf64"}
        transparent={true}
        opacity={distanceOpacity}
      />
    </mesh>
  );
};

export default HomeSlide;
