import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"; // useFrame is not needed in MainScene directly
import { useLocation } from "wouter";
import { useEffect } from "react";
import { useTransition, a } from "@react-spring/three"; // 'a' for animated components

// Import your scene components
import HomeOrthoCamera from "./HomeOrthoCamera";
import HomeExperience from "./HomeExperience"; // This will be your '/Home' scene content
import NaverBuilding from "../model/NaverBuilding";

// You can also create a wrapper for ScrollControls if it's common to both scenes,
// or include it within each scene if its pages/behavior differs.
// For smooth transitions of the content *within* ScrollControls,
// it's often better to have ScrollControls *outside* the animated group,
// and animate the content *inside* of it.

const MainScene = () => {
  const [location] = useLocation(); // Get current location from wouter

  // Optional: For debugging current location

  // Define scene content based on location
  const currentSceneContent = {
    "/": "home", // Default to home if root
    "/Home": "home",
    "/Naver": "naver",
    // Add more cases for other routes if needed
  }[location];

  const transitions = useTransition(currentSceneContent, {
    from: { opacity: 0, position: [0, 0, -5] }, // Start position behind the camera
    enter: { opacity: 1, position: [0, 0, 0] }, // End position at origin
    leave: { opacity: 0, position: [0, 0, 5] }, // Leave position in front of the camera
    config: { mass: 1, tension: 170, friction: 26 }, // Adjust for desired animation feel
    // Use currentSceneContent as the key for the transition
    key: currentSceneContent,
  });

  // Calculate SlidePos only once or memoize it if it's heavy
  const SlidePos = [];
  for (let i = 0; i < 17; i++) {
    for (let j = 0; j < 23; j++) {
      const x = -16 + i * 2;
      const y = -20 + j * 1.7;
      SlidePos.push([x, y, 0]);
    }
  }

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <HomeOrthoCamera /> {/* Keep common camera here */}
      {/* ScrollControls should ideally wrap the content that scrolls,
          and typically remains constant across scene transitions if its behavior is global.
          If ScrollControls itself needs to transition or reset, that's a different setup.
          Here, we're assuming the 3D content *within* ScrollControls transitions.
      */}
      <ScrollControls
        pages={5} // Set the total scrollable pages for the content below
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          position: "absolute",
          top: 0,
          left: 0,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {transitions((style, item) => (
          // a.group applies animated styles to the entire scene content
          <a.group position={style.position} opacity={style.opacity}>
            {item === "home" && <HomeExperience SlidePos={SlidePos} />}
            {item === "naver" && <NaverBuilding />}
            {/* Add more scene components here based on 'item' */}
          </a.group>
        ))}
      </ScrollControls>
      {/* Post-processing effects can be added here if needed */}
      {/*
      <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <ToneMapping />
      </EffectComposer>
      */}
    </Canvas>
  );
};

export default MainScene;
