import { useEffect, useRef } from "react";
import useVignetteStateStore from "../../store/useVignetteStateStore";
import { useLocation } from "wouter";

const Vignette = () => {
  const [location] = useLocation(); // Get current location from wouter

  const introRef = useRef(null);

  const { vignetteStateStore, setVignetteStateStore } = useVignetteStateStore();

  useEffect(() => {
    setVignetteStateStore(true);
  }, [location]);

  useEffect(() => {
    const element = introRef.current;
    if (vignetteStateStore) {
      requestAnimationFrame(() => {
        element.classList.add("is-visible-vignette");
      });

      const hideAll = setTimeout(() => {
        element.classList.add("is-hidden");
      }, 2000);

      const setFalse = setTimeout(() => {
        setVignetteStateStore(false);
      }, 2000);

      return () => {
        clearTimeout(hideAll);
        clearTimeout(setFalse);
      };
    }
  }, [vignetteStateStore]);

  return (
    <>
      {vignetteStateStore ? (
        <div
          className="intro fixed flex flex-col items-center justify-center w-full h-full bg-[#88aa8f] z-20 top-0 left-0 right-0 bottom-0"
          ref={introRef}
        >
          {/* ... content ... */}
        </div>
      ) : null}
    </>
  );
};

export default Vignette;
