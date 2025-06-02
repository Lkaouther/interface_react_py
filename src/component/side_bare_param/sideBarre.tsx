import Ligne from "../tables/ligne_tab/lignedetab";
import "./sideBarre.css";
import { useState, useRef } from "react";

interface Props {
  onClose: () => void;
}

function Sidebar({ onClose }: Props) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(250); // Initial width in px
  const isResizing = useRef(false);

  const handleMouseDown = () => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = window.innerWidth - e.clientX;
    if (newWidth >= 200 && newWidth <= 900) {
      setWidth(newWidth);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div ref={sidebarRef} className="sidebar" style={{ width: `${width}px` }}>
      <div className="resizer" onMouseDown={handleMouseDown}></div>
      <div className="haut">
        <h1>Paramètres</h1>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
      </div>
      <div>
        <div className={`ligne`}>
          <div className={`sans_icon `}>
            <p>help</p>
          </div>
        </div>

        <div className="entre_ligne" />

        <div className={`ligne`}>
          <div className={`sans_icon `}>
            <p>Dark /light mode</p>
            {/*ajouter le sliding button */}
          </div>
        </div>

        <div className="entre_ligne" />
{/*ajouter une condition pour que ca soit que pour l'admin */}
        <div className={`ligne`}>
          <div className={`sans_icon `}>
            <p>Tables des Users</p>
          </div>
        </div>
        
        <div className="entre_ligne" />

      </div>
    </div>
  );
}

export default Sidebar;
