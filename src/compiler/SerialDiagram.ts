import { NodeConfigProperty } from "@config/NodeConfig";

export interface SerialDiagramNodes {
  id: string;
  type: string;
  isSvg: boolean;
  transformed: boolean;
  models: SerialDiagramNodeModels;
}

export interface SerialDiagramNodeModels {
  [key: string]: SerialDiagramNodeModel;
}

export interface SerialDiagramNodeModel {
  id: string;
  locked: boolean;
  type: string;
  selected: boolean;
  x: number;
  y: number;
  ports: SerialDiagramNodeModelPort[];
  name: string;
  color: string;
  portsInOrder: string[];
  portsOutOrder: string[];
  style?: Object;
  icon?: string;
  iconStyle?: Object;
  portStyle?: Object;
  properties?: NodeConfigProperty;
}

export interface SerialDiagramNodeModelPort {
  id: string;
  type: string;
  x: number;
  y: number;
  name: string;
  alignment: string;
  parentNode: string;
  links: string[];
  in: boolean;
  label: string;
}

export interface SerialDiagramLinks {
  id: string;
  type: string;
  isSvg: boolean;
  transformed: boolean;
  models: SerialDiagramLinkModels;
}

export interface SerialDiagramLinkModels {
  [key: string]: SerialDiagramLinkModel;
}

export interface SerialDiagramLinkModel {
  id: string;
  type: string;
  selected: boolean;
  source: string;
  sourcePort: string;
  target: string;
  targetPort: string;
  points: SerialDiagramLinkPoint[];
  labels: string[];
  width: number;
  color: string;
  curvyness: number;
  selectedColor: string;
}

export interface SerialDiagramLinkPoint {
  id: string;
  type: string;
  x: number;
  y: number;
}
