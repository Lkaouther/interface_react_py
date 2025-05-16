
import "./dropdownM.css";
import { useState } from "react";

interface Props {
  name: string;
  op: string[];
  onSelect: (value: string) => void;
}
function DropdownM({name , op , onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const handleSelect = (option: string) => {
    onSelect(option)
    setIsOpen(false)
  }
  const listop = op.map((opt) => <li key={opt} onClick={() => handleSelect(opt)}>{opt} </li> );
  return (
    <>
      <div className="container_drop">
        <button
          className={`button_dropd ${isOpen ? "button_open" : ""}`}
          onClick={toggleDropdown}
          onMouseLeave={()=>setIsOpen(false)}
          name="btn"
        >
          {name}
        </button>
        {isOpen && <ul className="dropdown" onMouseOver={()=>setIsOpen(true)} onMouseLeave={toggleDropdown}>{listop}</ul>}
      </div>
    </>
  );
}

export default DropdownM;
