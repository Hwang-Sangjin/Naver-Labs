import { useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef, useTransition } from "react";
import * as THREE from "three";

const HomeSlide = ({ position, cursorPos, currentPage }) => {
  const [distanceOpacity, setDistanceOpacity] = useState(0.25);
  const [rotationZ, setRotationZ] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [slideScale, setSlideScale] = useState(1);
  const slideRef = useRef();

  // Store history of cursor positions for smoothing
  const cursorHistory = useRef([]);
  const maxHistory = 3; // Number of past positions to average

  useEffect(() => {
    StageEffect0();
  }, [cursorPos, position, rotationZ]);

  useFrame((state, delta) => {
    StateFrame0(delta);
  });

  const StageEffect0 = () => {
    setSlideScale([1, 1, 1]);
    // Update cursor position history
    cursorHistory.current.push(new THREE.Vector3(...cursorPos));
    if (cursorHistory.current.length > maxHistory) {
      cursorHistory.current.shift(); // Remove oldest position
    }

    // Calculate smoothed cursor position (average of history)
    const smoothedCursorPos = cursorHistory.current
      .reduce((acc, pos) => acc.add(pos), new THREE.Vector3())
      .divideScalar(cursorHistory.current.length);

    // Calculate distance between card position and smoothed cursor position
    const A = new THREE.Vector3(...position);
    const B = smoothedCursorPos;
    const distance = A.distanceTo(B);

    // Set opacity based on distance (brighter when closer)
    const opacity = Math.max(0.25, Math.min(1, 1 - distance / 8));
    setDistanceOpacity(opacity);

    // Calculate direction from card position (A) to smoothed cursor position (B)
    const direction = new THREE.Vector3().subVectors(B, A);

    // Z-axis rotation: Align card to face the cursor
    const exactRotationZ = Math.atan2(direction.y, direction.x);
    const maxDistance = 8;
    const precisionFactor = Math.max(0, 1 - distance / maxDistance); // 1 (close) to 0 (far)
    const rotationDamping = 0.5;
    const adjustedRotationZ =
      rotationZ * (1 - precisionFactor) * rotationDamping +
      exactRotationZ * precisionFactor;

    setRotationZ(adjustedRotationZ);

    // X-axis rotation: Enhanced tilt based on distance for 3D effect
    const maxRotationX = 1; // Increased for more pronounced tilt
    const tiltFactor = (10 - distance) / 10; // Linear scaling with distance
    const decay = Math.exp(-Math.max(0, distance - 5) / 5); // Exponential decay for smoothness
    const rotationX =
      maxRotationX * tiltFactor * decay < 0.1
        ? 0
        : 1 - maxRotationX * tiltFactor * decay;
    setRotationX(rotationX);
    setRotationY(rotationX);
  };
  const StateFrame0 = (delta) => {
    delta *= 5;
    if (slideRef.current) {
      if (slideRef.current.rotation.x > rotationX) {
        slideRef.current.rotation.x = THREE.MathUtils.lerp(
          slideRef.current.rotation.x,
          rotationX,
          delta
        );
      } else if (slideRef.current.rotation.x < rotationX) {
        slideRef.current.rotation.x = THREE.MathUtils.lerp(
          slideRef.current.rotation.x,
          rotationX,
          delta
        );
      }
      if (slideRef.current.rotation.y > rotationY) {
        slideRef.current.rotation.y = THREE.MathUtils.lerp(
          slideRef.current.rotation.y,
          rotationY,
          delta
        );
      } else if (slideRef.current.rotation.y < rotationY) {
        slideRef.current.y = THREE.MathUtils.lerp(
          slideRef.current.rotation.y,
          rotationY,
          delta
        );
      }
      if (slideRef.current.rotation.z > rotationZ) {
        slideRef.current.rotation.z = THREE.MathUtils.lerp(
          slideRef.current.rotation.z,
          rotationZ,
          delta
        );
      } else if (slideRef.current.rotation.z < rotationZ) {
        slideRef.current.rotation.z = THREE.MathUtils.lerp(
          slideRef.current.rotation.z,
          rotationZ,
          delta
        );
      }

      if (slideRef.current.scale.x > slideScale) {
        slideRef.current.scale.x -= 0.05;
        slideRef.current.scale.y -= 0.05;
        slideRef.current.scale.z -= 0.05;
      } else if (slideRef.current.scale.x < slideScale) {
        slideRef.current.scale.x += 0.05;
        slideRef.current.scale.y += 0.05;
        slideRef.current.scale.z += 0.05;
      }
    }
  };

  const Transition = () => {};

  return (
    <mesh ref={slideRef} position={position}>
      <boxGeometry args={[1.6, 0.15, 1]} />
      <meshBasicMaterial
        color={"#14cf64"}
        transparent={true}
        opacity={distanceOpacity}
      />
    </mesh>
  );
};

export default HomeSlide;
