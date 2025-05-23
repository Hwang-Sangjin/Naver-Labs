import {
  Loader,
  OrbitControls,
  OrthographicCamera,
  ScrollControls,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import HomeSlide from "./HomeSlide";
import HomeOrthoCamera from "./HomeOrthoCamera";
import { useEffect, useRef, useState } from "react";
import HomeExperience from "./HomeExperience";
import useTestStore from "../../store/useTestStore";

const HomeScene = () => {
  const { testData, setTestData } = useTestStore();

  const SlidePos = [];
  for (let i = 0; i < 17; i++) {
    for (let j = 0; j < 23; j++) {
      const x = -16 + i * 2;
      const y = -20 + j * 1.7;
      SlidePos.push([x, y, 0]);
    }
  }

  return (
    <>
      <Canvas>
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
          <HomeExperience SlidePos={SlidePos} />
        </ScrollControls>
        <HomeOrthoCamera />
      </Canvas>
      <Loader />
    </>
  );
};

export default HomeScene;
