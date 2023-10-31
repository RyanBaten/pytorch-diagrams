import {
  DiagramEngine,
  DiagramModel,
  RightAngleLinkFactory,
} from "@projectstorm/react-diagrams";
import { useState } from "react";
import { JSCustomNodeFactory } from "../nodes/custom-node-js/JSCustomNodeFactory";
import { TSCustomNodeFactory } from "../nodes/custom-node-ts/TSCustomNodeFactory";
import { JSCustomNodeModel } from "../nodes/custom-node-js/JSCustomNodeModel";
import { TSCustomNodeModel } from "../nodes/custom-node-ts/TSCustomNodeModel";
import { CanvasWidget } from "@projectstorm/react-diagrams";
import "./Diagram.css";
import { DiagramNodeModel } from "../nodes/default-node/DiagramNodeModel";
import { DiagramNodeFactory } from "../nodes/default-node/DiagramNodeFactory";
import { IconNodeModel } from "../nodes/icon-node/IconNodeModel";
import { IconNodeFactory } from "../nodes/icon-node/IconNodeFactory";

interface DiagramContainerProps {
  engine: DiagramEngine;
  model: DiagramModel;
}

export default function DiagramContainer(props: DiagramContainerProps) {
  props.engine
    .getNodeFactories()
    .registerFactory(new JSCustomNodeFactory() as any);
  props.engine.getNodeFactories().registerFactory(new TSCustomNodeFactory());
  props.engine.getNodeFactories().registerFactory(new DiagramNodeFactory());
  props.engine.getNodeFactories().registerFactory(new IconNodeFactory());
  props.engine.getLinkFactories().registerFactory(new RightAngleLinkFactory());

  return (
    <div
      className="diagram-container"
      onDrop={(event) => {
        let node;
        if (event.dataTransfer.getData("selected-widget") == "test1") {
          node = new JSCustomNodeModel({ color: "rgb(192,255,0)" });
        } else if (event.dataTransfer.getData("selected-widget") == "test2") {
          node = new TSCustomNodeModel({ color: "rgb(0,192,255)" });
        } else if (event.dataTransfer.getData("selected-widget") == "test3") {
          node = new IconNodeModel({ icon: "cloud" });
        } else {
          node = new DiagramNodeModel({
            inputs: [
              { name: "inp1", label: "inp1" },
              { name: "inp2", label: "inp2" },
              { name: "inp3", label: "inp3" },
              { name: "inp4", label: "inp4" },
            ],
            outputs: [
              { name: "out1", label: "out1" },
              { name: "out2", label: "out2" },
              { name: "out3", label: "out3" },
              { name: "out4", label: "out4" },
            ],
          });
        }
        node.setPosition(props.engine.getRelativeMousePoint(event));
        props.model.addNode(node);
        props.engine.repaintCanvas();
      }}
      onDragOver={(event) => {
        event.preventDefault();
      }}
    >
      <CanvasWidget className="canvas-widget" engine={props.engine} />
    </div>
  );
}
