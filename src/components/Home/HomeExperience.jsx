import { useEffect, useRef, useState } from "react";
import HomeSlide from "./HomeSlide";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";
import useTestStore from "../../store/useTestStore";

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

  const { testData, setTestData } = useTestStore();

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
    setPageState(currentPage);
    setCursorPos([0, 0, 0]);

    const timer = setTimeout(() => {
      setPageState(currentPage + 1);
    }, 2000);

    // Cleanup to clear the timeout if currentPage changes or component unmounts
    return () => clearTimeout(timer);
  }, [currentPage]);

  useEffect(() => {
    console.log(pageState);
  }, [pageState]);

  const Transition = (currentPage) => {
    setPageState(-1 * currentPage);
  };

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
