import { createRoot } from "react-dom/client";
import createEngine, { DiagramModel } from "@projectstorm/react-diagrams";
import "./App.css";

import DiagramContainer from "./components/diagram/DiagramContainer";
import AppNavBar from "@components/app/AppNavBar";
import AppSideBar from "@components/app/AppSideBar";

import { DefaultDiagramState } from "@projectstorm/react-diagrams";

document.addEventListener("DOMContentLoaded", () => {
  const diagramEngine = createEngine();
  const state = diagramEngine.getStateMachine().getCurrentState();
  if (state instanceof DefaultDiagramState) {
    state.dragNewLink.config.allowLooseLinks = false;
  }
  const diagramModel = new DiagramModel();
  diagramEngine.setModel(diagramModel);

  const root = createRoot(document.querySelector("#application"));
  root.render(
    <div className="window">
      <AppNavBar engine={diagramEngine} />
      <div className="app-window">
        <AppSideBar />
        <DiagramContainer engine={diagramEngine} />
      </div>
    </div>
  );
});
