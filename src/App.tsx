import { createRoot } from "react-dom/client";
import createEngine, { DiagramModel } from "@projectstorm/react-diagrams";
import "./App.css";

import DiagramContainer from "./components/diagram/DiagramContainer";
import AppNavBar from "@components/app/AppNavBar";
import AppSideBar from "@components/app/AppSideBar";

document.addEventListener("DOMContentLoaded", () => {
  const diagramEngine = createEngine();
  const diagramModel = new DiagramModel();
  diagramEngine.setModel(diagramModel);

  const root = createRoot(document.querySelector("#application"));
  root.render(
    <div className="window">
      <AppNavBar />
      <div className="app-window">
        <AppSideBar />
        <div className="resize-bar" />
        <DiagramContainer engine={diagramEngine} model={diagramModel} />
      </div>
    </div>
  );
});
