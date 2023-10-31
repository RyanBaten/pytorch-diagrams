import * as React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams";
import { IconNodeModel, RightAnglePortModel } from "./IconNodeModel";
import "./IconNodeModel.css";

export interface IconNodeWidgetProps {
  node: IconNodeModel;
  engine: DiagramEngine;
}

export interface IconNodeWidgetState {}

export class IconNodeWidget extends React.Component<
  IconNodeWidgetProps,
  IconNodeWidgetState
> {
  constructor(props: IconNodeWidgetProps) {
    super(props);
    this.state = {};
  }

  render() {
    const input_ports = this.props.node
      .getInPorts()
      .map((port: RightAnglePortModel) => (
        <PortWidget
          className="icon-node-port"
          key={port.getName()}
          engine={this.props.engine}
          port={port}
        />
      ));
    const output_ports = this.props.node
      .getOutPorts()
      .map((port: RightAnglePortModel) => (
        <PortWidget
          className="icon-node-port"
          key={port.getName()}
          engine={this.props.engine}
          port={port}
        />
      ));
    return (
      <div className="icon-node">
        <div className="icon-inputs">{input_ports}</div>
        <div
          className="material-symbols-outlined"
          style={this.props.node.getStyle()}
        >
          {this.props.node.getIcon()}
        </div>
        <div className="icon-outputs">{output_ports}</div>
      </div>
    );
  }
}
