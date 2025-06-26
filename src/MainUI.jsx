import { useEffect } from "react";
import { Link } from "wouter";
import useCurrentUrl from "./store/useCurrentUrl";

const TitleComponent = ({ isCurUrl, title }) => {
  const linkUrl = `/${title}`;

  return (
    <Link
      className={`m-5 font-[NaverFont] text-2xl cursor-pointer z-10 ${
        isCurUrl ? "text-[#e19a6e]" : "text-[#d5e1d0]"
      }`}
      to={linkUrl}
    >
      {title}
    </Link>
  );
};

const MainUI = () => {
  const pageArr = ["Home", "Naver", "Projects"];

  const { currentUrl } = useCurrentUrl();

  return (
    <div
      className={`absolute flex flex-row z-10 top-5 justify-center w-full transition-all duration-14000 ease-in`}
    >
      {pageArr.map((e) => {
        const key = `pageArr${e}`;
        return (
          <TitleComponent isCurUrl={currentUrl === e} key={key} title={e} />
        );
      })}
    </div>
  );
};

export default MainUI;
