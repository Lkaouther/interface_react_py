import { useState, useEffect } from "react";
import BarreRecherche from "../component/barrecherche/barrerech";
import Table1 from "../component/tables/table/table1/table1";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Table2 from "../component/tables/table/table2/table2";
import Message from "../component/message/message";

interface AdresseMAC {
  id: string;
  mac: string;
}
interface Equipement {
  id: string;
  nomSite: string;
  adresseMAC: AdresseMAC[];
}

function Equipement() {
  const [data, setData] = useState<Equipement[]>([]);
  const [lig, setLig] = useState<string[]>([]);
  const [keys, setKeys] = useState<string[]>([]);
  const [titre, setTitre] = useState("Sites");
  const [macData, setMacData] = useState<AdresseMAC[]>([]);
  // Pour savoir si on est dans la vue site ou mac
  const [currentView, setCurrentView] = useState<"sites" | "mac">("sites");

  useEffect(() => {
    fetch("/assets/equipement.json")
      .then((res) => res.json())
      .then((json: Equipement[]) => {
        setData(json);
        // Affiche tous les sites au départ
        setLig(json.map((e) => e.nomSite));
        setKeys(json.map((e) => e.id));
        

      });
  }, []);

  const handleSiteSelect = (nomSite: string, id: string) => {
    const site = data.find((s) => s.id === id);
    if (!site) return;

    setTitre(nomSite);
    setMacData(site.adresseMAC);
    setLig(site.adresseMAC.map((m) => m.mac));
    setKeys(site.adresseMAC.map((m) => m.id));
    setCurrentView("mac");
  };

  const handleRetourSites = () => {
    setTitre("Sites");
    setLig(data.map((e) => e.nomSite));
    setKeys(data.map((e) => e.id));
    setCurrentView("sites");
  };

  return (
    <>
      <div className="haut_page">
        <div style={{display:"flex"}}>
          {currentView === "mac" && (
            <button onClick={handleRetourSites} className="button_dropd"style={{fontSize:"32px",marginRight:"5px"}}><AiOutlineArrowLeft /></button>
          )}
        <div style={{fontSize: "32px",display: "flex",justifyContent: "center",alignItems: "center"}}>{titre.toUpperCase()}</div>
        </div>
         

        <div className="modif_rech">
         

          <BarreRecherche
            data={
              currentView === "sites" ? (data as any[]) : (macData as any[])
            }
            fieldNom={currentView === "sites" ? "nomSite" : "mac"}
            fieldId="id"
            subRech={currentView === "sites" ? "mac" : undefined}
            subAr={currentView === "sites" ? "adresseMAC" : undefined}
            entrer={currentView === "sites" ? "sites" : "switch ou ip"}
            retourner={(noms, ids) => {
              setLig(noms);
              setKeys(ids);
            }}
          />
        </div>
      </div>

      <div className="table">
        {currentView === "sites" ? <Table1
          lignes={lig}
          keys={keys}
          onSelect={(nom, id) => {
            if (currentView === "sites") {
              handleSiteSelect(nom, id);
              
            } else {
              console.log("adresse mac choisi:", nom, "id:", id);
              console.log("data :",data);
            }
          setTitre(nom);
        }}
        /> : 
        <Table2
          lignes={[["Switch01-01","10.10.10.1"],["Switch01-02","10.10.10.2"],["Switch01-03","10.10.10.3"],["Switch01-04","10.10.10.4"]]}
          keys={keys}
          onSelect={(nom, id) => { 
        }}
        />}
      </div>
      <Message msg="bonjour 
      loremnkjrnkjvjvjejkvjkebvkbewkj vbhwbejvkbwjebjkv bwekvhbwehmbvhwbvkhbek rhvbhkbehkbkwebkv
      bfbewkjkevb" />
    </>
  );
}

export default Equipement;
