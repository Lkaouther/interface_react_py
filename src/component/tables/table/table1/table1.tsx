import "./table1.css";
import Ligne from "../../ligne_tab/lignedetab";
import { useState } from "react";

interface Props {
  lignes: string[];
  modif: boolean;
  //onSelect: (value: string) => void;
}

function Table1({ lignes, modif }: Props) {
  const [rows, setRows] = useState(lignes);
 
  //-----------------------ajout/sup ligne------ajouter les actions api------------------
  const handleDelete = (id: number) => {
    setRows((prevRows) => prevRows.filter((_, index) => index !== id));
  };
  const handleAdd = (name: string) => {
    setRows((prevRows) => [...prevRows, name]);
  };
//---------------------------------------------------------------------------------------
  const toLigne = rows.map((row) => (
    <Ligne
      key={rows.indexOf(row)}
      modif={modif}
      col={[`${row}`]}
      onDelete={() => handleDelete(rows.indexOf(row))}
    ></Ligne>
  ));



  return (
    <>
      
        {toLigne}
        {modif && (
          <button
            className="ajouter"
            onClick={() => handleAdd("Nouvelle ligne")}
          >
            Ajouter
          </button>
        )}
      
    </>
  );
}

export default Table1;
