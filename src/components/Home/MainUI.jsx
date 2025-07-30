import { useLocation } from "wouter";
import useCurrentPage from "../../store/useCurrentPage";
import HomePattern1UI from "./HomePattern1UI";
import HomePattern4UI from "./HomePattern4UI";
import HomeProgress from "./HomeProgress";

const MainUI = () => {
  const { currentPage, setCurrentPage } = useCurrentPage();
  const [location] = useLocation();
  return (
    <>
      {location === "/" || location === "/Home" ? (
        <>
          <HomeProgress />
          {currentPage === 3 ? <HomePattern4UI /> : null}
          {currentPage === 0 ? <HomePattern1UI /> : null}
        </>
      ) : null}
    </>
  );
};

export default MainUI;
