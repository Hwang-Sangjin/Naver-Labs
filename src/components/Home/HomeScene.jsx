import { Loader, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import HomeSlide from "./HomeSlide";
import HomeOrthoCamera from "./HomeOrthoCamera";
import { useRef, useState } from "react";
import HomeExperience from "./HomeExperience";

const HomeScene = () => {
  const SlidePos = [];
  for (let i = 0; i < 17; i++) {
    for (let j = 0; j < 15; j++) {
      const x = -16 + i * 2;
      const y = -12 + j * 1.5;
      SlidePos.push([x, y, 0]);
    }
  }

  return (
    <>
      <Canvas>
        <HomeExperience SlidePos={SlidePos} />
        <OrbitControls />
        <HomeOrthoCamera />
      </Canvas>
      <Loader />
    </>
  );
};

export default HomeScene;
