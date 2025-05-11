import { useEffect } from "react";
import HomeFiberContainer from "../components/Home/HomeFiberContainer";

const Home = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "rgb(19, 50, 56)";

    return () => {
      document.body.style.backgroundColor = ""; // Or set a default color
    };
  }, []);

  return (
    <>
      <HomeFiberContainer />
    </>
  );
};

export default Home;
