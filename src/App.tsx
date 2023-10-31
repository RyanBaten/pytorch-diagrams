import { createRoot } from "react-dom/client";
import createEngine, { DiagramModel } from "@projectstorm/react-diagrams";
import "./App.css";

import DiagramContainer from "./components/diagram/DiagramContainer";
import NavBar from "./components/navbar/NavBar";
import SideBar from "./components/sidebar/SideBar";
import SideBarWidget from "./components/sidebar/SidebarWidget";
import AppSideBar from "@components/sidebar/AppSideBar";

document.addEventListener("DOMContentLoaded", () => {
  const diagramEngine = createEngine();
  const diagramModel = new DiagramModel();
  diagramEngine.setModel(diagramModel);

  const root = createRoot(document.querySelector("#application"));
  root.render(
    <>
      <NavBar>
        <h1>Navbar</h1>
      </NavBar>
      <div className="app-window">
        {/* <SideBar>
          <h1>Sidebar</h1>
          <SideBarWidget name="test1">
            <div>GREEN</div>
          </SideBarWidget>
          <SideBarWidget name="test2">
            <div>BLUE</div>
          </SideBarWidget>
          <SideBarWidget name="test3">
            <div>ICON</div>
          </SideBarWidget>
          <SideBarWidget name="test4">
            <div>CUSTOM</div>
          </SideBarWidget>
        </SideBar> */}
        <AppSideBar />
        <div className="resize-bar" />
        <DiagramContainer engine={diagramEngine} model={diagramModel} />
      </div>
    </>
  );
});
