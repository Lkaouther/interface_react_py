import "./table2.css";
import Ligne from "../../ligne_tab/lignedetab";
import { useState } from "react";

interface Props {
  lignes: string[][];
  modif: boolean;
  //onSelect: (value: string) => void;
}

function Table2({ lignes, modif }: Props) {
  const [rows, setRows] = useState(lignes);
 
  //-----------------------ajout/sup ligne------ajouter les actions api------------------
  const handleDelete = (id: number) => {
    setRows((prevRows) => prevRows.filter((_, index) => index !== id));
  };
  const handleAdd = (id:string,ip:string,mac:string,etat:string) => {
    setRows((prevRows) => [...prevRows, [id, ip, mac, etat]]);
  };
//---------------------------------------------------------------------------------------
  const toLigne = rows.map((row) => (
    <Ligne
      key={rows.indexOf(row)}
      modif={modif}
      col={row}
      onDelete={() => handleDelete(rows.indexOf(row))}
    ></Ligne>
  ));



  return (
    <>
       <Ligne col={["ID","ADRESSE MAC","ADRESSE IP","ETAT"]} isnotTitle={false} modif={modif}/>
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

export default Table2;
