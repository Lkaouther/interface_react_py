import { useState, useEffect } from "react";
import BarreRecherche from "../component/barrecherche/barrerech";
import Table1 from "../component/tables/table/table1/table1";

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
        <h1>{titre.toUpperCase()}</h1>

        <div className="modif_rech">
          {/* Ne montre la recherche que si on est sur les sites */}
          {currentView === "mac" && (
            <button onClick={handleRetourSites}>↩ Retour</button>
          )}
       
            <BarreRecherche
              data={currentView === "sites" ? (data as any[]): (macData as any[])}
              fieldNom={currentView === "sites" ? "nomSite" : "mac"}
              fieldId="id"
              entrer={currentView === "sites" ? "sites" : "adresses MAC"}
              retourner={(noms, ids) => {
                setLig(noms);
                setKeys(ids);
                setTitre("Sites");
              }}
            />
          

          
        </div>
      </div>

      <div className="table">
        <Table1
          lignes={lig}
          keys={keys}
          onSelect={(nom, id) => {
            if (currentView === "sites") {
              handleSiteSelect(nom, id);
            } else {
              console.log("adresse mac choisi:",nom,"id:",id);
            }
          }}
        />
      </div>
    </>
  );
}

export default Equipement;
