import { ValueNodeModel } from "./ValueNodeModel";
import { ValueNodeWidget } from "./ValueNodeWidget";
import { AbstractReactFactory } from "@projectstorm/react-diagrams";
import { DiagramEngine } from "@projectstorm/react-diagrams";

export class ValueNodeFactory extends AbstractReactFactory<
  ValueNodeModel,
  DiagramEngine
> {
  constructor() {
    super("value-custom-node");
  }

  generateModel(initialConfig) {
    return new ValueNodeModel();
  }

  generateReactWidget(event): JSX.Element {
    return (
      <ValueNodeWidget
        engine={this.engine as DiagramEngine}
        node={event.model}
      />
    );
  }
}
