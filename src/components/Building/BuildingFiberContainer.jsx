import BuildingScene from "./BuildingScene";
import "./Building.css";
import { useEffect, useState } from "react";

const BuildingFiberContainer = () => {
  const sunTimeCnt = 3;
  const [sunTime, setSunTime] = useState(0);

  const changeSunTime = () => {
    setSunTime((prev) => (prev + 1) % 3);
  };

  return (
    <>
      <button
        onClick={() => {
          changeSunTime();
        }}
        className="absolute z-10"
      >
        Button
      </button>
      <BuildingScene sunTime={sunTime} />
    </>
  );
};

export default BuildingFiberContainer;
