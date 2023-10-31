import * as React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams";
import { IconNodeModel, RightAnglePortModel } from "./IconNodeModel";

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
      <div className="icon-node">
        {input_ports}
        <div
          className="material-symbols-outlined"
          style={this.props.node.getStyle()}
        >
          {this.props.node.getIcon()}
        </div>
        {output_ports}
      </div>
    );
  }
}
