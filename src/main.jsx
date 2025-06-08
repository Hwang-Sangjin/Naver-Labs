import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter, Routes, Route } from "react-router";
import Office from "./pages/Office.jsx";

import Building from "./pages/Building.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="building" element={<Building />} />
        <Route path="office" element={<Office />} />
      </Routes>
    </ThemeProvider>
  </BrowserRouter>
);
