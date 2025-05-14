
import "./dropdownM.css";
import { useState } from "react";

interface Props {
  name: string;
  op: string[];
}
function DropdownM(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const listop = props.op.map((op) => <li key={op}>{op}</li>);
  return (
    <>
      <div className="container_drop">
        <button
          className={`button_dropd ${isOpen ? "button_open" : ""}`}
          onMouseOver={toggleDropdown}
        >
          {props.name}
        </button>
        {isOpen && <ul className="dropdown" onMouseLeave={toggleDropdown}>{listop}</ul>}
      </div>
    </>
  );
}

export default DropdownM;
