import "./lignedetab.css";
import { AiOutlineRight } from "react-icons/ai";

interface Props {
  id:string;
  col: string[];
  isnotTitle?: boolean;
  modif?: boolean;
  iconmodif?: boolean;
  alumer?: boolean;
  onDelete?: () => void;
  onSelect?: (value: string,id:string) => void;
}

function Ligne({
  id,
  col = [],
  isnotTitle = true,
  modif,
  onDelete,
  iconmodif = false,
  alumer = false,
   onSelect = () => {}
}: Props) {
let y=0;
  const listop = col.map((opt) => <p key={"y"+ y++}>{opt} </p>);
  const renderButton = () => {
    if (!modif) {
      return (
        <AiOutlineRight style={{ color: isnotTitle ? "" : "transparent" }} />
      );
    }

    if (iconmodif) {
      return (
        <button className={`suprim ${isnotTitle ? "" : "title"}`}>
          modifier
        </button>
      );
    }

    if (alumer) {
      return (
        <button className={`suprim ${isnotTitle ? "" : "title"}`}>
          alumer
        </button>
      );
    }
    
    return (
      <button
        className={`suprim ${isnotTitle ? "" : "title"}`}
        onClick={onDelete}
      >
        supprimer
      </button>
    );
  };
  const handleSelect = (option: string,id:string) => {
    onSelect(option,id);
 
     }

  return (
    <>
      <div
        className={`ligne ${modif ? "modif" : ""}`}
        style={{ pointerEvents: isnotTitle ? "auto" : "none" }}
      >
        <div className={`sans_icon ${isnotTitle ? "" : "titre"}`} onClick={() => handleSelect(col[0],id)}>{listop}</div>
        {renderButton()}
      </div>
      <div className="entre_ligne" />
    </>
  );
}
// pour handel ajouter key 

export default Ligne;
