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

interface DiagramNodePort {
  name: string;
  label: string;
}

export interface DiagramNodeProperty {
  name: string;
  label: string;
  type: string;
  inputProps?: Object;
  inputStyle?: Object;
  value?: any;
}

interface DiagramNodeOptions {
  name: string;
  style?: Object;
  portStyle?: Object;
  properties?: DiagramNodeProperty[];
  inputs?: DiagramNodePort[];
  outputs?: DiagramNodePort[];
}

export class DiagramNodeModel extends DefaultNodeModel {
  protected name: string;
  protected style: Object;
  protected portStyle: Object;
  protected properties: DiagramNodeProperty[];

  constructor(options: DiagramNodeOptions = { name: "" }) {
    super({
      ...options,
      type: "diagram-custom-node",
    });
    this.name = options.name;
    this.style = options.style;
    this.portStyle = options.portStyle;
    this.properties = options.properties;
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

  getProperties(): DiagramNodeProperty[] | undefined {
    return this.properties;
  }

  setProperty(propName: string, event: any) {
    for (var prop of this.properties) {
      if (prop.name == propName) {
        if (prop.type == "checkbox") {
          prop.value = event.target.checked;
        } else {
          prop.value = event.target.value;
        }
        break;
      }
    }
    // console.log(this.properties);
  }
}
