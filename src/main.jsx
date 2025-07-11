import { createRoot } from "react-dom/client";
import "./index.css";
import MainPage from "./pages/MainPage.jsx";
import { ThemeProvider } from "@material-tailwind/react";
import MainUI from "./MainUI.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <MainPage />
    <MainUI />
  </ThemeProvider>
);
