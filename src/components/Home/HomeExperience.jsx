import { useEffect, useRef, useState } from "react";
import HomeSlide from "./HomeSlide";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";
import useTestStore from "../../store/useTestStore";
import { useNavigate } from "react-router";

const HomeExperience = ({ SlidePos }) => {
  const planeRef = useRef();
  const [screenCursor, setScreenCursor] = useState(
    new THREE.Vector2(9999, 9999)
  );
  const [cursorPos, setCursorPos] = useState([9999, 9999, 9999]);
  const raycaster = useRef(new THREE.Raycaster());
  const { camera } = useThree();
  const data = useScroll();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageState, setPageState] = useState(0);
  const [waveRadius, setWaveRadius] = useState(0);

  const { testData, setTestData } = useTestStore();

  const navigator = useNavigate();

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  };

  useEffect(() => {
    window.addEventListener("pointermove", (event) => {
      setScreenCursor(
        new THREE.Vector2(
          (event.clientX / sizes.width) * 2 - 1,
          -(event.clientY / sizes.height) * 2 + 1
        )
      );
    });
  }, []);

  useEffect(() => {
    if (pageState >= 9) {
      navigator("/building");
    }
  }, [pageState]);

  useEffect(() => {
    setPageState(currentPage * 2);
    setCursorPos([0, 0, 0]);

    const timer = setTimeout(() => {
      setPageState(currentPage * 2 + 1);
    }, 2000);

    // Cleanup to clear the timeout if currentPage changes or component unmounts
    return () => clearTimeout(timer);
  }, [currentPage]);

  useFrame((state) => {
    raycaster.current.setFromCamera(screenCursor, camera);
    const intersection = raycaster.current.intersectObject(planeRef.current);

    if (intersection.length > 0) {
      const point = intersection[0].point;
      setCursorPos([point.x, point.y, point.z]);

      setTestData(point);
    }

    const tempPage = Math.floor(data.offset * data.pages);

    if (tempPage !== currentPage) {
      setCurrentPage(tempPage);
    }
  });

  useFrame((state, delta) => {
    if (pageState !== 5) return;

    setWaveRadius((prev) => (prev + delta * 5) % 40);
  });

  return (
    <>
      {SlidePos.map((e, index) => {
        const key = `Slide${index}`;
        return (
          <HomeSlide
            key={key}
            position={e}
            cursorPos={cursorPos}
            pageState={pageState}
            index={index}
            waveRadius={waveRadius}
            i={Math.floor(index / 24)}
            j={index % 18}
          />
        );
      })}
      <mesh ref={planeRef}>
        <planeGeometry args={[40, 30, 100, 100]} />
        <meshBasicMaterial opacity={0} transparent={true} />
      </mesh>
    </>
  );
};

export default HomeExperience;
