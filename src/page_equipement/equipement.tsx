import { useState } from "react";
import BarreRecherche from "../component/barrecherche/barrerech";
import Table1 from "../component/tables/table/table1/table1";
import { Route, Routes, useNavigate } from "react-router-dom";

function Equipement() {
  const [titre, setTitre] = useState("Equipement");
  const [lig, setLig] = useState<string[]>([]);
  const [keys, setKeys] = useState<string[]>([]);
  const navigate = useNavigate();


  return (
    <>
      <div className="haut_page">
        <div style={{fontSize: "3rem"}}>{titre.toUpperCase()}</div>
        <div className="modif_rech">
          <BarreRecherche
          lienjson="/assets/equipement.json"
          retourner={(site, keysite) => {
              setLig(site);
              setKeys(keysite);
              console.log(keysite);
          }}
          />
        </div>
      </div>

      <div className="table">
        <Routes>
          <Route
            path="/"
            element={
              <Table1
                keys={keys}
                lignes={lig}
                onSelect={(item, id) => {
                  console.log("id:", id);
                  navigate(`${item}`);
                  setTitre(item);
                }} //id pour envoyé au script
              />
            }
          />
          <Route path="/:id" element={<h1>hhhhhhhhhhhhhhhhhhhhhhhh</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default Equipement;
