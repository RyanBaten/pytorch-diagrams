import * as compilerConfig from "@config/compiler_config.json";
import { CompilerConfigDefinition } from "@config/compiler_config";

export class DiagramTorchCompiler {
  constructor() {}

  compile(moduleName: string, serialDiagram: Object): string {
    const [nodes, links] = this.parse(serialDiagram);
    this.insert_value_nodes(nodes, links);
    const topoNodes = this.topo(nodes, links);
    return this.generateCode(moduleName, topoNodes, nodes, links);
  }

  parse(serialDiagram: Object): Object[] {
    let nodes: Object, links: Object;
    for (var layer of Object.values(serialDiagram["layers"])) {
      if (layer["type"] === "diagram-links") links = layer;
      if (layer["type"] === "diagram-nodes") nodes = layer;
    }
    return [nodes["models"], links["models"]];
  }

  insert_value_nodes(nodes: Object, links: Object) {
    //var valueNames = this._getValueNames(nodes)
    for (var [nodeId, node] of Object.entries(nodes)) {
      if (node["type"] === "value-custom-node") continue;
      for (var port of node["ports"]) {
        if (!this._portLinksToNonvalue(nodeId, port, nodes, links)) continue;
        var [newValueNode, newNodeId, newPortIn, newPortInId, newPortOut, newPortOutId] = this._createValueNode(
          this._createUID()
        );
        let newLinkId: string, newLink: Object;
        if (port["in"]) {
          [newLinkId, newLink] = this._createLink(newNodeId, newPortOutId, nodeId, port["id"]);
          newPortOut["links"].push(newLinkId);
          for (var linkId of port["links"]) {
            var oldLink = links[linkId];
            var isSource = oldLink["source"] === nodeId;
            if (isSource) {
              oldLink["source"] = newNodeId;
              oldLink["sourcePort"] = newPortInId;
            } else {
              oldLink["target"] = newNodeId;
              oldLink["targetPort"] = newPortInId;
            }
            newPortIn["links"].push(linkId);
          }
        } else {
          [newLinkId, newLink] = this._createLink(nodeId, port["id"], newNodeId, newPortInId);
          newPortIn["links"].push(newLinkId);
          for (var linkId of port["links"]) {
            var oldLink = links[linkId];
            var isSource = oldLink["source"] === nodeId;
            if (isSource) {
              oldLink["source"] = newNodeId;
              oldLink["sourcePort"] = newPortOutId;
            } else {
              oldLink["target"] = newNodeId;
              oldLink["targetPort"] = newPortOutId;
            }
            newPortOut["links"].push(linkId);
          }
        }
        nodes[newNodeId] = newValueNode;
        links[newLinkId] = newLink;
        port["links"] = [newLinkId];
      }
    }
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
        for (var linkId of port["links"]) {
          // Parent nodes are determined by a lookup on the link between the nodes
          var parentId = links[linkId]["source"] === last["id"] ? links[linkId]["target"] : links[linkId]["source"];
          if (!visited.has(parentId)) {
            stack.push(nodes[parentId]);
          }
        }
      }
      visited.add(last["id"]);
    }
    return result;
  }

  generateCode(moduleName: string, topo: Object[], nodes: Object, links: Object): string {
    var imports = new Set();
    var fromImports = { "torch.nn": new Set(["Module"]) };
    var init = [];
    var forward = [];
    const topoValueNames = new Set(
      topo.filter((node) => node["type"] === "value-custom-node").map((node) => node["name"])
    );
    for (var node of topo) {
      // TODO: handle values linked to values
      if (!(node["name"] in compilerConfig)) continue;
      const compilerNode: CompilerConfigDefinition = compilerConfig[node["name"]];
      if (compilerNode.imports) {
        compilerNode.imports.forEach((item) => imports.add(item));
      }
      if (compilerNode.from_imports) {
        Object.entries(compilerNode.from_imports).forEach(([key, value]) => {
          if (!(key in fromImports)) fromImports[key] = new Set();
          value.forEach((item) => fromImports[key].add(item));
        });
      }
      if (compilerNode.init) {
        var properties = {};
        var parameters = "";
        if (node["properties"]) {
          properties = (node["properties"] as Array<Object>).reduce(
            (obj, item) => ((obj[item["name"]] = item), obj),
            {}
          );
          parameters = compilerNode.init?.parameters
            ?.map((parameter) => {
              const property = properties[parameter.node_property];
              let value: any;
              if ("value" in property) {
                value = property["value"];
              } else {
                value = parameter["default"];
              }
              value = this._convertToPythonValue(value);
              return parameter["keyword"] ? `${parameter["name"]}=${value}` : `${value}`;
            })
            .join(", ");
        }
        const moduleAttrName = "self." + this._createUID();
        compilerNode["forward"]["name"] = moduleAttrName;
        init.push(`${moduleAttrName} = ${compilerNode.init.module_name}(${parameters})`);
      }
      if (compilerNode.forward) {
        var parameters = "";
        const linkedValueNameMap = node["ports"].reduce((obj, port) => {
          const portLink = links[port["links"][0]];
          const linkedValueId = portLink["source"] === node["id"] ? portLink["target"] : portLink["source"];
          obj[port["name"]] = nodes[linkedValueId]["name"];
          return obj;
        }, {});
        parameters = compilerNode.forward.forward_in
          .map((inp) => {
            const value = linkedValueNameMap[inp.node_input];
            return inp.keyword ? `${inp.name}=${value}` : `${value}`;
          })
          .join(", ");
        const outputs = compilerNode.forward.forward_out
          .map((out) =>
            topoValueNames.has(linkedValueNameMap[out.node_output]) ? linkedValueNameMap[out.node_output] : "_"
          )
          .join(", ");
        // TODO: change the init module name to the name specified in the init
        forward.push(`${outputs} = ${compilerNode.forward.name}(${parameters})`);
      }
    }
    const forwardArgs = this._getAdjacentValues("Start", topo, nodes, links)
      .sort(this._compareByYValue)
      .map((node) => node["name"])
      .join(", ");
    const returnValues = this._getAdjacentValues("End", topo, nodes, links)
      .sort(this._compareByYValue)
      .map((node) => node["name"])
      .join(", ");
    var result = "";
    const importItems = Array.from(imports)
      .map((item) => `import ${item}`)
      .join("\n");
    if (importItems) result += importItems + "\n";
    const fromImportItems =
      Object.entries(fromImports)
        .map(([key, value]) => `from ${key} import ${Array.from(value).join(", ")}`)
        .join("\n") + "\n";
    if (fromImportItems) result += fromImportItems + "\n";
    result += `\nclass ${moduleName}(Module):\n    def __init__(self):\n        super(Model, self).__init__()`;
    const initItems = init.map((item) => `        ${item}`).join("\n");
    if (initItems) result += "\n" + initItems;
    result += `\n\n    def forward(${forwardArgs}):`;
    const forwardItems = forward.map((item) => `        ${item}`).join("\n");
    if (forwardItems) result += "\n" + forwardItems;
    result += `\n        return ${returnValues}`;
    return result;
  }

  _getValueNames(nodes: Object) {
    var result = new Set();
    for (var [node_id, node] of Object.entries(nodes)) {
      if (node["type"] === "value-custom-node") {
        result.add(node["name"]);
      }
    }
  }

  _portLinksToNonvalue(nodeId: string, port: Object, nodes: Object, links: Object): boolean {
    var linksToNonvalue = false;
    for (var linkId of port["links"]) {
      var isSource = links[linkId]["source"] === nodeId;
      var parentId = isSource ? links[linkId]["target"] : links[linkId]["source"];
      var parent_node = nodes[parentId];
      if (parent_node["type"] !== "value-custom-node") {
        linksToNonvalue = true;
        break;
      }
    }
    return linksToNonvalue;
  }

  _createUID() {
    // It is not recommended to create UIDs using Math.random but this is taken from react-diagrams for consistency
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  _createValueNode(valueName: string): any[] {
    const nodeId = this._createUID();
    const portInId = this._createUID();
    const portOutId = this._createUID();
    const portIn = {
      id: portInId,
      type: "default",
      name: "in",
      parentNode: nodeId,
      links: [],
      in: true,
    };
    const portOut = {
      id: portOutId,
      type: "default",
      name: "out",
      parentNode: nodeId,
      links: [],
      in: false,
    };
    const valueNode = {
      id: nodeId,
      type: "value-custom-node",
      x: 0,
      y: 0,
      ports: [portIn, portOut],
      name: valueName,
      portsInOrder: [portInId],
      portsOutOrder: [portOutId],
    };
    return [valueNode, nodeId, portIn, portInId, portOut, portOutId];
  }

  _createLink(source: string, sourcePort: string, target: string, targetPort: string): any[] {
    const linkId = this._createUID();
    const newLink = {
      id: linkId,
      source: source,
      sourcePort: sourcePort,
      target: target,
      targetPort: targetPort,
    };
    return [linkId, newLink];
  }

  _convertToPythonValue(value: any) {
    if (value === true) return "True";
    if (value === false) return "False";
    return value;
  }

  _getAdjacentValues(nodeType: string, topo: Object[], nodes: Object, links: Object): Object[] {
    var result = [];
    topo
      .filter((node) => node["name"] === nodeType)
      .forEach((node) => {
        node["ports"][0]["links"].forEach((linkId) => {
          const link = links[linkId];
          const linkNode = link["source"] === node["id"] ? nodes[link["target"]] : nodes[link["source"]];
          if (linkNode["type"] === "value-custom-node") result.push(linkNode);
        });
      });
    return result;
  }

  _compareByYValue(nodeA, nodeB) {
    if (nodeA["y"] < nodeB["y"]) return -1;
    if (nodeA["y"] > nodeB["y"]) return 1;
    return 0;
  }
}
