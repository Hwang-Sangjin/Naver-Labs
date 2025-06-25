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

  return (
    <RigidBody enabledTranslations={[true, true, false]} position={position}>
      <Box args={size}>
        <meshStandardMaterial color="blue" />
      </Box>
      <CuboidCollider args={[size[0] / 2, size[1] / 2, size[2] / 2]} />
    </RigidBody>
  );
};

export default HomePattern4Naver;
