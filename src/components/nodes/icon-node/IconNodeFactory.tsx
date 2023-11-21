import { IconNodeModel } from "./IconNodeModel";
import { IconNodeWidget } from "./IconNodeWidget";
import { AbstractReactFactory } from "@projectstorm/react-diagrams";
import { DiagramEngine } from "@projectstorm/react-diagrams";

export class IconNodeFactory extends AbstractReactFactory<
  IconNodeModel,
  DiagramEngine
> {
  constructor() {
    super("icon-custom-node");
  }

  generateModel(initialConfig) {
    return new IconNodeModel();
  }

  generateReactWidget(event): JSX.Element {
    return (
      <IconNodeWidget
        engine={this.engine as DiagramEngine}
        node={event.model}
      />
    );
  }
}
