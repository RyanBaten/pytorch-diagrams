import * as React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams";
import { DiagramNodeModel, RightAnglePortModel } from "./DiagramNodeModel";
import "./DiagramNodeModel.css";

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
        <div className="diagram-labeled-port">
          <PortWidget
            className="diagram-node-port"
            key={port.getName()}
            engine={this.props.engine}
            port={port}
            style={this.props.node.getPortStyle()}
          />
          <div>{port.getOptions().label}</div>
        </div>
      ));
    const output_ports = this.props.node
      .getOutPorts()
      .map((port: RightAnglePortModel) => (
        <div className="diagram-labeled-port">
          <div>{port.getOptions().label}</div>
          <PortWidget
            className="diagram-node-port"
            key={port.getName()}
            engine={this.props.engine}
            port={port}
            style={this.props.node.getPortStyle()}
          />
        </div>
      ));
    return (
      <div className="diagram-node">
        <div className="diagram-node-title">{this.props.node.getName()}</div>
        <div className="diagram-node-body">
          <div className="diagram-node-inputs">{input_ports}</div>
          {/* <div className="diagram-node-properties"></div> */}
          <div className="diagram-node-outputs">{output_ports}</div>
        </div>
      </div>
    );
  }
}
