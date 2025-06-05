import { useEffect } from "react";
import HomeFiberContainer from "../components/Home/HomeFiberContainer";
import Loading from "../components/Loading/Loading";

const Home = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "rgb(19, 50, 56)";

    return () => {
      document.body.style.backgroundColor = ""; // Or set a default color
    };
  }, []);

  return (
    <>
      <Loading />
      <HomeFiberContainer />
    </>
  );
};

export default Home;
