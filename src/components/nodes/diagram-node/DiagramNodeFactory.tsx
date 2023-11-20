import { DiagramNodeModel } from "./DiagramNodeModel";
import { DiagramNodeWidget } from "./DiagramNodeWidget";
import { AbstractReactFactory } from "@projectstorm/react-diagrams";
import { DiagramEngine } from "@projectstorm/react-diagrams";

export class DiagramNodeFactory extends AbstractReactFactory<
  DiagramNodeModel,
  DiagramEngine
> {
  constructor() {
    super("diagram-custom-node");
  }

  generateModel(initialConfig) {
    console.log(initialConfig);
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
