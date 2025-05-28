import { useState, useEffect } from "react";
import BarreRecherche from "../component/barrecherche/barrerech";
import Table1 from "../component/tables/table/table1/table1";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Table2 from "../component/tables/table/table2/table2";
import Terminal from "../component/tables/table/table4/terminal/terminal";
import PageScript from "../component/tables/table/table4/table4";

interface AdresseMAC {
  id: string;
  mac: string;
}
interface Equipement {
  id: string;
  nomSite: string;
  adresseMAC: AdresseMAC[];
}

function Script() {
  const [modifier, setModifier] = useState(false);
  const [data, setData] = useState<Equipement[]>([]);
  const [lig, setLig] = useState<string[]>([]);
  const [keys, setKeys] = useState<string[]>([]);
  const [titre, setTitre] = useState("Switchs");
  const [macData, setMacData] = useState<AdresseMAC[]>([]);
  // Pour savoir si on est dans la vue site ou mac
  const [currentView, setCurrentView] = useState<"switchs" | "mac" | "script">(
    "switchs"
  );

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

  const handleswitchelect = (nomSite: string, id: string) => {
    const site = data.find((s) => s.id === id);
    if (!site) return;

    setTitre(nomSite);
    setMacData(site.adresseMAC);
    setLig(site.adresseMAC.map((m) => m.mac));
    setKeys(site.adresseMAC.map((m) => m.id));
    setCurrentView("mac");
  };

  const handleRetourswitch = () => {
    setTitre("Switchs");
    setLig(data.map((e) => e.nomSite));
    setKeys(data.map((e) => e.id));
    setCurrentView("switchs");
    switch(currentView){
    case "mac": setCurrentView("switchs");break;
    case "script": setCurrentView("mac");break;
  }
  };

  const clickmodif = () => setModifier((prev) => !prev);
  return (
    <>
      <div className="haut_page">
        <div style={{ display: "flex" }}>
          {(currentView !== "switchs") && (
            <button
              onClick={handleRetourswitch}
              className="button_dropd"
              style={{ fontSize: "32px", marginRight: "5px" }}
            >
              <AiOutlineArrowLeft />
            </button>
          )}
          <div
            style={{
              fontSize: "32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {titre.toUpperCase()}
          </div>
        </div>

        <div className="modif_rech">
          <input type="text" placeholder="cherchez dans ce script.." />{/*remplacer le input par barre rech */}
          <button onClick={clickmodif}>
            {modifier ? "retour" : "modifier"}
          </button>
        </div>
      </div>

      <div className="table">
        <div className="table">
          {currentView === "switchs" && (
            <Table1
              lignes={[
                "Switch type1",
                "Switch type2",
                "Switch type3",
                "Switch type4",
                "Switch type5",
                "Switch type6",
                "Switch type7",
              ]}
              keys={keys}
              modif={modifier}
              onSelect={(nom, id) => {
                handleswitchelect(nom, id);
                setTitre(nom);
              }}
            />
          )}

          {currentView === "mac" && (
            <Table1
              lignes={[
                "script1",
                "script2",
                "script3",
                "script4",
                "script5",
                "script6",
                "script7",
              ]}
              keys={keys}
              modif={modifier}
              onSelect={(nom, id) => {
                setCurrentView("script");
                setTitre(nom);
                console.log("adresse mac choisi:", nom, "id:", id);
              }}
            />
          )}

          {currentView === "script" && <PageScript />}
        </div>
      </div>
    </>
  );
}

export default Script;
