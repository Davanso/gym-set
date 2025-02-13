// Componente para verficiar se o user esta logado, caso nao esteja ele redireciona para o login page
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auto";
import PropTypes from "prop-types";

// Componente protegido, redireciona caso o user não esteja logado
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  return user ? children : <Navigate to="/" />;
};

// Definir os tipos esperados das props
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
