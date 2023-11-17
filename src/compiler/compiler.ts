import * as compilerConfig from "@config/compiler_config.json";
import { CompilerConfigDefinition } from "@config/compiler_config";

export class DiagramTorchCompiler {
  constructor() {}

  compile(serial_diagram: Object): string {
    const [nodes, links] = this.parse(serial_diagram);
    // insert value nodes between non-values?
    const topo_nodes = this.topo(nodes, links);
    return this.generate_code(topo_nodes, nodes, links);
  }

  parse(serial_diagram: Object): Object[] {
    let nodes: Object, links: Object;
    for (var layer of Object.values(serial_diagram["layers"])) {
      if (layer["type"] === "diagram-links") links = layer;
      if (layer["type"] === "diagram-nodes") nodes = layer;
    }
    return [nodes["models"], links["models"]];
  }

  topo(nodes: Object, links: Object): Object[] {
    var result = [];
    var stack = Object.values(nodes).filter((node) => node["name"] == "End");
    var visited = new Set();
    while (stack.length != 0) {
      var last = stack[stack.length - 1];
      if (visited.has(last["id"])) {
        stack.pop();
        result.push(last);
        continue;
      }
      for (var port of last["ports"]) {
        if (!port["in"]) continue;
        for (var link_id of port["links"]) {
          // Parent nodes are determined by a lookup on the link between the nodes
          var parent_id =
            links[link_id]["source"] === last["id"]
              ? links[link_id]["target"]
              : links[link_id]["source"];
          if (!visited.has(parent_id)) {
            stack.push(nodes[parent_id]);
          }
        }
      }
      visited.add(last["id"]);
    }
    return result;
  }

  generate_code(topo: Object[], nodes: Object, links: Object): string {
    var imports = new Set();
    var from_imports = { "torch.nn": new Set(["Module"]) };
    var init = [];
    var forward = [];
    for (var node of topo) {
      if (!(node["name"] in compilerConfig)) continue;
      const compiler_node: CompilerConfigDefinition =
        compilerConfig[node["name"]];
      if (compiler_node.imports) {
        compiler_node.imports.forEach((item) => imports.add(item));
      }
      if (compiler_node.from_imports) {
        Object.entries(compiler_node.from_imports).forEach(([key, value]) => {
          if (!(key in from_imports)) from_imports[key] = new Set();
          value.forEach((item) => from_imports[key].add(item));
        });
      }
      if (compiler_node.init) {
        init.push(`a = ${compiler_node.init.module_name}()`);
      }
      if (compiler_node.forward) {
        forward.push(`a = ${compiler_node.init.module_name}(a)`);
      }
    }
    var result = "";
    result += Array.from(imports)
      .map((item) => `import ${item}`)
      .join("\n");
    result += Object.entries(from_imports)
      .map(
        ([key, value]) => `from ${key} import ${Array.from(value).join(", ")}`
      )
      .join("\n");
    result += "\n\n";
    // TODO: the code generation for the module
    return result;
  }
}
