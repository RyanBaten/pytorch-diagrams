import {
  DefaultPortModel,
  LinkModel,
  RightAngleLinkModel,
  DefaultNodeModel,
  PortModel,
} from "@projectstorm/react-diagrams";
import { AbstractModelFactory } from "@projectstorm/react-canvas-core";

export class RightAnglePortModel extends DefaultPortModel {
  createLinkModel(factory?: AbstractModelFactory<LinkModel>) {
    return new RightAngleLinkModel();
  }
}

interface DiagramNodePort {
  name: string;
  label: string;
}

interface DiagramNodeOptions {
  properties?: Object[];
  inputs?: DiagramNodePort[];
  outputs?: DiagramNodePort[];
}

export class DiagramNodeModel extends DefaultNodeModel {
  constructor(options: DiagramNodeOptions = {}) {
    super({
      ...options,
      type: "ts-custom-node",
    });

    if (options.inputs) {
      for (var inp of options.inputs) {
        this.addPort(
          new RightAnglePortModel({
            in: true,
            name: inp.name,
            label: inp.label,
          })
        );
      }
    }
    if (options.outputs) {
      for (var out of options.outputs) {
        this.addPort(
          new RightAnglePortModel({
            in: true,
            name: out.name,
            label: out.label,
          })
        );
      }
    }
  }
}
