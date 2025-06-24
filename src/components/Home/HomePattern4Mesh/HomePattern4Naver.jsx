import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Box } from "@react-three/drei";
import useHomePattern4Rotation from "../../../store/useHomePattern4Rotation";
import { useEffect, useRef, useState } from "react";

const HomePattern4Naver = ({
  position = [0, 10, 0],
  size = [1, 1, 1],
  ...props
}) => {
  const { homePattern4Rotation } = useHomePattern4Rotation();
  const [type, setType] = useState("fixed");
  const rigidBodyRef = useRef();

  useEffect(() => {
    if (homePattern4Rotation[0] === 0) {
      setType("dynamic");
    } else {
      if (homePattern4Rotation[1] !== 0) {
        setType("fixed");
      }
    }
  }, [homePattern4Rotation]);

  return (
    <RigidBody
      enabledTranslations={[true, true, false]}
      ref={rigidBodyRef}
      position={position}
      type={type}
      {...props}
    >
      <Box args={size}>
        <meshStandardMaterial color="blue" />
      </Box>
      <CuboidCollider args={[size[0] / 2, size[1] / 2, size[2] / 2]} />
    </RigidBody>
  );
};

export default HomePattern4Naver;
