import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useLocation } from "wouter";
import useCurrentUrl from "../../store/useCurrentUrl";
import gsap from "gsap";

const HomeOrthoCamera = () => {
  const { size, camera } = useThree();
  const aspect = size.width / size.height;
  const baseSize = 20; // Adjust to control visible area
  const [location] = useLocation();
  const { currentUrl, setCurrentUrl } = useCurrentUrl();

  useEffect(() => {
    camera.left = -baseSize * aspect;
    camera.right = baseSize * aspect;
    camera.top = baseSize;
    camera.bottom = -baseSize;
    camera.updateProjectionMatrix();
  }, [size, camera]);

  useEffect(() => {
    const tempUrl = location.slice(1) === "" ? "Home" : location.slice(1);
    setCurrentUrl(tempUrl);
  }, [location]);

  return (
    <OrthographicCamera
      makeDefault
      zoom={2.5}
      near={-100}
      far={400}
      position={[0, 0, 10]}
    />
  );
};

export default HomeOrthoCamera;
