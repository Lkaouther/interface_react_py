import Background from "../component/background/background";
import "./login.css";
import { useNavigate } from "react-router-dom";
import nat from "../assets/logonat.svg";
import { useEffect, useRef, useState } from "react";
import Sessionblk from "./sessionblk";

function Login() {
  const navigate = useNavigate();
  const [sessionblk, setSessionblk] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isemptyP, setisemptyP] = useState<boolean>(false);
  const [isemptyU, setisemptyU] = useState<boolean>(false);
  const underlineRef1 = useRef<HTMLDivElement>(null);
  const underlineRef2 = useRef<HTMLDivElement>(null);
  const MAX_ATTEMPTS = 3;

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
if (username === "" && password === "") {
  if (username === "") {
    setisemptyU(true);
    
  }
  if (password === "") {
    setisemptyP(true);
   
  }
  const underline1 = underlineRef1.current;
        const underline2 = underlineRef2.current;
        if (underline1) {
          underline1.classList.remove("faux");
          void underline1.offsetWidth;
          underline1.classList.add("faux");
        }
        if (underline2) {
          underline2.classList.remove("faux");
          void underline2.offsetWidth;
          underline2.classList.add("faux");
        }

  return;
}
  try {
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    // data.is_valid est un booléen qui indique si les identifiants sont valides
    // data.access_token est le token d'accès si les identifiants sont valides
    // data.role est le rôle de l'utilisateur (par exemple, "admin", "user", etc.)

    if (data.is_valid) {
      // succès : stocker le token si nécessaire
      localStorage.setItem("token", data.access_token);
      navigate("/main");
    } else {
      // identifiants invalides
      const underline1 = underlineRef1.current;
        const underline2 = underlineRef2.current;
        if (underline1) {
          underline1.classList.remove("faux");
          void underline1.offsetWidth;
          underline1.classList.add("faux");
        }
        if (underline2) {
          underline2.classList.remove("faux");
          void underline2.offsetWidth;
          underline2.classList.add("faux");
        }

      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setError(true);
      if (newAttempts >= MAX_ATTEMPTS) {
        setSessionblk(true);
      }
    }
  } catch (error) {
    console.error("Erreur de connexion :", error);
    setError(true);
  }
};

  useEffect(() => {
    if (sessionblk) {
      const timer = setTimeout(() => {
        setError(false);
        setSessionblk(false);
        setAttempts(0);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [sessionblk]);

  return (
    <>
      <Background />
      {sessionblk ? (
        <Sessionblk />
      ) : (
        <>
          <div id="logo_nat2">
            <img src={nat} alt="Logo" />
          </div>
          <form onSubmit={handleLogin}>
            <div className="container">
              <header className="text1">Connexion</header>
              <div className="inputs">
                <div className="input">
                  <input
                    className="name_pass"
                    type="text"
                    placeholder="identificateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <div ref={underlineRef1} className="underline" />
                  {isemptyU && (
                    <label className="error-label">Ce champ est obligatoire*</label>
                  )}
                  {!isemptyU && error && (
                    <label className="error-label">Identifiant incorrect</label>
                  )}
                </div>
                <div className="input">
                  <input
                    className="name_pass"
                    type="password"
                    placeholder="mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div ref={underlineRef2} className="underline" />
                  {isemptyP && (
                    <label className="error-label">Ce champ est obligatoire*</label>
                  )}
                  {!isemptyP && error && (
                    <label className="error-label">Mot de passe incorrect</label>
                  )}
                </div>
              </div>
              <button type="submit" className="loginbtn">
                Login
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
}

export default Login;