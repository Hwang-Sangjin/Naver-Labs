import { useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef, useTransition } from "react";
import * as THREE from "three";

const HomeSlide = ({ position, cursorPos, pageState }) => {
  const [distanceOpacity, setDistanceOpacity] = useState(0.25);
  const [rotationZ, setRotationZ] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [slideScale, setSlideScale] = useState(1);
  const [color, setColor] = useState("#14cf64"); //
  const slideRef = useRef();

  // Store history of cursor positions for smoothing
  const cursorHistory = useRef([]);
  const maxHistory = 3; // Number of past positions to average
  const originPoint = new THREE.Vector3(0, 0, 0);

  const calculateAngleThree = (A, B, C) => {
    // Vectors BA and BC
    const vectorBA = { x: A.x - B.x, y: A.y - B.y };
    const vectorBC = { x: C.x - B.x, y: C.y - B.y };

    // Calculate angle using atan2
    const angle =
      Math.atan2(vectorBC.y, vectorBC.x) - Math.atan2(vectorBA.y, vectorBA.x);

    // Convert radians to degrees and normalize to [0, 360]
    let degrees = (angle * 180) / Math.PI;
    if (degrees < 0) degrees += 360;

    return degrees;
  };

  useEffect(() => {
    if (pageState == 1) {
      StageEffect0();
    } else if (pageState % 2 === 0) {
      Transition();
    } else if (pageState === 3) {
      StageEffect2();
    } else if (pageState === 5) {
      StageEffect4();
    }
  }, [cursorPos, position, pageState]);

  useEffect(() => {
    console.log(rotationZ);
  }, [rotationZ]);

  const Transition = () => {
    // Calculate distance between card position and smoothed cursor position
    const A = new THREE.Vector3(...position);
    const B = new THREE.Vector3(0, 0, 0);
    const C = new THREE.Vector3(...cursorPos);

    // Calculate direction from card position (A) to smoothed cursor position (B)
    const direction = new THREE.Vector3().subVectors(B, A);

    // Z-axis rotation: Align card to face the cursor
    const exactRotationZ = Math.atan2(direction.y, direction.x);

    setRotationZ(exactRotationZ);

    setDistanceOpacity(0.25);
    setSlideScale(3);
    setRotationX(Math.PI / 2);
    setRotationY(0);
    //setRotationZ(0);
    setColor("#183c42");
  };

  const StageEffect0 = () => {
    setSlideScale(1);
    setColor("#14cf64");
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

  const StageEffect2 = () => {
    //setDistanceOpacity(0.25);
    setSlideScale(1);
    setRotationX(0);
    setRotationY(0);
    setRotationZ(0);
    setColor("#14cf64");

    // Calculate distance between card position and smoothed cursor position
    const A = new THREE.Vector3(...position);
    const B = new THREE.Vector3(0, 0, 0);
    const C = new THREE.Vector3(...cursorPos);

    // Calculate direction from card position (A) to smoothed cursor position (B)
    const direction = new THREE.Vector3().subVectors(C, A);

    // Z-axis rotation: Align card to face the cursor
    const exactRotationZ = Math.atan2(direction.y, direction.x);

    setRotationZ(exactRotationZ);

    const distance = A.distanceTo(B) / 20;
    setRotationX(distance);
    setRotationY(distance);

    // angle Color
    const degree = calculateAngleThree(A, B, C);

    if (degree < 50) {
      setColor("#94c5fe");
      setDistanceOpacity(1);
    } else {
      setDistanceOpacity(0.25);
    }
  };

  const StageEffect4 = () => {
    //setDistanceOpacity(0.25);
    setSlideScale(1);
    setRotationX(0);
    setRotationY(0);
    setRotationZ(0);
    setColor("#14cf64");
  };

  useFrame((state, delta) => {
    StageFrame0(delta);
  });

  const getCubeAngleToAdd = (currentAngle, targetAngle, inDegrees = false) => {
    // Convert to radians if inputs are in degrees
    const toRad = inDegrees ? THREE.MathUtils.degToRad : (x) => x;
    const current = toRad(currentAngle);
    const target = toRad(targetAngle);

    // Normalize angles to [0, 2π)
    const normalizedCurrent =
      ((current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const normalizedTarget =
      ((target % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    // Calculate differences to target and target+180° (front and back faces)
    let deltaFront = normalizedTarget - normalizedCurrent;
    let deltaBack =
      ((normalizedTarget + Math.PI) % (2 * Math.PI)) - normalizedCurrent;

    // Normalize deltas to [-π, π]
    if (deltaFront > Math.PI) deltaFront -= 2 * Math.PI;
    else if (deltaFront < -Math.PI) deltaFront += 2 * Math.PI;

    if (deltaBack > Math.PI) deltaBack -= 2 * Math.PI;
    else if (deltaBack < -Math.PI) deltaBack += 2 * Math.PI;

    // Choose the smaller absolute delta
    return Math.abs(deltaFront) <= Math.abs(deltaBack) ? deltaFront : deltaBack;
  };

  // 0도 180도 360도 나눠서 계산
  // 안그러면 확 돌아버리는 동작 발생
  const StageFrame0 = (delta) => {
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

      const dir = getCubeAngleToAdd(slideRef.current.rotation.z, rotationZ);
      slideRef.current.rotation.z = THREE.MathUtils.lerp(
        slideRef.current.rotation.z,
        dir,
        delta
      );

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

  return (
    <mesh ref={slideRef} position={position}>
      <boxGeometry args={[1.5, 0.15, 1]} />
      <meshBasicMaterial
        color={color}
        transparent={true}
        opacity={distanceOpacity}
      />
    </mesh>
  );
};

export default HomeSlide;
