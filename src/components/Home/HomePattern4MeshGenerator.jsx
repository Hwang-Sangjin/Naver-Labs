import HomePattern4Naver from "./HomePattern4Mesh/HomePattern4Naver";
import HomePattern4NaverLabs from "./HomePattern4Mesh/HomePattern4NaverLabs";
import HomePattern4NaverSmartStore from "./HomePattern4Mesh/HomePattern4NaverSmartStore";
import HomePattern4NaverNetflix from "./HomePattern4Mesh/HomePattern4NaverNetflix";

const HomePattern4MeshGenerator = () => {
  return (
    <group key={`group-${0}`}>
      <HomePattern4Naver rigidBodyKey={`naver-${0}`} />
      <HomePattern4NaverLabs rigidBodyKey={`labs-${1}`} />
      <HomePattern4NaverSmartStore rigidBodyKey={`smartstore-${2}`} />
      <HomePattern4NaverNetflix rigidBodyKey={`netflix-${3}`} />
    </group>
  );
};

export default HomePattern4MeshGenerator;
