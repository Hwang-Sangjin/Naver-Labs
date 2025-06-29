import * as React from "react";
import { useEffect, useRef } from "react";
import "./Loading.css";
import useLoadingStateStore from "../../store/useLoadingStateStore";

const Loading = () => {
  const introRef = useRef(null);
  const subtitleRef = useRef(null);
  const { loadingStateStore, setLoadingStateStore } = useLoadingStateStore();

  useEffect(() => {
    const element = introRef.current;
    const subtitle = subtitleRef.current;
    if (element && subtitle) {
      requestAnimationFrame(() => {
        element.classList.add("is-visible");
      });

      const showSubtitle = setTimeout(() => {
        subtitle.classList.add("show");
      }, 2000);

      const hideAll = setTimeout(() => {
        element.classList.add("is-hidden");
      }, 6000);

      const hideComponent = setTimeout(() => {
        setLoadingStateStore(true);
      }, 10000);

      return () => {
        clearTimeout(showSubtitle);
        clearTimeout(hideAll);
        clearTimeout(hideComponent);
      };
    }
  }, []);

  return (
    <>
      {loadingStateStore ? null : (
        <div
          className="intro absolute flex flex-col items-center justify-center w-full h-full bg-[#133238] z-50"
          ref={introRef}
        >
          <h1 className="title font-[NaverFont] text-9xl font-black text-[#011008] z-[100]">
            Naver Labs
          </h1>
          <img
            className="sub-title-1  z-[100] mt-20"
            ref={subtitleRef}
            src="https://recruit.navercorp.com/share/tmplat/naver/img/main/slogan.svg"
          />

          <div
            className="absolute bottom-10 font-[NaverFont] cursor-pointer text-[#73c69775] text-2xl"
            onClick={() => {
              window.open("https://www.instagram.com/eudaimoniajin/", "_blank");
            }}
          >
            developer jin
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
