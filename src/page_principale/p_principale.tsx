import Background from "../component/background/background";
import "./p_principale.css";
import nat from "../assets/logonat.svg";
import DropdownM from "../component/drop_down_menu/dropdownM";
import { AiOutlineSetting } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import Ligne from "../component/tables/ligne_tab/lignedetab";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../login/login";

function Page_P() {
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting); // true si trigger "entre" dans le nav
      },
      { root: null, threshold: 0 }
    );

    if (triggerRef.current) observer.observe(triggerRef.current);

    return () => {
      if (triggerRef.current) observer.unobserve(triggerRef.current);
    };
  }, []);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const handleSelect = (category: string, item: string) => {
    setSelectedItem(`${category}: ${item}`);
  };
  //---------------------a terminer----------------
  const renderSelect = () =>{
    
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
              onSelect={(item) => handleSelect("Equipement", item)}
            />

            <DropdownM
              name="scripts"
              op={["routeur", "switch", "firewall"]}
              onSelect={(item) => handleSelect("Script", item)}
            />

            <DropdownM
              name="vulnérabilité"
              op={["Bab Zeouar", "Oran", "Agence"]}
              onSelect={(item) => handleSelect("vulnérabilité", item)}
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
          <div ref={triggerRef} style={{ height: "1px" }}></div>Bienvenue
        </div>
        <div className="maincontainer">
            {selectedItem}
            <Ligne  isnotTitle={false} col={["routeur", "switch", "firewall"]}/><Ligne col={["routeur", "switch", "firewall"]}/>
        </div>
      </div>
    </>
  );
}

export default Page_P;
