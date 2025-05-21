import "./table2.css";
import Ligne from "../../ligne_tab/lignedetab";
import { useState } from "react";

interface Props {
  lignes: string[][];
  modif?: boolean;
  keys: string[];
  onSelect: (value: string, id: string) => void;
}

function Table2({ lignes, modif=false,keys ,onSelect}: Props) {
  const [rows, setRows] = useState(lignes);
 
  //-----------------------ajout/sup ligne------ajouter les actions api------------------
  const handleDelete = (id: number) => {
    setRows((prevRows) => prevRows.filter((_, index) => index !== id));
  };
  const handleAdd = (id:string,ip:string,mac:string,etat:string) => {
    setRows((prevRows) => [...prevRows, [id, ip, mac, etat]]);
  };
//---------------------------------------------------------------------------------------
  const toLigne = rows.map((row,index) => (
    <Ligne
      key={keys[index]}
      id={keys[index]}
      modif={modif}
      col={row}
      onSelect={(item, id) => {
        onSelect(item, id);
      }}
      onDelete={() => handleDelete(rows.indexOf(row))}
    ></Ligne>
  ));



  return (
    <>
       <Ligne key={"titre"}
      id={"titre"} col={["ID","ADRESSE MAC"]} isnotTitle={false} modif={modif}/>
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
