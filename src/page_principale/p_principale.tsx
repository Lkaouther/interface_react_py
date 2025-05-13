import Background from "../component/background";
import "./p_principale.css";
import nat from "../assets/logonat.svg";
import DropdownM from "../component/dropdownM";
import { AiOutlineSetting } from "react-icons/ai";

function Page_P() {
  return (
    <>
      <Background></Background>
      <div className="ecran">
        
        <nav className="navigation">
          <div className="logo">
            <img src={nat} alt="" />
          </div>
          <div className="middlebtn">
            <DropdownM
              name="equipement"
              op={["routeur", "switch", "firewall"]}
            />
            <DropdownM name="scripts" op={["routeur", "switch", "firewall"]} />
            <DropdownM
              name="vulnérabilité"
              op={["Bab Zeouar", "Oran", "Agence"]}
            />
          </div>
          <div className="parametre">
            <AiOutlineSetting />
          </div>
        </nav>
        <div className="text">Bienvenue</div>
        <div className="maincontainer"></div>
      </div>
    </>
  );
}

export default Page_P;
