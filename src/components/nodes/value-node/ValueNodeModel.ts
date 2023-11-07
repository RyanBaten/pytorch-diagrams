import {
  DefaultPortModel,
  LinkModel,
  RightAngleLinkModel,
  DefaultNodeModel,
} from "@projectstorm/react-diagrams";
import { AbstractModelFactory } from "@projectstorm/react-canvas-core";
import { ObjectLiteralElement } from "typescript";

export class RightAnglePortModel extends DefaultPortModel {
  createLinkModel(factory?: AbstractModelFactory<LinkModel>) {
    return new RightAngleLinkModel();
  }
}

interface ValueNodePort {
  name: string;
  label: string;
}

interface ValueNodeOptions {
  name: string;
  style?: Object;
  portStyle?: Object;
  inputs?: ValueNodePort[];
  outputs?: ValueNodePort[];
}

export class ValueNodeModel extends DefaultNodeModel {
  protected name: string;
  protected style: Object;
  protected portStyle: Object;

  constructor(options: ValueNodeOptions = { name: "Value" }) {
    super({
      ...options,
      type: "value-custom-node",
    });
    this.name = options.name;
    this.style = options.style;
    this.portStyle = options.portStyle;
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

  setName(name: string) {
    this.name = name;
  }

  getStyle(): Object {
    return this.style;
  }

  getPortStyle(): Object {
    return this.portStyle;
  }
}
