import { useEffect, useMemo, useRef, useState } from "react";
import HomeSlide from "./HomeSlide";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";
import { OrbitControls, useScroll } from "@react-three/drei";
import { useNavigate } from "react-router";
import useLoadingStateStore from "../../store/useLoadingStateStore";
import useCurrentPage from "../../store/useCurrentPage";
import HomePattern4PhysicsScene from "./HomePattern4PhysicsScene";

const HomeExperience = ({ SlidePos }) => {
  const planeRef = useRef();
  const [screenCursor, setScreenCursor] = useState(
    new THREE.Vector2(9999, 9999)
  );
  const [cursorPos, setCursorPos] = useState([9999, 9999, 9999]);
  const raycaster = useRef(new THREE.Raycaster());
  const { camera } = useThree();
  const data = useScroll();
  const { currentPage, setCurrentPage } = useCurrentPage();
  const [pageState, setPageState] = useState(0);
  const [waveRadius, setWaveRadius] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false); // 타이머 상태 플래그
  const { loadingStateStore, setLoadingStateStore } = useLoadingStateStore();
  const navigator = useNavigate();
  const center4Slide = [
    12, 35, 58, 81, 104, 127, 150, 173, 196, 219, 242, 265, 288, 311, 334, 357,
    380,
  ];
  const center3Slide = [
    13, 36, 59, 82, 105, 128, 151, 174, 197, 220, 243, 266, 289, 312, 335, 358,
    381,
  ];
  const center1Slide = [
    15, 38, 61, 84, 107, 130, 153, 176, 199, 222, 245, 268, 291, 314, 337, 360,
    383,
  ];
  const center2Slide = [
    14, 37, 60, 83, 106, 129, 152, 175, 198, 221, 244, 267, 290, 313, 336, 359,
    382,
  ];
  const center5Slide = [
    11, 34, 57, 80, 103, 126, 149, 172, 195, 218, 241, 264, 287, 310, 333, 356,
    379,
  ];
  const center6Slide = [
    10, 33, 56, 79, 102, 125, 148, 171, 194, 217, 240, 263, 286, 309, 332, 355,
    378,
  ];
  const allCenterSlide = [
    ...center1Slide,
    ...center2Slide,
    ...center3Slide,
    ...center4Slide,
    ...center5Slide,
    ...center6Slide,
  ];

  allCenterSlide.sort(function (a, b) {
    if (a > b) return 1;
    if (a === b) return 0;
    if (a < b) return -1;
  });

  const texture1 = useLoader(TextureLoader, "/image/NaverNavigator.png");
  const texture2 = useLoader(TextureLoader, "/image/NaverNetflix.png");
  const texture3 = useLoader(TextureLoader, "/image/NaverPlusStore.png");
  const texture4 = useLoader(TextureLoader, "/image/NaverLabs.png");
  const boxes = 102;

  const textureOffsets = useMemo(() => {
    const offsets = [];
    const uSize = 1 / boxes;

    for (let i = 0; i < boxes; i++) {
      offsets.push({
        offset: [i * uSize, 0],
        scale: [uSize, 1],
      });
    }
    return offsets;
  }, [boxes]);

  const materials = useMemo(() => {
    return textureOffsets.map((offset) => {
      const front = texture1.clone();
      const left = texture4.clone();
      const back = texture3.clone();
      const right = texture2.clone();

      [front, left, right, back].forEach((tex) => {
        tex.offset.set(...offset.offset);
        tex.repeat.set(...offset.scale);
        tex.needsUpdate = true;
      });

      return [
        new THREE.MeshStandardMaterial({ map: right }), // Right (+X)
        new THREE.MeshStandardMaterial({ map: left }), // Left (-X)
        new THREE.MeshStandardMaterial(), // Top (+Y)
        new THREE.MeshStandardMaterial(), // Bottom (-Y)
        new THREE.MeshStandardMaterial({ map: front }), // Front (+Z)
        new THREE.MeshStandardMaterial({ map: back }), // Back (-Z)
      ];
    });
  }, [texture1, texture2, texture3, texture4, boxes]);
  //34개

  const targetZoom = useRef(5);
  const currentZoom = useRef(camera.zoom);

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
    } else {
      const curPage = Math.floor(data.offset * data.pages);
      targetZoom.current =
        pageState % 2 === 0 ? 5 : 2.5 + (data.offset - 0.2 * curPage) * 3;
    }
  }, [pageState, data.offset]);

  // Smooth zoom animation
  useFrame(() => {
    currentZoom.current += (targetZoom.current - currentZoom.current) * 0.1; // Lerp for smooth transition
    camera.zoom = currentZoom.current;
    camera.updateProjectionMatrix();
  });

  useEffect(() => {
    setPageState(currentPage * 2);
    setCursorPos([0, 0, 0]);
    setIsTimerActive(true); // 타이머 시작

    const timer = setTimeout(() => {
      if (loadingStateStore) {
        setPageState(currentPage * 2 + 1);
        setIsTimerActive(false); // 타이머 종료
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentPage, loadingStateStore]);

  useFrame((state) => {
    raycaster.current.setFromCamera(screenCursor, camera);
    const intersection = raycaster.current.intersectObject(planeRef.current);

    if (intersection.length > 0) {
      const point = intersection[0].point;
      setCursorPos([point.x, point.y, point.z]);
    }

    const tempPage = Math.floor(data.offset * data.pages);
    // 타이머가 활성화되어 있지 않을 때만 currentPage 업데이트
    if (tempPage !== currentPage && !isTimerActive) {
      setCurrentPage(tempPage);
    }
  });

  useFrame((state, delta) => {
    if (pageState !== 5) return;
    setWaveRadius((prev) => (prev + delta * 5) % 40);
  });

  return (
    <>
      <ambientLight />
      {SlidePos.map((e, index) => {
        const key = `Slide${index}`;

        let textureMaterial = null;
        if (center1Slide.includes(index)) {
          textureMaterial = materials[Math.floor(index / 23) * 6];
        } else if (center2Slide.includes(index)) {
          textureMaterial = materials[Math.floor(index / 23) * 6 + 1];
        } else if (center3Slide.includes(index)) {
          textureMaterial = materials[Math.floor(index / 23) * 6 + 2];
        } else if (center4Slide.includes(index)) {
          textureMaterial = materials[Math.floor(index / 23) * 6 + 3];
        } else if (center5Slide.includes(index)) {
          textureMaterial = materials[Math.floor(index / 23) * 6 + 4];
        } else if (center6Slide.includes(index)) {
          textureMaterial = materials[Math.floor(index / 23) * 6 + 5];
        }
        const centerIndex = allCenterSlide.indexOf(index);

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
            center1Slide={center1Slide}
            center2Slide={center2Slide}
            center3Slide={center3Slide}
            center4Slide={center4Slide}
            center5Slide={center5Slide}
            center6Slide={center6Slide}
            textureMaterial={textureMaterial}
            centerIndex={centerIndex}
          />
        );
      })}
      <mesh ref={planeRef}>
        <planeGeometry args={[40, 30, 100, 100]} />
        <meshBasicMaterial opacity={0} transparent={true} />
      </mesh>
      {pageState === 7 ? <HomePattern4PhysicsScene /> : null}
    </>
  );
};

export default HomeExperience;
