import Background from "../component/background";
import "./login.css";
import Page_P from "../page_principale/p_principale";

function Login() {
  return (
    <>
      <Background></Background>
      <form action="">
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
