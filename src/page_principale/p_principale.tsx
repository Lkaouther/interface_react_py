import Background from "../component/background"
import './p_principale.css'
import parametre from '../assets/parametre.png'
function Page_P() {
    return(
        <>
        <Background></Background>
        <div className="navigation">
            <div className="iconNAT"></div>
            <div className="btns"> 
                <div className="btn">équipement</div>
                <div className="btn">script</div>
                <div className="btn">vulnerabilié</div>
            </div>
            <div className="parametre"><img src={parametre} alt="" /></div>
        </div>
        <div id="text">Bienvenue</div>
        <div className="maincontainer">

        </div>
        
        </>
        
        )
}

export default Page_P