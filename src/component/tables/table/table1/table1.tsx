import "./table1.css";
import Ligne from "../../ligne_tab/lignedetab";
import { useEffect, useState } from "react";

interface Props {
  lignes: string[];
  modif?: boolean;
  keys: string[];
  onSelect: (value: string, id: string) => void;
}

function Table1({ lignes, modif = false, onSelect, keys }: Props) {
  const [rows, setRows] = useState<string[]>([]);

  // Synchroniser avec les props
  useEffect(() => {
    setRows(lignes);
  }, [lignes]);

  //-----------------------ajout/sup ligne------ajouter les actions api------------------
  const handleDelete = (id: number) => {
    setRows((prevRows) => prevRows.filter((_, index) => index !== id));
  };
  const handleAdd = (name: string) => {
    setRows((prevRows) => [...prevRows, name]);
  };
  //---------------------------------------------------------------------------------------
  const toLigne = rows.map((row, index) => (
    <Ligne
      key={keys[index]}
      id={keys[index]}
      modif={modif}
      col={[row]}
      onSelect={(item, id) => {
        onSelect(item, id);
      }}
      onDelete={() => handleDelete(rows.indexOf(row))}
    ></Ligne>
  ));

  return (
    <>
      {toLigne}
      {modif && (
        <button className="ajouter" onClick={() => handleAdd("Nouvelle ligne")}>
          Ajouter
        </button>
      )}
    </>
  );
}

export default Table1;
