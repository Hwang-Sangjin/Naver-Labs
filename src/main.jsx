import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter, Routes, Route } from "react-router";
import Office from "./pages/Office.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="office" element={<Office />} />
      </Routes>
    </ThemeProvider>
  </BrowserRouter>
);
