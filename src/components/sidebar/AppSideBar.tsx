import SideBar from "./SideBar";
import SideBarWidget from "./SidebarWidget";

import * as nodeDefinitions from "@config/node_definitions.json";

export default function AppSideBar() {
  const widgets = nodeDefinitions.map((nodeDefinition) => {
    return (
      <SideBarWidget name={nodeDefinition.name} key={nodeDefinition.name}>
        {nodeDefinition.name}
      </SideBarWidget>
    );
  });
  return <SideBar>{widgets}</SideBar>;
}
