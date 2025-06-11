import { useFrame } from "@react-three/fiber";
import { set } from "lodash";
import { useEffect, useState, useRef, useTransition, useMemo } from "react";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";

const noise3D = createNoise3D();

const HomeSlide = ({
  position,
  cursorPos,
  pageState,
  index,
  waveRadius,
  i,
  j,
  centerSlide,
  centerUpSlide,
}) => {
  const [distanceOpacity, setDistanceOpacity] = useState(0.25);
  const [rotationZ, setRotationZ] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [slideScale, setSlideScale] = useState([1, 1, 1]); // Initial scale for the slide
  const [color, setColor] = useState("#14cf64"); //
  const [slidePosition, setSlidePosition] = useState([...position]);
  const slideRef = useRef();
  const WaveLengthThresholdValue = 5;
  const WaveDisThresholdValue = 11;
  const WaveLengthPI = Math.PI * 13;

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
    } else if (pageState === 7) {
      StageEffect6();
    } else if (pageState === 9) {
      StageEffect8();
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

    setDistanceOpacity(0.5);
    setSlideScale([0.75, 1, 1]);
    setRotationX(0);
    setRotationY(0);
    setRotationZ(Math.PI / 2);
    setSlidePosition([position[0], position[1], position[2]]);
    //setRotationZ(0);
    setColor("#30947c");
  };

  const StageEffect0 = () => {
    setSlideScale([1, 1, 1]);

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
    setSlideScale([1, 1, 1]);
    setRotationX(0);
    setRotationY(0);
    setRotationZ(0);
    setColor("#30947c");
    setSlidePosition([position[0], position[1], position[2]]);

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

    if (degree <= 20 || degree >= 340 || index === 196) {
      setColor("#5ca5fa");
      setDistanceOpacity(1);
      const distance = A.distanceTo(B) / 15;
      setRotationX(distance);
      setRotationY(distance);
    } else {
      setDistanceOpacity(0.25);
    }
  };

  const StageEffect4 = () => {
    setSlideScale([1, 1, 1]);
    setRotationX(0);
    setRotationY(0);
    setColor("#30947c");

    setSlidePosition([position[0], position[1] / 2, position[2]]);

    const waveOriginPoint = new THREE.Vector3(-16, 0, 0);
    const disX = waveOriginPoint.x - position[0];
    const disY = waveOriginPoint.y - position[1];

    // x축 반지름(a)와 y축 반지름(b) 비율 설정 (x축으로 더 긴 타원, 예: b = a * 0.6)
    const k = 0.8; // y축 반지름을 x축 반지름의 60%로 설정
    const aMin = [
      waveRadius,
      (waveRadius + WaveDisThresholdValue) % WaveLengthPI,
      (waveRadius + WaveDisThresholdValue * 2) % WaveLengthPI,
    ];
    const bMin = aMin.map((a) => a * k); // y축 반지름
    const aMax = [
      waveRadius + WaveLengthThresholdValue,
      (waveRadius + WaveLengthThresholdValue + WaveDisThresholdValue) %
        WaveLengthPI,
      (waveRadius + WaveLengthThresholdValue + WaveDisThresholdValue * 2) %
        WaveLengthPI,
    ];
    const bMax = aMax.map((a) => a * k);

    // 타원 방정식 값 계산: (x - ox)^2 / a^2 + (y - oy)^2 / b^2
    const isInEllipse = (a, b) => {
      return disX ** 2 / a ** 2 + disY ** 2 / b ** 2;
    };

    // 각 타원환 확인
    let isInAnyEllipse = false;
    for (let i = 0; i < 3; i++) {
      const minValue = isInEllipse(aMin[i], bMin[i]);
      const maxValue = isInEllipse(aMax[i], bMax[i]);
      if (minValue >= 1 && maxValue <= 1) {
        isInAnyEllipse = true;
        break;
      }
    }

    if (isInAnyEllipse) {
      setColor("#5ca5fa");
      setDistanceOpacity(1);
    } else {
      setColor("#30947c");
      setDistanceOpacity(0.25);
    }

    setRotationZ(Math.sin((i * waveRadius) / 16) / 3);
    setSlidePosition([
      position[0] + Math.cos((i * waveRadius) / 12) / WaveLengthPI,
      position[1] / 2 + (Math.cos((i * waveRadius) / 12) / WaveLengthPI) * 2,
      position[2],
    ]);
  };

  const StageEffect6 = () => {
    setRotationX(0);
    setRotationY(0);
    setRotationZ(Math.PI / 2);
    setColor("#14cf64");

    if (centerSlide.includes(index)) {
      setDistanceOpacity(0.5);
      setSlideScale([3, 3.5, 1]);

      setSlidePosition([position[0] / 2, position[1], position[2]]);
    } else if (centerUpSlide.includes(index)) {
      setDistanceOpacity(1);
      setSlideScale([3, 3.5, 1]);

      setSlidePosition([position[0] / 2 + 0.5, position[1] - 1.7, position[2]]);
    } else {
      setSlideScale([0, 0, 0]);
    }
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
      const currentRadX = slideRef.current.rotation.x;
      // 최단 회전 각도 계산 (라디안)
      const deltaAngleRadX = getShortestRotation(currentRadX, rotationX);

      // 목표 라디안 값 = 현재 + 최단 경로
      const targetRadX = currentRadX + deltaAngleRadX;

      // 부드러운 보간
      slideRef.current.rotation.x = THREE.MathUtils.lerp(
        currentRadX,
        targetRadX,
        delta
      );

      const currentRadY = slideRef.current.rotation.y;
      // 최단 회전 각도 계산 (라디안)
      const deltaAngleRadY = getShortestRotation(currentRadY, rotationY);

      // 목표 라디안 값 = 현재 + 최단 경로
      const targetRadY = currentRadY + deltaAngleRadY;

      // 부드러운 보간
      slideRef.current.rotation.y = THREE.MathUtils.lerp(
        currentRadY,
        targetRadY,
        delta
      );

      const currentRadZ = slideRef.current.rotation.z;
      // 최단 회전 각도 계산 (라디안)
      const deltaAngleRadZ = getShortestRotation(currentRadZ, rotationZ);

      // 목표 라디안 값 = 현재 + 최단 경로
      const targetRadZ = currentRadZ + deltaAngleRadZ;

      // if (index === 127) {
      //   console.log(targetRadZ);
      // }

      // 부드러운 보간
      slideRef.current.rotation.z = THREE.MathUtils.lerp(
        currentRadZ,
        targetRadZ,
        delta
      );

      slideRef.current.scale.x = THREE.MathUtils.lerp(
        slideRef.current.scale.x,
        slideScale[0],
        delta
      );
      slideRef.current.scale.y = THREE.MathUtils.lerp(
        slideRef.current.scale.y,
        slideScale[1],
        delta
      );
      slideRef.current.scale.z = THREE.MathUtils.lerp(
        slideRef.current.scale.z,
        slideScale[2],
        delta
      );
    }
  };

  return (
    <mesh ref={slideRef} position={slidePosition}>
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
