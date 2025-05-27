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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isemptyP, setisemptyP] = useState(false);
  const [isemptyU, setisemptyU] = useState(false);
  const underlineRef1 = useRef<HTMLDivElement>(null);
  const underlineRef2 = useRef<HTMLDivElement>(null);
  const MAX_ATTEMPTS = 3;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simule une validation
    const validUsername = "admin";
    const validPassword = "admin";

    if (username === validUsername && password === validPassword) {
      navigate("/main");
    } else {
      if (username === "") {
        setisemptyU(true);
      }
      if (password === "") {
        setisemptyP(true);
      }
      const underline1 = underlineRef1.current;
      const underline2 = underlineRef2.current;
      if (underline1 && underline2) {
        underline1.classList.remove("faux");
        void underline1.offsetWidth; // force reflow
        underline1.classList.add("faux");

        underline2.classList.remove("faux");
        void underline2.offsetWidth; // force reflow
        underline2.classList.add("faux");
      }
      setError(true);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= MAX_ATTEMPTS) {
        setSessionblk(true);
      }
    }
  };

  useEffect(() => {
    if (sessionblk) {
      const timer = setTimeout(() => {
        setError(false);
        setSessionblk(false);
        setAttempts(0); // reset tentatives
      }, 10000); // 10 secondes

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
            <img src={nat} alt="" />
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
                  {error && (
                    <label>
                      {isemptyU
                        ? "Ce champ est obligatoire*"
                        : "Identifant incorrect"}
                    </label>
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
                  {error && (
                    <label>
                      {isemptyP
                        ? "Ce champ est obligatoire*"
                        : "Mot de passe incorrect"}
                    </label>
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
