import { useState } from "react";
import { auth, provider } from "../firebase/firebase_config";
import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail 
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaGithub } from "react-icons/fa";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const [loading, setLoading] = useState(false); // Estado para loading
  const navigate = useNavigate();

  // Login com Google
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
      setError("Falha ao autenticar com Google.");
    }
  };

  // Login com Email e Senha
  const handleEmailLogin = async () => {
    setError(""); // Limpa erro antes de tentar logar
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      if (error.code === "auth/user-not-found") {
        setError("Usuário não encontrado. Cadastre-se primeiro.");
      } else if (error.code === "auth/wrong-password") {
        setError("Senha incorreta. Tente novamente.");
      } else {
        setError("Erro ao fazer login. Verifique seus dados.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Função para redefinir senha
  const handleResetPassword = async () => {
    if (!email) {
      setError("Digite seu email para redefinir a senha.");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setError("Email de redefinição enviado! Verifique sua caixa de entrada.");
    } catch (error) {
      console.error("Erro ao redefinir senha:", error);
      setError("Erro ao enviar email de redefinição. Verifique o email digitado.");
    } finally {
      setLoading(false);
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

        {/* Mensagem de Erro */}
        {error && <p className="error-message">{error}</p>}

        {/* Botão "Entrar" Centralizado */}
        <div className="login-main-button">
          <button className="login-button" onClick={handleEmailLogin} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>

        {/* Botão "Esqueceu a Senha?" */}
        <button className="forgot-password" onClick={handleResetPassword} disabled={loading}>
          Esqueceu a senha?
        </button>

        {/* Botões de Login Social */}
        <div className="button-container">
          <button className="login-button" onClick={handleGoogleLogin}>
            <FaGoogle />
          </button>
          <button className="login-button">
            <FaGithub />
          </button>
        </div>

        {/* Botão para Criar Conta */}
        <button className="register-button" onClick={() => navigate("/register")}>
          Criar conta
        </button>
      </div>
    </div>
  );
};

export default Login;
