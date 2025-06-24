import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Box } from "@react-three/drei";
import useHomePattern4Rotation from "../../../store/useHomePattern4Rotation";
import { useEffect, useState, useRef } from "react";

const HomePattern4NaverNetflix = ({
  position = [0, 10, 0],
  size = [1, 1, 1],
  ...props
}) => {
  const { homePattern4Rotation } = useHomePattern4Rotation();
  const [rigidBodyType, setRigidBodyType] = useState("fixed"); // Renamed state to avoid confusion with props
  const rigidBodyRef = useRef();

  useEffect(() => {
    // Only change type based on rotation state
    if (homePattern4Rotation[0] === 3) {
      setRigidBodyType("dynamic");
    } else {
      // Ensure it only goes back to fixed if homePattern4Rotation[1] is not 3
      if (homePattern4Rotation[1] !== 3) {
        setRigidBodyType("fixed");
      }
    }
  }, [homePattern4Rotation]);

  useEffect(() => {
    // This useEffect specifically watches for rigidBodyType becoming "dynamic"
    // and then performs the teleportation.
    if (rigidBodyType === "dynamic" && rigidBodyRef.current) {
      // It's crucial that the body is 'dynamic' when this is called
      rigidBodyRef.current.setTranslation({ x: 0, y: 10, z: 0 }, true);
      // It's also good practice to reset velocities when teleporting
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  }, [rigidBodyType]); // Dependency array includes rigidBodyType

  return (
    <RigidBody
      enabledTranslations={[true, true, false]} // Note: z translation is disabled here
      ref={rigidBodyRef}
      position={position}
      type={rigidBodyType} // Use the state variable for type
      {...props}
    >
      <Box args={size}>
        <meshStandardMaterial color="red" />
      </Box>
      <CuboidCollider args={[size[0] / 2, size[1] / 2, size[2] / 2]} />
    </RigidBody>
  );
};

export default HomePattern4NaverNetflix;
