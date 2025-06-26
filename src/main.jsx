import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import MainUI from "./MainUI.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <Home />
    <MainUI />
  </ThemeProvider>
);
