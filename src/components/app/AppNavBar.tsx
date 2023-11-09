import NavBar from "../navbar/NavBar";
import "./AppNavBar.css";

import * as logo from "@assets/logo.png";

import VerticalMenu from "@components/menu/VerticalMenu";

export default function AppNavBar() {
  return (
    <NavBar>
      <img src={logo} className="logo" />
      <div className="app-navbar-menus">
        <VerticalMenu title="File">
          <div>New</div>
          <div>Export</div>
        </VerticalMenu>
        <VerticalMenu title="Edit">
          <div>test1</div>
          <div>test2</div>
        </VerticalMenu>
        <VerticalMenu title="Other">
          <div>test1</div>
          <div>test2</div>
        </VerticalMenu>
      </div>
    </NavBar>
  );
}
