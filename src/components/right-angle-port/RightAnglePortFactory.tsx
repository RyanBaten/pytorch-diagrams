import { RightAnglePortModel } from "./RightAnglePortModel";
import { AbstractModelFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";

export default class DefaultPortFactory extends AbstractModelFactory<RightAnglePortModel, DiagramEngine> {
  constructor() {
    super("rightangle");
  }

  generateModel(): RightAnglePortModel {
    return new RightAnglePortModel({
      name: "unknown",
    });
  }
}
