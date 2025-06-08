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
        <div className="absolute text-center w-full h-full bg-[#133238] z-50">
          <button
            onClick={() => {
              setStart(false);
            }}
            visible={progress >= 100 ? "true" : "false"}
            className="z-100 absolute top-1/3  pointer font-[NaverFont] text-5xl text-[#14cf64]"
          >
            네이버
          </button>
          <div ref={loadingRef} className="loading-bar"></div>
        </div>
      ) : null}
    </>
  );
};

export default Loading;
