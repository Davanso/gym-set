import { auth } from "../firebase/firebase_config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaDumbbell, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Bem-vindo!</h2>
      <button onClick={() => navigate("/exercises")}>
        <FaDumbbell /> Ver Exercícios
      </button>
      <button onClick={handleLogout}>
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Dashboard;
