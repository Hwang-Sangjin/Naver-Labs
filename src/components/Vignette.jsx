import { useEffect, useRef } from "react";
import useVignetteStateStore from "../store/useVignetteStateStore";

const Vignette = () => {
  const introRef = useRef(null);

  const { vignetteStateStore, setVignetteStateStore } = useVignetteStateStore();

  useEffect(() => {
    const element = introRef.current;
    if (vignetteStateStore) {
      requestAnimationFrame(() => {
        element.classList.add("is-visible");
      });
    }
  }, [vignetteStateStore]);

  return (
    <>
      {vignetteStateStore ? (
        <div
          className="intro fixed flex flex-col items-center justify-center w-full h-full bg-[#88aa8f] z-50 top-0 left-0 right-0 bottom-0"
          ref={introRef}
        ></div>
      ) : null}
    </>
  );
};

export default Vignette;
