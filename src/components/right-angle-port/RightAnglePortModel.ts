import {
  DefaultPortModel,
  LinkModel,
  RightAngleLinkModel,
  PortModelAlignment,
  DefaultPortModelOptions,
} from "@projectstorm/react-diagrams";
import { AbstractModelFactory } from "@projectstorm/react-canvas-core";

export class RightAnglePortModel extends DefaultPortModel {
  constructor(isIn: boolean, name?: string, label?: string);
  constructor(options: DefaultPortModelOptions);
  constructor(options: DefaultPortModelOptions | boolean, name?: string, label?: string) {
    if (!!name) {
      options = {
        in: !!options,
        name: name,
        label: label,
      };
    }
    options = options as DefaultPortModelOptions;
    super({
      label: options.label || options.name,
      alignment: options.in ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT,
      type: "rightangle",
      ...options,
    });
  }

  createLinkModel(factory?: AbstractModelFactory<LinkModel>) {
    return new RightAngleLinkModel();
  }
}
