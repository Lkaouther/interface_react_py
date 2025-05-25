import { useEffect, useState } from "react";
import BarreRecherche from "../component/barrecherche/barrerech";
import Table3 from "../component/tables/table/table3/table3";
import { CgVercel } from "react-icons/cg";
import Table1 from "../component/tables/table/table1/table1";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface Props {
  title: string;
}

// Tous les champs sauf equipements_touches deviennent des tableaux
interface Vulnerabilite {
  id: string;
  titre: string;
  explication: string;
  remediation: string;
  equipements_touches: string[]; // on garde tel quel
  niveau: string;
}

function Vul({ title }: Props) {
  const [modifier, setModifier] = useState(false);
  const [selected, setSelected] = useState<string[][]>([]);
  const [titre1, setTitre] = useState(title);
  const [currentView, setCurrentView] = useState<"cve" | "detail">("cve");

  const [data, setData] = useState<Vulnerabilite[]>([]);
  const [lig, setLig] = useState<string[]>([]);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    fetch("/assets/vulnérabilites.json")
      .then((res) => res.json())
      .then((json) => {
        const vulns: Vulnerabilite[] = json.vulnerabilites;
        setData(vulns);
        setLig(vulns.map((v) => v.titre));
        setKeys(vulns.map((v) => v.id));
      });
  }, []);

  const clickmodif = () => setModifier((prev) => !prev);

  const handleSiteSelect = (nomcve: string, id: string) => {
    const CVE = data.find((s) => s.id === id);
    if (!CVE) return;

    setTitre(nomcve);
    setSelected([
      [CVE.id],
      [CVE.niveau],
      [CVE.explication],
      [CVE.remediation],
      CVE.equipements_touches,
    ]);
    setCurrentView("detail");
  };
  const handleRetourSites = () => {
    setTitre(title);
    setLig(data.map((e) => e.titre));
    setKeys(data.map((e) => e.id));
    setCurrentView("cve");
  };
  return (
    <>
      <div className="haut_page">
        <div
          style={{ display: "flex", justifyContent: "center", border: "green" }}
        >
          {currentView !== "cve" && (
            <button
              onClick={handleRetourSites}
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
            {titre1.toUpperCase()}
          </div>
        </div>
        <div className="modif_rech">
          <input type="text" placeholder="cherchez dans CVE..." />
          {currentView === "cve" && (
            <button onClick={clickmodif}>
              {modifier ? "retour" : "modifier"}
            </button>
          )}
        </div>
      </div>

      <div className="table">
        {currentView === "cve" ? (
          <Table1
            modif={modifier}
            lignes={keys}
            keys={keys}
            onSelect={(nom, id) => handleSiteSelect(nom, id)}
          />
        ) : (
          <Table3
            keys={["details"]}
            lignes={selected}
            titre={[
              "CVE:",
              "NIVEAU:",
              "EXPLICATION:",
              "REMEDIATION:",
              "EQUIPEMENTS TOUCHÉS:",
            ]}
          />
        )}
      </div>
    </>
  );
}

export default Vul;
