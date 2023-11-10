import { ReactNode } from "react";
import "./SideBar.css";

interface SideBarWidgetProps {
  name: string;
  children?: ReactNode;
}

export default function SideBarWidget(props: SideBarWidgetProps) {
  return (
    <div
      className="SideBarWidget"
      draggable="true"
      onDragStart={(event) => {
        event.dataTransfer.setData("selected-widget", props.name);
      }}
    >
      {props.children}
    </div>
  );
}
