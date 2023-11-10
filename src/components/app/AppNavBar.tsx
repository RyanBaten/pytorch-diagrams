import NavBar from "../navbar/NavBar";
import "./AppNavBar.css";

import * as logo from "@assets/logo.png";

import { DiagramEngine, DiagramModel } from "@projectstorm/react-diagrams";
import VerticalMenu from "@components/menu/VerticalMenu";
import { useState } from "react";
import { EditableLabel } from "@components/editablelabel/editablelabel";

interface AppNavBarProps {
  engine: DiagramEngine;
}

export default function AppNavBar(props: AppNavBarProps) {
  const documentTitle = new EditableLabel({
    default: "model_diagram",
  });

  const newModel = () => {
    if (confirm("This will clear the current diagram. Are you sure?")) {
      props.engine.setModel(new DiagramModel());
    }
  };

  const importDiagram = () => {
    // The menu will blur when a button is pressed.
    // As a workaround, the input element is dynamically created and handled separately.
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.addEventListener("change", (event) => {
      const reader = new FileReader();
      reader.readAsText((event.target as HTMLInputElement).files[0]);
      reader.onload = (e) => {
        console.log(e.target.result);
        let model = new DiagramModel();
        model.deserializeModel(
          JSON.parse(e.target.result as string),
          props.engine
        );
        props.engine.setModel(model);
      };
    });
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  };

  const exportDiagram = () => {
    const blob = new Blob(
      [JSON.stringify(props.engine.getModel().serialize(), null, 2)],
      { type: "application/json" }
    );
    const href = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = documentTitle.getContent() + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const zoomToFit = () => {
    props.engine.zoomToFit();
  };

  return (
    <NavBar>
      <img src={logo} className="logo" />
      <div className="app-navbar-menus">
        <VerticalMenu title="File">
          <div onClick={newModel}>New</div>
          <div onClick={importDiagram}>Import Diagram</div>
          <div onClick={exportDiagram}>Export Diagram</div>
        </VerticalMenu>
        <VerticalMenu title="View">
          <div onClick={zoomToFit}>Zoom to Fit</div>
        </VerticalMenu>
      </div>
      <div className="app-document-title">{documentTitle.render()}</div>
    </NavBar>
  );
}
