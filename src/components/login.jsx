import { auth, provider } from "../firebase/firebase_config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import "../styles/login.css";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard"); // Redireciona para o Dashboard
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="button-container">
            <button className="login-button" onClick={handleLogin}>
              Entrar com Google <FaGoogle />
            </button>
            <button
              className="login-button"
              onClick={() => {
                /* outra ação */
              }}
            >
              Entrar com Apple
            </button>
            <button
              className="login-button"
              onClick={() => {
                /* outra ação */
              }}
            >
              Entrar com Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
