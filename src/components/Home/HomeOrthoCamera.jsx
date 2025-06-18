import { OrthographicCamera, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const HomeOrthoCamera = () => {
  const { size, camera } = useThree();
  const aspect = size.width / size.height;
  const baseSize = 20; // Adjust to control visible area

  useEffect(() => {
    camera.left = -baseSize * aspect;
    camera.right = baseSize * aspect;
    camera.top = baseSize;
    camera.bottom = -baseSize;
    camera.updateProjectionMatrix();
  }, [size, camera]);

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
