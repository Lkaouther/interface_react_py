import Background from "../component/background/background";
import "./p_principale.css";
import nat from "../assets/logonat.svg";
import DropdownM from "../component/drop_down_menu/dropdownM";
import { AiOutlineSetting } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Table1 from "../component/tables/table/table1/table1";
import Table2 from "../component/tables/table/table2/table2";
import Table3 from "../component/tables/table/table3/table3";

function Page_P() {
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  //_______________________________________transformation nav bar____________________________________
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );

    if (triggerRef.current) observer.observe(triggerRef.current);

    return () => {
      if (triggerRef.current) observer.unobserve(triggerRef.current);
    };
  }, []);
  //------------------------------------------------------------------------------------
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleSelect = (category: string, item: string) => {
    setSelectedItem(`${category}: ${item}`);
  };
  const [title, setTitle] = useState("Bienvenue");
  //---------------------a terminer----------------
  const [modifier, setModifier] = useState(false);

  const clickmodif = () => {
    setModifier((prev) => !prev);
  };

  //__-----------------------------------------------
  return (
    <>
      <Background />
      <div className="ecran">
        <nav className="navigation">
          <div className={`logo ${scrolled ? "scrolled" : ""}`} ref={navRef}>
            <img src={nat} alt="" />
          </div>
          <div
            className={`middlebtn ${scrolled ? "scrolled" : ""}`}
            ref={navRef}
          >
            <DropdownM
              name="equipement"
              op={["routeur", "switch", "firewall"]}
              onSelect={(item) => {
                setTitle(item.toUpperCase());
                handleSelect("Equipement", item);
              }}
            />

            <DropdownM
              name="scripts"
              op={["routeur", "switch", "firewall"]}
              onSelect={(item) => {
                setTitle(item.toUpperCase());
                handleSelect("Script", item);
              }}
            />

            <DropdownM
              name="vulnérabilité"
              op={["Bab Zeouar", "Oran", "Agence"]}
              onSelect={(item) => {
                setTitle(item.toUpperCase());
                handleSelect("vulnérabilité", item);
              }}
            />
          </div>
          <div
            className={`parametre ${scrolled ? "scrolled" : ""}`}
            ref={navRef}
          >
            <AiOutlineSetting />
          </div>
        </nav>

        <div className="text">
          <div ref={triggerRef} style={{ height: "1px" }}></div>
          {title}
        </div>
        <div className="maincontainer">
          {selectedItem ? (
            <>
              <div className="haut_page">
                <h1>{title}</h1>
                <div className="modif_rech">
                  <input type="text" placeholder="rechercher..." />
                  <button onClick={clickmodif}>
                    {modifier ? "retour" : "modifier"}
                  </button>
                </div>
              </div>
              <div className="table">
                <Table3
lignes={[
  ["switch1", "00:1A:C2:7B:00:47"],
  ["switch1", "00:1A:C2:7B:00:47"],
  ["switch1", "00:1A:C2:7B:00:47"],
  ["switch1", "00:1A:C2:7B:00:47"]
]}
                  modif={modifier}
                  
                />
              </div>
            </>
          ) : (
            <div>dash boeard a mettre ici</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Page_P;
