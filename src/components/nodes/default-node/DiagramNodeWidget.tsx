import * as React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams";
import { DiagramNodeModel, RightAnglePortModel } from "./DiagramNodeModel";

export interface DiagramNodeWidgetProps {
  node: DiagramNodeModel;
  engine: DiagramEngine;
}

export interface DiagramNodeWidgetState {}

export class DiagramNodeWidget extends React.Component<
  DiagramNodeWidgetProps,
  DiagramNodeWidgetState
> {
  constructor(props: DiagramNodeWidgetProps) {
    super(props);
    this.state = {};
  }

  render() {
    const input_ports = this.props.node
      .getInPorts()
      .map((port: RightAnglePortModel) => (
        <PortWidget key={port.getName()} engine={this.props.engine} port={port}>
          <div className="circle-port" />
        </PortWidget>
      ));
    const output_ports = this.props.node
      .getOutPorts()
      .map((port: RightAnglePortModel) => (
        <PortWidget key={port.getName()} engine={this.props.engine} port={port}>
          <div className="circle-port" />
        </PortWidget>
      ));
    return (
      <div className="custom-node">
        <div className="diagram-node-inputs">{input_ports}</div>
        <div className="diagram-node-outputs">{output_ports}</div>
      </div>
    );
  }
}
