import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App";

document.addEventListener("DOMContentLoaded", () => {
  const root = createRoot(document.querySelector("#application"));
  root.render(App());
});
