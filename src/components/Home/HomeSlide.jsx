import { useFrame } from "@react-three/fiber";
import { useEffect, useState, useRef, useTransition } from "react";
import * as THREE from "three";

const HomeSlide = ({ position, cursorPos, pageState, index }) => {
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

    // Calculate distance between card position and smoothed cursor position
    const A = new THREE.Vector3(...position);
    const B = new THREE.Vector3(...cursorPos);
    const distance = A.distanceTo(B);

    // Set opacity based on distance (brighter when closer)
    const opacity = Math.max(0.25, Math.min(1, 1 - distance / 8));
    setDistanceOpacity(opacity);

    // Calculate direction from card position (A) to smoothed cursor position (B)
    const direction = new THREE.Vector3().subVectors(B, A);

    // Z-axis rotation: Align card to face the cursor
    const exactRotationZ = Math.atan2(direction.y, direction.x);
    const dir = getShortestRotation(
      slideRef.current.rotation.z,
      exactRotationZ
    );

    setRotationZ(exactRotationZ);

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
    const OriginPos = new THREE.Vector3(0, 0, 0);
    const A = new THREE.Vector3(...position);
    const B = new THREE.Vector3(0, 0, 0);
    const C = new THREE.Vector3(...cursorPos);

    // Calculate direction from card position (A) to smoothed cursor position (B)
    const direction = new THREE.Vector3().subVectors(C, OriginPos);

    // Z-axis rotation: Align card to face the cursor
    const exactRotationZ = Math.atan2(direction.y, direction.x);

    setRotationZ(exactRotationZ);

    // angle Color
    const degree = calculateAngleThree(A, B, C);

    if (degree < 50 || index === 127) {
      setColor("#94c5fe");
      setDistanceOpacity(1);
      const distance = A.distanceTo(B) / 15;
      setRotationX(distance);
      setRotationY(distance);
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

  const getShortestRotation = (currentRad, targetRad) => {
    // -π ~ π 범위로 정규화
    const normalizeAngle = (angle) => {
      angle = ((angle + Math.PI) % (2 * Math.PI)) - Math.PI; // -π ~ π
      return angle;
    };

    // 최단 경로 계산
    let delta = normalizeAngle(targetRad - currentRad);

    // 180° 대칭성 고려: π/2(90°) 이상이면 반대 방향 선택
    if (delta > Math.PI / 2) delta -= Math.PI;
    if (delta < -Math.PI / 2) delta += Math.PI;

    return delta; // 라디안 단위로 반환
  };

  const StageFrame0 = (delta) => {
    delta *= 5;
    if (slideRef.current) {
      if (slideRef.current.rotation.x >= rotationX) {
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
      if (slideRef.current.rotation.y >= rotationY) {
        slideRef.current.rotation.y = THREE.MathUtils.lerp(
          slideRef.current.rotation.y,
          rotationY,
          delta
        );
      } else if (slideRef.current.rotation.y < rotationY) {
        slideRef.current.rotation.y = THREE.MathUtils.lerp(
          slideRef.current.rotation.y,
          rotationY,
          delta
        );
      }

      const currentRad = slideRef.current.rotation.z;
      // 최단 회전 각도 계산 (라디안)
      const deltaAngleRad = getShortestRotation(currentRad, rotationZ);

      // 목표 라디안 값 = 현재 + 최단 경로
      const targetRad = currentRad + deltaAngleRad;

      // 부드러운 보간
      if (Math.abs(currentRad - targetRad) > 0.01) {
        slideRef.current.rotation.z = THREE.MathUtils.lerp(
          currentRad,
          targetRad,
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
