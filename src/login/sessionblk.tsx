import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import nat from "../assets/logonat.svg";


function Sessionblk() {
  const navigate = useNavigate();

  const totalTime = 10 ; // 10*60 pour 10 min
  const [timeLeft, setTimeLeft] = useState(totalTime);

  // Décompte du temps
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/"); // redirige vers login
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <>

      <div id="logo_nat2"><img src={nat} alt="logo" /></div>

      <div className="container_ssb">
        <header className="text1">Session verrouillée</header>
        <p>
          Vous avez saisi 3 fois un identifiant ou un mot de passe incorrect.<br /><br />
          La session va être débloquée dans : <strong>{formatTime(timeLeft)}</strong>
        </p>
      </div>
    </>
  );
}

export default Sessionblk;
