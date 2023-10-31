import createEngine, {
  DefaultLinkModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import { JSCustomNodeFactory } from "../custom-nodes/custom-node-js/JSCustomNodeFactory";
import { TSCustomNodeFactory } from "../custom-nodes/custom-node-ts/TSCustomNodeFactory";
import { JSCustomNodeModel } from "../custom-nodes/custom-node-js/JSCustomNodeModel";
import { TSCustomNodeModel } from "../custom-nodes/custom-node-ts/TSCustomNodeModel";
import { CanvasWidget } from "@projectstorm/react-diagrams";
import "./Diagram.css";

export default function Diagram() {
  // create an instance of the engine
  const engine = createEngine();

  // register the two engines
  engine.getNodeFactories().registerFactory(new JSCustomNodeFactory() as any);
  engine.getNodeFactories().registerFactory(new TSCustomNodeFactory());

  // create a diagram model
  const model = new DiagramModel();

  //####################################################
  // now create two nodes of each type, and connect them

  const node1 = new JSCustomNodeModel({ color: "rgb(192,255,0)" });
  node1.setPosition(50, 50);

  const node2 = new TSCustomNodeModel({ color: "rgb(0,192,255)" });
  node2.setPosition(200, 50);

  const link1 = new DefaultLinkModel();
  link1.setSourcePort(node1.getPort("out"));
  link1.setTargetPort(node2.getPort("in"));

  model.addAll(node1, node2, link1);

  //####################################################

  // install the model into the engine
  engine.setModel(model);

  return (
    <div
      className="diagram-container"
      onDrop={(event) => {
        console.log(event.dataTransfer.getData("selected-widget"));
      }}
      onDragOver={(event) => {
        event.preventDefault();
      }}
    >
      <CanvasWidget className="canvas-widget" engine={engine} />
    </div>
  );
}
