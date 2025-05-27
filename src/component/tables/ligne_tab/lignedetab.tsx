import "./lignedetab.css";
import { AiOutlineRight ,AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";


interface Props {
  id:string;
  col: string[];
  isnotTitle?: boolean;
  modif?: boolean;
  alumer?: boolean;
  eteindre?:boolean;
  onDelete?: () => void;
  tb3?:boolean;
  tb2?:boolean;
  onSelect?: (value: string,id:string) => void;
}

function Ligne({
  id,
  col = [],
  isnotTitle = true,
  modif=true,
  onDelete,
  tb2=false,
  alumer = false,
  tb3=false,
   onSelect = () => {}
}: Props) {
  
let y=0;
  
const listop = tb3
  ? [
      <div className="titre_ligne"><p  key={"y" + y++}>{col[0]}</p></div>,
      <div className="info-wrapper" key={"wrap" + y++}>
        {col.slice(1).map((opt) => (
          <p className="info" key={"y" + y++}>{opt}</p>
        ))}
      </div>,
    ]
  : col.map((opt) => <p key={"y" + y++}>{opt}</p>);


  
  const renderButton = () => {
    if (!modif) {
      return (
        isnotTitle &&<AiOutlineRight/>
      );
    }
     

    if (alumer) {
      return (
        
        isnotTitle &&<>
        <button className={`suprim ${isnotTitle ? "" : "title"}`}style={{background:"#609e65"}}>
          {/*<AiOutlineArrowUp />*/  }Allumer
        </button>

        <button className={`suprim ${isnotTitle ? "" : "title"}`}style={{background:"#ad5666",marginLeft:"5px"}}>
          {/*<AiOutlineArrowDown />*/  }Eteindre
        </button></>
        
      );
    }
   
    if (modif) {
      return (
        isnotTitle &&<button
        className={`suprim ${isnotTitle ? "" : "title"}`}
        onClick={onDelete}
      >
        supprimer
      </button>
      );
    }
    return;
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
        <div className={`sans_icon ${!isnotTitle ? (tb2 ? "titre2" : "titre") : ""}`} onClick={() => handleSelect(col[0],id)}>{listop}</div>
        {renderButton()}
      </div>
      <div className="entre_ligne" />
    </>
  );
}
// pour handel ajouter key 

export default Ligne;
