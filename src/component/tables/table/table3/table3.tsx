
import Ligne from "../../ligne_tab/lignedetab";
import { useState } from "react";

interface Props {
  lignes: string[][];
  modif?: boolean;
  keys?: string[];
  titre:string[];
  onSelect?: (value: string, id: string) => void;
}

function Table3({ lignes, modif=false,keys=[],titre }: Props) {
  const [rows, setRows] = useState(lignes);
 
  //-----------------------ajout/sup ligne------ajouter les actions api------------------
  const handleDelete = (id: number) => {
    setRows((prevRows) => prevRows.filter((_, index) => index !== id));
  };
  const handleAdd = (id:string,ip:string,mac:string,etat:string) => {
    setRows((prevRows) => [...prevRows, [id, ip, mac, etat]]);
  };
//---------------------------------------------------------------------------------------
 const toLigne = rows.map((row, index) => {
  const nv_rows = [titre[index], ...row]; // on ajoute le titre sans modifier row
  return (
    <Ligne
      key={keys[index]}
      id={keys[index]}
      col={nv_rows}
      onDelete={() => handleDelete(index)}
      tb3={true}
      isnotTitle={false}
    />
  );
});




  return (
    <>
       
        {toLigne}
        {modif && (
          <button
            className="ajouter"
            onClick={() => handleAdd("nv switch","00:1A:C2:7B:00:47","192.168.1.1","on")}
          >
            Ajouter
          </button>
        )}
      
    </>
  );
}

export default Table3;
