import './lignedetab.css'
import { AiOutlineRight } from "react-icons/ai";

interface Props {
  
  col: string[];
  isnotTitle?:boolean;
  //onSelect: (value: string) => void;
}

function Ligne({ col = [] , isnotTitle=true}:Props) {
    const listop = col.map((opt) => <p>{opt} </p> );
    return(
    <>
    <div className='ligne' style={{ pointerEvents: isnotTitle ? "auto" : "none" }} >
        
            
            {listop}

           <AiOutlineRight style={{ color: isnotTitle ? "" : "transparent" }}/>
        
        
        
    </div>
    <div className='entre_ligne'/>
    </>
        )
}

export default Ligne