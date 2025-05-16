import Background from "../component/background/background";
import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const enter = (e: React.FormEvent) => {
    e.preventDefault(); // empêche la soumission réelle du formulaire
    navigate("/main"); // redirige vers Page_P
  };
  return (
    <>
      <Background/>
      <form onSubmit={enter}>
        <div className="container">
          <header id="text1">Login</header>
          <div className="inputs">
            <div className="input">
              <input
                className="name_pass"
                type="text"
                placeholder="user name"
              />
              <div className="underline" />
            </div>
            <div className="input">
              <input
                className="name_pass"
                type="password"
                placeholder="password"
              />
              <div className="underline" />
              <div className="passforgot">
                <input type="checkbox" />
                <div id="text2">mot de passe oublié ?</div>
              </div>
            </div>
          </div>
          <button type="submit" className="loginbtn" >
            Login
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
