import {
  DefaultPortModel,
  LinkModel,
  RightAngleLinkModel,
  DefaultNodeModel,
} from "@projectstorm/react-diagrams";
import { AbstractModelFactory } from "@projectstorm/react-canvas-core";

export class RightAnglePortModel extends DefaultPortModel {
  createLinkModel(factory?: AbstractModelFactory<LinkModel>) {
    return new RightAngleLinkModel();
  }
}

interface IconNodePort {
  name: string;
  label: string;
}

interface IconNodeOptions {
  style?: Object;
  icon: string;
  properties?: Object[];
  inputs?: IconNodePort[];
  outputs?: IconNodePort[];
}

export class IconNodeModel extends DefaultNodeModel {
  protected style: Object;
  protected icon: string;

  constructor(
    options: IconNodeOptions = {
      style: {},
      icon: "cloud",
    }
  ) {
    super({
      ...options,
      type: "icon-custom-node",
    });
    this.style = Object.assign(
      {
        fontSize: "48px",
        color: "black",
        textShadow: "1px 1px 3px #555555",
      },
      options.style
    );
    this.icon = options.icon;

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
            in: false,
            name: out.name,
            label: out.label,
          })
        );
      }
    }
  }

  getStyle(): Object {
    return this.style;
  }

  getIcon(): string {
    return this.icon;
  }
}
