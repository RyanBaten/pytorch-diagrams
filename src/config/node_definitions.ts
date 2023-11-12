export interface ConfigNodeDefinition {
  name: string;
  type: string;
  menus: string[];
  definition: NodeDefinition;
}

export interface NodeDefinition {
  icon?: string;
  style?: object;
  portStyle?: object;
  iconStyle?: object;
  inputs?: object[];
  outputs?: object[];
  properties?: object[];
}
