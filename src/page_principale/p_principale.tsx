import Background from "../component/background/background";
import "./p_principale.css";
import nat from "../assets/logonat.svg";
import DropdownM from "../component/drop_down_menu/dropdownM";
import { AiOutlineSetting } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Equipement from "../page_equipement/equipement";
import Maincont from "../maincontainer/maincont";
/*import Table1 from "../component/tables/table/table1/table1";
import Table2 from "../component/tables/table/table2/table2";
import BarreRecherhce from "../component/barrecherche/barrerech";*/
function Page_P() {
  const navRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [ismain, setismain] = useState(false);
  const navigate=useNavigate();
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
    if(item===""){
      if(category===""){
        navigate(`/main`);
        setismain(true);
        setSelectedItem(`:`);
      }else{
      navigate(`/main/${category}`);
      setSelectedItem(`${category}:${category}`);
      setismain(false);
    }}
    else{
    setSelectedItem(`${category}:${item}`);
    navigate(`/main/${category}/${item}`);
  setismain(false); }
    
  };
  const [title, setTitle] = useState("Bienvenue");
  //---------------------a terminer----------------




  //-------------------------------------------------------------------------------------------------------
  return (
    <>
      <Background />
      <div className="ecran">
        <nav className="navigation">
          <div className={`logo ${scrolled ? "scrolled" : ""}`} onClick={() => {handleSelect("",""); }} >
            <img src={nat} alt="" />
          </div>
          <div
            className={`middlebtn ${scrolled ? "scrolled" : ""}`}
            
          >
            <button
          className={`button_dropd`}
          onClick={() => {handleSelect("equipement",""); setTitle("Equipement");}}
          name="btn"


        >equipement</button>

            <DropdownM
              name="scripts"
              op={["routeur", "switch", "firewall"]}
              onSelect={(item) => {
                setTitle("Script");
                handleSelect("Script", item);
              }}
            />

            <DropdownM
              name="vulnérabilité"
              op={["Bab Zeouar", "Oran", "Agence"]}
              onSelect={(item) => {
                setTitle("vulnérabilité");
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
          <div ref={triggerRef} style={{ height: "0.01px" }}></div>
          {title}
        </div>

        <div className="maincontainer">
          
          <Routes>
            <Route path="equipement/*" element={<Equipement />} />
            <Route path="script/routeur" element={<Maincont title={selectedItem} />} />
            <Route path="script/switch" element={<Maincont title={selectedItem}/>} />
            <Route path="script/firewall" element={<Maincont title={selectedItem} />} />

            <Route path="vulnérabilité/Bab Zeouar" element={<Maincont title={selectedItem}/>} />
            <Route path="vulnérabilité/Oran" element={<Maincont title={selectedItem}/>} />
            <Route path="vulnérabilité/Agence" element={<Maincont title={selectedItem} />} />
          </Routes>  
          {ismain && "le dash board"}
            
          
        </div>
      </div>
    </>
  );
}

export default Page_P;
