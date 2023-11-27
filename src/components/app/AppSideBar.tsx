import SideBar from "@components/sidebar/SideBar";
import SideBarAccordion from "@components/sidebar/SideBarAccordion";
import SideBarWidget from "@components/sidebar/SideBarWidget";
import { NodeConfig } from "@config/NodeConfig";

import * as NodeConfigItems from "@config/NodeConfig.json";

export default function AppSideBar() {
  const sideBarItems = NodeConfigItems.node_menus.map((menuName: string) => {
    return (
      <SideBarAccordion title={menuName} key={menuName} open={menuName === "common"}>
        {NodeConfigItems.node_definitions.map((nodeDefinition: NodeConfig) => {
          return (
            nodeDefinition.menus.includes(menuName) && (
              <SideBarWidget name={nodeDefinition.name} key={nodeDefinition.name}>
                {nodeDefinition.name}
              </SideBarWidget>
            )
          );
        })}
      </SideBarAccordion>
    );
  });
  return <SideBar>{sideBarItems}</SideBar>;
}
