import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SVGNS = "http://www.w3.org/2000/svg";
const EASE = 0.7;

const Mouse = () => {
  const svgRef = useRef([]);
  const pointer = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const updatePointer = (event) => {
    pointer.current = { x: event.clientX, y: event.clientY };
  };

  const createLine = (leader, color, index, length) => {
    const line = document.createElementNS(SVGNS, "line");
    const get = gsap.getProperty(line);
    const set = gsap.quickSetter(line, "attr");

    const genModifier = (prop) => {
      const pos2 = `${prop}2`;
      return () => {
        const linePos = get(prop);
        const leaderPos = leader(prop);
        const linePosNext = linePos + (leaderPos - linePos) * EASE;
        set({ [pos2]: leaderPos - linePosNext });
        return linePosNext;
      };
    };

    gsap.set(line, pointer.current);
    gsap.to(line, {
      x: "+=1",
      y: "+=1",
      repeat: -1,
      ease: "linear",
      modifiers: {
        x: genModifier("x"),
        y: genModifier("y"),
      },
    });

    const maxWidth = 15;
    const minWidth = 1;
    const strokeWidth =
      length > 1
        ? maxWidth - (index * (maxWidth - minWidth)) / (length - 1)
        : maxWidth;

    line.style.stroke = color;
    line.style.strokeWidth = strokeWidth;
    line.style.strokeLinecap = "round";
    return line;
  };

  const createTrail = (color, length = 10, index) => {
    const svg = document.createElementNS(SVGNS, "svg");
    let leader = (prop) =>
      prop === "x" ? pointer.current.x : pointer.current.y;

    for (let i = 0; i < length; i++) {
      const line = createLine(leader, color, i, length);
      svg.appendChild(line);
      leader = gsap.getProperty(line);
    }

    svgRef.current[index].appendChild(svg);
  };

  useEffect(() => {
    window.addEventListener("pointerdown", updatePointer);
    window.addEventListener("pointermove", updatePointer);

    // if (page === "home") {
    createTrail("orange", 30, 0);
    createTrail("yellow", 20, 1);
    createTrail("orange", 10, 2);
    // } else {
    //   createTrail("green", 30, 0);
    //   createTrail("yellow", 20, 1);
    //   createTrail("green", 10, 2);
    // }

    return () => {
      window.removeEventListener("pointerdown", updatePointer);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return (
    <div>
      <svg ref={(el) => (svgRef.current[0] = el)} className="trail-svg" />
      <svg ref={(el) => (svgRef.current[1] = el)} className="trail-svg" />
      <svg ref={(el) => (svgRef.current[2] = el)} className="trail-svg" />
    </div>
  );
};

export default Mouse;
