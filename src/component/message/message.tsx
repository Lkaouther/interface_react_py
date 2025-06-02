import { useState } from 'react';
import "./message.css";
import { AiFillCloseCircle } from "react-icons/ai";

interface Props {
  msg: string; // le message to display
  succes?:boolean;// si l'action a ete effectue avec succces 
}

function Message({msg,succes=true}: Props) {
  const [close,SetClose]=useState(false);
  if (close) return null;
  return (
    <>
      <div  className={`pop_up ${succes ?'':'non'}`} >
        <button onClick={()=>SetClose(true)}> <AiFillCloseCircle/> </button>
        <p>{msg }</p>
      </div>
     
   </>
  );
}

export default Message;