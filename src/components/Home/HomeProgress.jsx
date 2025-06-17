import useCurrentPage from "../../store/useCurrentPage";
import { useEffect, useState } from "react";

const HomeProgress = () => {
  const { currentPage, setCurrentPage } = useCurrentPage();
  const indicator = [0, 1, 2, 3];

  return (
    <div className="absolute z-10 top-5 right-3 text-white px-4 py-2">
      {indicator.map((e) => {
        const key = `indicator-${e}`;
        return e === currentPage ? (
          <div
            key={key}
            className="w-5 h-5 m-1 bg-[#18de7bde] rounded-2xl"
          ></div>
        ) : (
          <div key={key} className="w-3 h-3 m-2 bg-[#34444c] rounded-2xl"></div>
        );
      })}
    </div>
  );
};

export default HomeProgress;
