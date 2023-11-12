import { useState, ReactNode } from "react";
import "./SideBarAccordion.css";

interface SideBarAccordionProps {
  title: string;
  open?: boolean;
  children?: ReactNode;
}

export default function SideBarAccordion(props: SideBarAccordionProps) {
  const [isOpen, setIsOpen] = useState(
    props.open === undefined ? false : props.open
  );
  return (
    <div className="sidebar-accordion">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sidebar-accordion-title"
      >
        {isOpen ? "- " + props.title : "+ " + props.title}
      </button>
      {isOpen && (
        <div className="sidebar-accordion-children">{props.children}</div>
      )}
    </div>
  );
}
