import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import useCurrentUrl from "../store/useCurrentUrl";

const OrthoCamera = () => {
  const { size, camera } = useThree();
  const aspect = size.width / size.height;
  const baseSize = 20; // Adjust to control visible area
  const [location] = useLocation();
  const { currentUrl, setCurrentUrl } = useCurrentUrl();
  const cameraRef = useRef();

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

    if (cameraRef.current) {
      // Reset camera position
      cameraRef.current.position.set(0, 0, 5);
      cameraRef.current.rotation.set(0, 0, 0);
      // Make the camera look at the origin (0,0,0)
      cameraRef.current.lookAt(0, 0, 0);
      // Important: Update the camera's projection matrix after changing its position
      cameraRef.current.updateProjectionMatrix();
    }
  }, [location]);

  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault
      zoom={2.5}
      near={-100}
      far={400}
      position={[0, 0, 10]}
    />
  );
};

export default OrthoCamera;
