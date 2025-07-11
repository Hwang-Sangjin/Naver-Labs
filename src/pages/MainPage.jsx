import { useEffect } from "react";
import MainFiberContainer from "../components/Home/MainFiberContainer";
import Loading from "../components/Loading/Loading";
import Mouse from "../components/Loading/Mouse";

const MainPage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "rgb(19, 50, 56)";

    return () => {
      document.body.style.backgroundColor = ""; // Or set a default color
    };
  }, []);

  return (
    <>
      <Loading />
      <MainFiberContainer />
      <Mouse />
    </>
  );
};

export default MainPage;
