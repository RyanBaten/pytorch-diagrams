import {
  DiagramEngine,
  RightAngleLinkFactory,
} from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-diagrams";
import "./Diagram.css";
import { DiagramNodeModel } from "@components/nodes/diagram-node/DiagramNodeModel";
import { DiagramNodeFactory } from "@components/nodes/diagram-node/DiagramNodeFactory";
import { IconNodeModel } from "@components/nodes/icon-node/IconNodeModel";
import { IconNodeFactory } from "@components/nodes/icon-node/IconNodeFactory";
import { ValueNodeModel } from "@components/nodes/value-node/ValueNodeModel";
import { ValueNodeFactory } from "@components/nodes/value-node/ValueNodeFactory";

import * as nodeDefinitions from "@config/node_definitions.json";

interface DiagramContainerProps {
  engine: DiagramEngine;
}

export default function DiagramContainer(props: DiagramContainerProps) {
  props.engine.getNodeFactories().registerFactory(new DiagramNodeFactory());
  props.engine.getNodeFactories().registerFactory(new IconNodeFactory());
  props.engine.getNodeFactories().registerFactory(new ValueNodeFactory());
  props.engine.getLinkFactories().registerFactory(new RightAngleLinkFactory());

  const createNode = (name) => {
    const nodeConfig = nodeDefinitions["node_definitions"].find(
      (node) => node.name == name
    );
    if (!nodeConfig) return;
    const typeMap = {
      icon: IconNodeModel,
      diagram: DiagramNodeModel,
      value: ValueNodeModel,
    };
    const nodeType = typeMap[nodeConfig.type];
    return new nodeType({ ...nodeConfig.definition, name: name });
  };

  return (
    <div
      className="diagram-container"
      onDrop={(event) => {
        const node = createNode(event.dataTransfer.getData("selected-widget"));
        if (node) {
          node.setPosition(props.engine.getRelativeMousePoint(event));
          props.engine.getModel().addNode(node);
          props.engine.repaintCanvas();
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
      }}
    >
      <CanvasWidget className="canvas-widget" engine={props.engine} />
    </div>
  );
}
