export class DiagramTorchCompiler {
  constructor() {}

  compile(serial_diagram: Object): string {
    const [nodes, links] = this.parse(serial_diagram);
    console.log(this.topo(nodes, links));
    // Create dummy end node
    // Topo sort
    // Nodes to module

    return "";
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

  parse(serial_diagram: Object): Object[] {
    let nodes: Object, links: Object;
    for (var layer of Object.values(serial_diagram["layers"])) {
      if (layer["type"] === "diagram-links") links = layer;
      if (layer["type"] === "diagram-nodes") nodes = layer;
    }
    return [nodes["models"], links["models"]];
  }
}
