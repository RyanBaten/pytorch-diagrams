export interface CompilerConfigDefinition {
  imports?: string[];
  from_imports?: object;
  init?: CompilerInitConfig;
  forward: CompilerForwardConfig;
}

export interface CompilerInitConfig {
  module_name: string;
  parameters?: CompilerInitParameters[];
}

export interface CompilerInitParameters {
  name: string;
  node_property: string;
  keyword: boolean;
}

export interface CompilerForwardConfig {
  name: string;
  forward_in: CompilerForwardInput[];
  forward_out: CompilerForwardOutput[];
}

export interface CompilerForwardInput {
  name: string;
  node_input?: string;
  property?: string;
  keyword: boolean;
}

export interface CompilerForwardOutput {
  name: string;
  node_output: string;
}
