export interface CompilerConfig {
  [key: string]: CompilerConfigItem[];
}

export interface CompilerConfigItem {
  imports?: string[];
  from_imports?: CompilerConfigFromImports;
  init?: CompilerConfigInit;
  forward: CompilerConfigForward;
}

export interface CompilerConfigFromImports {
  [key: string]: string[];
}

export interface CompilerConfigInit {
  module_name: string;
  parameters?: CompilerConfigInitParameters[];
}

export interface CompilerConfigInitParameters {
  name: string;
  node_property: string;
  keyword: boolean;
  default: any;
}

export interface CompilerConfigForward {
  name: string;
  forward_in: CompilerConfigForwardInput[];
  forward_out: CompilerConfigForwardOutput[];
}

export interface CompilerConfigForwardInput {
  name: string;
  const?: boolean;
  node_input?: string;
  property?: string;
  default?: any;
  keyword: boolean;
}

export interface CompilerConfigForwardOutput {
  name: string;
  node_output: string;
}
