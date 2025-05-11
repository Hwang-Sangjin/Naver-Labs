import { Loader, OrbitControls, OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import HomeSlide from "./HomeSlide";
import HomeOrthoCamera from "./HomeOrthoCamera";

const HomeScene = () => {
  const SlidePos = [];
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 15; j++) {
      const x = -15 + i * 2;
      const y = -10 + j * 2;
      SlidePos.push([x, y, 0]);
    }
  }

  return (
    <>
      <Canvas>
        {SlidePos.map((e, index) => {
          const key = `Slide${index}`;

          return <HomeSlide key={key} position={e} />;
        })}
        <OrbitControls />
        <HomeOrthoCamera />
      </Canvas>
      <Loader />
    </>
  );
};

export default HomeScene;
