import { OrbitControls } from "@react-three/drei";
import { Rookie } from "../model/Rookie";

const ProjectsExperience = () => {
  return (
    <>
      <Rookie />
      <OrbitControls />
      <ambientLight />
    </>
  );
};

export default ProjectsExperience;
