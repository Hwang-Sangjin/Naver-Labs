import BuildingScene from "./BuildingScene";
import "./Building.css";
import { useState } from "react";
import Loading from "../Loading/Loading";

const BuildingFiberContainer = () => {
  const [sunTime, setSunTime] = useState(0);

  const changeSunTime = () => {
    setSunTime((prev) => (prev + 1) % 3);
  };

  return (
    <div className="relative w-full h-full">
      <Loading />
      <button
        onClick={changeSunTime}
        className="absolute z-10 top-2 right-2 bg-green-300 text-white px-4 py-2 rounded"
      >
        시간
      </button>
      <BuildingScene sunTime={sunTime} />
    </div>
  );
};

export default BuildingFiberContainer;
