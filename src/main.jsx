import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter, Routes, Route } from "react-router";
import Office from "./pages/Office.jsx";
import { RecoilRoot } from "recoil";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="office" element={<Office />} />
        </Routes>
      </RecoilRoot>
    </ThemeProvider>
  </BrowserRouter>
);
