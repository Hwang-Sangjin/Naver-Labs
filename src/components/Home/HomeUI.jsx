import useCurrentPage from "../../store/useCurrentPage";
import HomePattern4UI from "./HomePattern4UI";
import HomeProgress from "./HomeProgress";

const HomeUI = () => {
  const { currentPage, setCurrentPage } = useCurrentPage();
  return (
    <>
      <HomeProgress />
      {currentPage === 3 ? <HomePattern4UI /> : null}
    </>
  );
};

export default HomeUI;
