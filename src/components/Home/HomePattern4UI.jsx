import { useEffect, useState } from "react";
import useHomePattern4Rotation from "../../store/useHomePattern4Rotation";

const HomePattern4UI = () => {
  const { homePattern4Rotation, setHomePattern4Rotation } =
    useHomePattern4Rotation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const onClickRotation = (dir) => {
    setHomePattern4Rotation([
      (homePattern4Rotation[0] + dir + 4) % 4,
      homePattern4Rotation[0],
    ]);
  };

  return (
    <div
      className={`absolute flex flex-row z-10 bottom-5 justify-center w-full transition-all duration-4000 ease-in ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
    >
      <div onClick={() => onClickRotation(-1)} className="m-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          viewBox="0 -960 960 960"
          width="40px"
          fill="#FFFFFF"
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
          fill="#FFFFFF"
        >
          <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </svg>
      </div>
    </div>
  );
};

export default HomePattern4UI;
