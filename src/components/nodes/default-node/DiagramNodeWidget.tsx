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

  input_ports = this.props.node
    .getInPorts()
    .map((port: RightAnglePortModel) => (
      <PortWidget engine={this.props.engine} port={port}></PortWidget>
    ));

  output_ports = this.props.node
    .getInPorts()
    .map((port: RightAnglePortModel) => (
      <PortWidget engine={this.props.engine} port={port}></PortWidget>
    ));

  render() {
    return (
      <div className="custom-node">
        {this.input_ports}
        {this.output_ports}
        <div className="custom-node-color" />
      </div>
    );
  }
}
