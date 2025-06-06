import * as React from "react";
import { useProgress } from "@react-three/drei";
import "./Loading.css";
import { useEffect } from "react";
import { useRef } from "react";
import { gsap } from "gsap";
import { useState } from "react";

const Loading = () => {
  const loadingRef = useRef();
  const { active, progress } = useProgress();
  const [start, setStart] = useState(true);

  useEffect(() => {
    if (progress === 100) {
      if (loadingRef.current) {
        loadingRef.current.classList.add("ended");
        loadingRef.current.style.transform = "";
      }
    } else if (loadingRef.current) {
      loadingRef.current.style.transform = `scaleX(${progress / 100})`;
    }
  }, [progress]);

  return (
    <>
      {start ? (
        <div className="absolute text-center w-full h-full bg-[#b6e4a8] z-50">
          <button
            onClick={() => {
              setStart(false);
            }}
            className="z-100 relative top-1/3 m-auto pointer  text-6xl text-orange-300"
            disabled={progress < 100}
          >
            The Book!
          </button>
          <button
            onClick={() => {
              setStart(false);
            }}
            visible={progress >= 100 ? "true" : "false"}
            className="z-100 absolute top-2/3 left-1/2 pointer NaverFont text-3xl text-orange-300"
          >
            책님!
          </button>
          <div ref={loadingRef} className="loading-bar"></div>
        </div>
      ) : null}
    </>
  );
};

export default Loading;
