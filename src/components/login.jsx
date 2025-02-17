import { useState } from "react";
import { auth, provider } from "../firebase/firebase_config";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaApple } from "react-icons/fa";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Login com Google
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
    }
  };

  // Login com Email e Senha
  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login com email:", error);
    }
  };

  return (
    <div className="login-container">
      <h1>Gym Set</h1>
      <div className="login-box">
  {/* Inputs de Email e Senha */}
  <div className="login-input">
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="password"
      placeholder="Senha"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>

  {/* Botão "Entrar" Centralizado */}
  <div className="login-main-button">
    <button className="login-button" onClick={handleEmailLogin}>
      Entrar
    </button>
  </div>

  {/* Botões de Login Social */}
  <div className="button-container">
    <button className="login-button" onClick={handleGoogleLogin}>
      <FaGoogle />
    </button>
    <button
      className="login-button"
      onClick={() => {
        console.log("Login com Apple - ainda não implementado");
      }}
    >
      <FaApple />
    </button>
  </div>
</div>
    </div>
  );
};

export default Login;
