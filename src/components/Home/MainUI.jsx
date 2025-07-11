import useCurrentPage from "../../store/useCurrentPage";
import HomePattern1UI from "./HomePattern1UI";
import HomePattern4UI from "./HomePattern4UI";
import HomeProgress from "./HomeProgress";

const MainUI = () => {
  const { currentPage, setCurrentPage } = useCurrentPage();
  return (
    <>
      <HomeProgress />
      {currentPage === 3 ? <HomePattern4UI /> : null}
      {currentPage === 0 ? <HomePattern1UI /> : null}
    </>
  );
};

export default MainUI;
