import Background from "../component/background/background";
import "./p_principale.css";
import nat from "../assets/logonat.svg";
import DropdownM from "../component/drop_down_menu/dropdownM";
import { AiOutlineSetting } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Equipement from "../page_equipement/equipement";
import Vul from "../page_vulnerabilite/vulnerabilite";
import Script from "../page_script/Script";
/*import Table1 from "../component/tables/table/table1/table1";
import Table2 from "../component/tables/table/table2/table2";
import BarreRecherhce from "../component/barrecherche/barrerech";*/

interface Props {
  first?:boolean;
}
function Page_P({first=false}:Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [ismain, setismain] = useState(true);
  const navigate = useNavigate();
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
  const [selectedItem, setSelectedItem] = useState("");
  const handleSelect = (category: string, item: string) => {
    if (item === "") {
      if (category === "") {
        navigate(`/main`);//CHANGER A DASHBORD POUR NE PA VOIR LE BIENVENUE 
        setismain(true);
        setSelectedItem(`:`);
      } else {
        navigate(`/main/${category}`);
        setismain(false);
      }
    } else {
      setSelectedItem(`${item}`);
      navigate(`/main/${category}/${item}`);
      setismain(false);
    }
  };
  const [title, setTitle] = useState(first&&"BIENVENUE");
  //---------------------a terminer----------------

  //-------------------------------------------------------------------------------------------------------
  return (
    <>
      <Background />
      <div className="ecran">
        <nav className={`navigation ${scrolled ? "scrolled" : ""}`}>
          <div
            className={`logo ${scrolled ? "scrolled" : ""}`}
            onClick={() => {
              handleSelect("", "");
            }}
          >
            <img src={nat} alt="" />
          </div>
          <div className={`middlebtn ${scrolled ? "scrolled" : ""}`}>
            <button
              className={`button_dropd`}
              onClick={() => {
                handleSelect("equipement", "");
                setTitle(false);
              }}
              name="btn"
            >
              Equipement
            </button>

            <DropdownM
              name="Scripts"
              op={["Routeur", "Switch", "Firewall"]}
              onSelect={(item) => {
                setTitle(false);
                handleSelect("Script", item);
              }}
            />

            <DropdownM
              name="Vulnérabilité"
              op={["Bab Ezzouar", "Oran", "Agence"]}
              onSelect={(item) => {
                setTitle(false);
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
          <div ref={triggerRef} style={{ height: "0.001%" }}></div>
          {title}
        </div>

        <div className="maincontainer">
          <Routes>
            <Route path="Equipement/*" element={<Equipement />} />
            <Route
              path="Script/Routeur"
              element={<Script/>}
            />
            <Route
              path="Script/Switch"
              element={<Script  />}
            />
            <Route
              path="Script/Firewall"
              element={<Script />}
            />

            <Route
              path="Vulnérabilité/Bab Ezzouar"
              element={<Vul title={selectedItem} />}
            />
            <Route
              path="Vulnérabilité/Oran"
              element={<Vul title={selectedItem} />}
            />
            <Route
              path="Vulnérabilité/Agence"
              element={<Vul title={selectedItem} />}
            />
          </Routes>
          {ismain && "le dash board"}
        </div>
      </div>
    </>
  );
}

export default Page_P;
