import Diagram from "./components/diagram/Diagram";
import NavBar from "./components/navbar/NavBar";
import SideBar from "./components/sidebar/SideBar";
import "./App.css";
import SideBarWidget from "./components/sidebar/SidebarWidget";

export default function App() {
  return (
    <>
      <NavBar>
        <h1>Navbar</h1>
      </NavBar>
      <div className="app-window">
        <SideBar>
          <h1>Sidebar</h1>
          <SideBarWidget name="test1">
            <div>Test1</div>
          </SideBarWidget>
          <SideBarWidget name="test2">
            <div>Test2</div>
          </SideBarWidget>
        </SideBar>
        <div className="resize-bar" />
        <Diagram />
      </div>
    </>
  );
}
