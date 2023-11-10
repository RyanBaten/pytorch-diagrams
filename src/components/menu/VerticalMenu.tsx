import "./VerticalMenu.css";
import { ReactNode, useState } from "react";

interface VerticalMenuProps {
  title: string;
  children?: ReactNode;
}

export default function VerticalMenu(props: VerticalMenuProps) {
  const [menuStatus, setMenuStatus] = useState(false);

  return (
    <div
      className="vertical-menu"
      onBlur={(event) => {
        if (menuStatus && !event.currentTarget.contains(event.relatedTarget)) {
          setMenuStatus(false);
        }
      }}
    >
      <button
        className="vertical-menu-button"
        onClick={() => setMenuStatus(!menuStatus)}
      >
        {props.title}
      </button>
      {menuStatus && (
        <div
          className="vertical-menu-children"
          onMouseDown={(event) => {
            event.preventDefault();
          }}
        >
          {props.children}
        </div>
      )}
    </div>
  );
}
