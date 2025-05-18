import "./lignedetab.css";
import { AiOutlineRight } from "react-icons/ai";

interface Props {
  col: string[];
  isnotTitle?: boolean;
  modif?: boolean;
  iconmodif?: boolean;
  alumer?: boolean;
  onDelete?: () => void;
  //onSelect: (value: string) => void;
}

function Ligne({
  col = [],
  isnotTitle = true,
  modif,
  onDelete,
  iconmodif = false,
  alumer = false,
}: Props) {
  const listop = col.map((opt) => <p>{opt} </p>);
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

  return (
    <>
      <div
        className={`ligne ${modif ? "modif" : ""}`}
        style={{ pointerEvents: isnotTitle ? "auto" : "none" }}
      >
        <div className={`sans_icon ${isnotTitle ? "" : "titre"}`}>{listop}</div>
        {renderButton()}
      </div>
      <div className="entre_ligne" />
    </>
  );
}

export default Ligne;
