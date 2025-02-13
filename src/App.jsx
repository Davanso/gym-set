import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Exercises from "./components/exercises";
import "./styles/app.css";
import ProtectedRoute from "./components/protected-route";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        // Adicionado a protecao antes dos componentes
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exercises"
        // Adicionado a protecao antes dos componentes
        element={
          <ProtectedRoute>
            <Exercises />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
