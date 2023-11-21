import * as React from "react";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams";
import { ValueNodeModel, RightAnglePortModel } from "./ValueNodeModel";
import "./ValueNodeModel.css";

export interface ValueNodeWidgetProps {
  node: ValueNodeModel;
  engine: DiagramEngine;
}

export interface ValueNodeWidgetState {}

export class ValueNodeWidget extends React.Component<
  ValueNodeWidgetProps,
  ValueNodeWidgetState
> {
  constructor(props: ValueNodeWidgetProps) {
    super(props);
    this.state = {};
  }

  render() {
    const input_ports = this.props.node
      .getInPorts()
      .map((port: RightAnglePortModel) => (
        <div className="value-labeled-port" key={port.getName()}>
          <PortWidget
            className="value-node-port"
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
        <div className="value-labeled-port" key={port.getName()}>
          <div>{port.getOptions().label}</div>
          <PortWidget
            className="value-node-port"
            engine={this.props.engine}
            port={port}
            style={this.props.node.getPortStyle()}
          />
        </div>
      ));
    return (
      <div className="value-node" style={this.props.node.getStyle()}>
        <div
          className="value-node-title"
          style={this.props.node.getStyle()}
          contentEditable="true"
          suppressContentEditableWarning={true}
          onFocus={() => this.props.node.setLocked(true)}
          onBlur={(event) => {
            this.props.node.setLocked(false);
            var newText = event.target.innerText.replace(/\n/g, "");
            if (newText == "") {
              newText = "Value";
            }
            event.target.innerText = newText;
            this.props.node.setName(newText);
          }}
        >
          {this.props.node.getName()}
        </div>
        <div className="value-node-body">
          <div className="value-node-inputs">{input_ports}</div>
          <div className="value-node-outputs">{output_ports}</div>
        </div>
      </div>
    );
  }
}
