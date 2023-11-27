export interface NodeConfig {
  name: string;
  type: string;
  menus: string[];
  definition: NodeConfigDefinition;
}

export interface NodeConfigDefinition {
  icon?: string;
  style?: object;
  portStyle?: object;
  iconStyle?: object;
  inputs?: NodeConfigInput[];
  outputs?: NodeConfigOutput[];
  properties?: object[];
}

export interface NodeConfigInput {
  name: string;
  label: string;
}

export interface NodeConfigOutput {
  name: string;
  label: string;
}

export interface NodeConfigProperty {
  name: string;
  label: string;
  type: string;
  inputProps?: Object;
  inputStyle?: object;
  value?: any;
  default?: any;
}
