import SideBar from "@components/sidebar/SideBar";
import SideBarAccordion from "@components/sidebar/SideBarAccordion";
import SideBarWidget from "@components/sidebar/SidebarWidget";
import { ConfigNodeDefinition } from "@config/node_definitions";

import * as nodeDefinitions from "@config/node_definitions.json";

export default function AppSideBar() {
  const sideBarItems = nodeDefinitions["node_menus"].map((menuName: string) => {
    return (
      <SideBarAccordion
        title={menuName}
        key={menuName}
        open={menuName === "common"}
      >
        {nodeDefinitions["node_definitions"].map(
          (nodeDefinition: ConfigNodeDefinition) => {
            return (
              nodeDefinition["menus"].includes(menuName) && (
                <SideBarWidget
                  name={nodeDefinition.name}
                  key={nodeDefinition.name}
                >
                  {nodeDefinition.name}
                </SideBarWidget>
              )
            );
          }
        )}
      </SideBarAccordion>
    );
  });
  return <SideBar>{sideBarItems}</SideBar>;
}
