// interface DiagramNodePort {
//     name: string;
//     displayname: string;
// }

// interface DiagramNodeProps {
//     properties?: Object[];
//     inputs?: DiagramNodePort[];
//     outputs?: DiagramNodePort[];
// }

import * as React from "react";
import { DiagramNodeModel } from "./DiagramNodeModel";
import { DiagramNodeWidget } from "./DiagramNodeWidget";
import { AbstractReactFactory } from "@projectstorm/react-diagrams";
import { DiagramEngine } from "@projectstorm/react-diagrams";

export class DiagramNodeFactory extends AbstractReactFactory<
  DiagramNodeModel,
  DiagramEngine
> {
  constructor() {
    super("ts-custom-node");
  }

  generateModel(initialConfig) {
    return new DiagramNodeModel();
  }

  generateReactWidget(event): JSX.Element {
    return (
      <DiagramNodeWidget
        engine={this.engine as DiagramEngine}
        node={event.model}
      />
    );
  }
}
