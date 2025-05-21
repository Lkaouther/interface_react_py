import { useState } from "react";

interface Props {
  title: string;
   
}

function Maincont({
  title}:Props) {
  const [modifier, setModifier] = useState(false);
  const [part1, part2] = title.split(":");

  const clickmodif = () => {
    setModifier((prev) => !prev);
  };
  return (
    <>
     <div className="haut_page">
                <h1>{part2}</h1>
                <div className="modif_rech">
                  <input type="text" placeholder="rechercher..." />
                  <button onClick={clickmodif}>
                    {modifier ? "retour" : "modifier"}
                  </button>
                </div>
              </div>
              <div className="table">
                
              </div> 
    </>
  );
}

export default Maincont;

