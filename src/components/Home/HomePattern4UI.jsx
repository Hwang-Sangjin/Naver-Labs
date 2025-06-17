import { useEffect } from "react";
import useHomePattern4Rotation from "../../store/useHomePattern4Rotation";

const HomePattern4UI = () => {
  const { homePattern4Rotation, setHomePattern4Rotation } =
    useHomePattern4Rotation();

  const onClickRotation = (dir) => {
    setHomePattern4Rotation(homePattern4Rotation + (dir * Math.PI) / 2);
  };

  return (
    <div className="absolute flex flex-row z-10 bottom-5 justify-center w-full">
      <div onClick={() => onClickRotation(-1)} className="m-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 -960 960 960"
          width="40px"
          fill="#000000"
        >
          <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
      </div>
      <div onClick={() => onClickRotation(1)} className="m-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 -960 960 960"
          width="40px"
          fill="#000000"
        >
          <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </svg>
      </div>
    </div>
  );
};

export default HomePattern4UI;
