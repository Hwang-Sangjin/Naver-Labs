import BuildingFiberContainer from "../components/Building/BuildingFiberContainer";
import Loading from "../components/Loading/Loading";
import Mouse from "../components/Loading/Mouse";

const Building = () => {
  return (
    <>
      <Loading />
      <BuildingFiberContainer />
      <Mouse />
    </>
  );
};

export default Building;
