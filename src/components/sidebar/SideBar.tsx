import { ReactNode } from "react";
import "./SideBar.css";

interface SideBarProps {
  children?: ReactNode;
}

export default function SideBar(props: SideBarProps) {
  return <div className="SideBarDiv">{props.children}</div>;
}
