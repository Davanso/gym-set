import { auth, provider } from "../firebase/firebase_config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard"); // Redireciona para o Dashboard
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <button className="login-button" onClick={handleLogin}>
          Entrar com Google
        </button>
      </div>
    </div>
  );
};

export default Login;
