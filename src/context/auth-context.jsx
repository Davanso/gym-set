import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";

// Contexto que armazena os dados do usuario e escuta por mudancas de login/logout
const AuthContext = createContext();

// Componente que encapsula os componentes filhos e armazena os dados do usuario
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Escuta por mudancas de login/logout e atualiza o estado do usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Remover o escutador quando o componente for desmontado
    return () => unsubscribe();
  }, []);

  // Retorna o contexto com os dados do usuario e o loading
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Definir os tipos esperados das props
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
