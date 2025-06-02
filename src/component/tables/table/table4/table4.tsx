// Exemple d'utilisation dans une page ou composant
import Terminal from "./terminal/terminal";
import "./table4.css"
import Ligne from "../../ligne_tab/lignedetab";
function PageScript() {
  const script = [
    "// Initialiser un rapport vide qui contiendra entre autre : horodatage, adresse IP etcorrectifs à appliquer;",
    "report = {...};",
    "try",
    "Connexion SSH à l’équipement;",
    " Récupérer la configuration actuelle avec send_command(\"show running-config\");Détecter les configurations vulnérables;",
    " Mettre à jour le rapport avec l’état actuel des configurations :",
    " (\"ACTIVÉ\"/\"DÉSACTIVÉ\");",
    " if (configuration vulnérable détectée) then",
    "// Préparer les commandes de désactivation à envoyer via SSH;",
    "// Initialiser un rapport vide qui contiendra entre autre : horodatage, adresse IP etcorrectifs à appliquer;",
    "report = {...};",
    "try",
    "Connexion SSH à l’équipement;",
    " Récupérer la configuration actuelle avec send_command(\"show running-config\");Détecter les configurations vulnérables;",
    " Mettre à jour le rapport avec l’état actuel des configurations :",
    " (\"ACTIVÉ\"/\"DÉSACTIVÉ\");",
    " if (configuration vulnérable détectée) then",
    "// Préparer les commandes de désactivation à envoyer via SSH;"
  ];

  return (
    <div style={{width:"100%",display:"flex",alignItems:"center",flexDirection:"column"}}>
      <div id="titre_text">Aperçu sur le script:</div>
      <Terminal
        script={script}
        onApply={() => <div className="message"></div>}
      />
       <div className="entre_ligne" />
      
      <Ligne key={"gbxbr"}
      id={"gbxbr"}
      tb3={true}
      col={["Vulnerabilités corrigée:","CVE-1234-1234","CVE-1234-1234"]}
      isnotTitle={false}
      />
    <button
              className="button_apply"
            >
              Appliqué
            </button>

    </div>
  );
}

export default PageScript;
