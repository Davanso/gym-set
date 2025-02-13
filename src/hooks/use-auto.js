// Hook para acessar os dados dos usuario em qualquer componente
import { useContext } from "react";
import AuthContext from "../context/auth-context";

export const useAuth = () => {
  return useContext(AuthContext);
};
