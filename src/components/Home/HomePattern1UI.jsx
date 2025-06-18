import { useEffect, useState } from "react";

const HomePattern1UI = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`absolute flex flex-row z-10 bottom-5 justify-center w-full transition-all duration-14000 ease-in ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      } animate-bounce`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="40px"
        viewBox="0 -960 960 960"
        width="40px"
        fill="#FFFFFF"
      >
        <path d="M480-200 240-440l46.67-46.67 193.33 193 193.33-193L720-440 480-200Zm0-248.67-240-240 46.67-46.66 193.33 193 193.33-193L720-688.67l-240 240Z" />
      </svg>
    </div>
  );
};

export default HomePattern1UI;
