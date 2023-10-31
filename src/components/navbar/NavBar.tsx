import { ReactNode } from "react";
import "./NavBar.css";

interface NavBarProps {
  children?: ReactNode;
}

export default function NavBar(props: NavBarProps) {
  return <div className="NavBarDiv">{props.children}</div>;
}
