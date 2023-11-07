import { createRoot } from "react-dom/client";
import createEngine, { DiagramModel } from "@projectstorm/react-diagrams";
import "./App.css";

import DiagramContainer from "./components/diagram/DiagramContainer";
import NavBar from "./components/navbar/NavBar";
import AppSideBar from "@components/sidebar/AppSideBar";

document.addEventListener("DOMContentLoaded", () => {
  const diagramEngine = createEngine();
  const diagramModel = new DiagramModel();
  diagramEngine.setModel(diagramModel);

  const root = createRoot(document.querySelector("#application"));
  root.render(
    <div className="window">
      <NavBar>
        <h1>Navbar</h1>
      </NavBar>
      <div className="app-window">
        <AppSideBar />
        <div className="resize-bar" />
        <DiagramContainer engine={diagramEngine} model={diagramModel} />
      </div>
    </div>
  );
});
