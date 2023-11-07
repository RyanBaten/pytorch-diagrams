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
  name: string;
  style?: Object;
  portStyle?: Object;
  icon?: string;
  iconStyle?: Object;
  properties?: Object[];
  inputs?: IconNodePort[];
  outputs?: IconNodePort[];
}

export class IconNodeModel extends DefaultNodeModel {
  protected name: string;
  protected style: Object;
  protected portStyle: Object;
  protected icon: string;
  protected iconStyle: Object;

  constructor(
    options: IconNodeOptions = {
      name: "",
      style: {},
      icon: "cloud",
    }
  ) {
    super({
      ...options,
      type: "icon-custom-node",
    });
    this.name = options.name;
    this.style = options.style;
    this.portStyle = options.portStyle;
    this.iconStyle = Object.assign(
      {
        fontSize: "48px",
        color: "black",
      },
      options.iconStyle
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

  getName(): string {
    return this.name;
  }

  getStyle(): Object {
    return this.style;
  }

  getPortStyle(): Object {
    return this.portStyle;
  }

  getIconStyle(): Object {
    return this.iconStyle;
  }

  getIcon(): string {
    return this.icon;
  }
}
