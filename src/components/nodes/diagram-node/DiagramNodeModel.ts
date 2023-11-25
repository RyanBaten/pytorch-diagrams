import { DefaultNodeModel, DeserializeEvent, PortModelAlignment } from "@projectstorm/react-diagrams";
import { RightAnglePortModel } from "@components/right-angle-port/RightAnglePortModel";

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
            alignment: PortModelAlignment.LEFT,
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
            alignment: PortModelAlignment.RIGHT,
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

  getProperty(propName: string): any {
    for (var prop of this.properties) {
      if (prop.name == propName) {
        return prop.value;
      }
    }
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
  }

  serialize(): any {
    return {
      ...super.serialize(),
      name: this.name,
      style: this.style,
      portStyle: this.portStyle,
      properties: this.properties,
    };
  }

  deserialize(event: DeserializeEvent<this>) {
    super.deserialize(event);
    this.name = event.data.name;
    this.style = event.data.style;
    this.portStyle = event.data.portStyle;
    this.properties = event.data.properties;
  }
}
