import * as React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams";
import {
  DiagramNodeModel,
  RightAnglePortModel,
  DiagramNodeProperty,
} from "./DiagramNodeModel";
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
        <div className="diagram-labeled-port" key={port.getName()}>
          <PortWidget
            className="diagram-node-port"
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
        <div className="diagram-labeled-port" key={port.getName()}>
          <div>{port.getOptions().label}</div>
          <PortWidget
            className="diagram-node-port"
            engine={this.props.engine}
            port={port}
            style={this.props.node.getPortStyle()}
          />
        </div>
      ));
    let properties;
    var nodeProps = this.props.node.getProperties();
    if (nodeProps) {
      properties = nodeProps.map((property: DiagramNodeProperty) => (
        <div className="diagram-node-property" key={property.name}>
          <div>{property.label}</div>
          <input
            type={property.type}
            style={property.inputStyle}
            {...property.inputProps}
            onChange={(event) =>
              this.props.node.setProperty(property.name, event)
            }
            onFocus={() => this.props.node.setLocked(true)}
            onBlur={() => this.props.node.setLocked(false)}
          />
        </div>
      ));
    }
    return (
      <div className="diagram-node" style={this.props.node.getStyle()}>
        <div className="diagram-node-title" style={this.props.node.getStyle()}>
          {this.props.node.getName()}
        </div>
        <div className="diagram-node-body">
          <div className="diagram-node-inputs">{input_ports}</div>
          <div className="diagram-node-properties">{properties}</div>
          <div className="diagram-node-outputs">{output_ports}</div>
        </div>
      </div>
    );
  }
}
