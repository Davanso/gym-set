import { useState, useEffect } from "react";
import { db } from "../firebase/firebase_config";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaArrowLeft } from "react-icons/fa";
import "../styles/exercises.css";

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editExercise, setEditExercise] = useState("");
  const [editReps, setEditReps] = useState("");
  const [editWeight, setEditWeight] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "exercises"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const exercisesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExercises(exercisesArray);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "exercises", id));
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  const handleEdit = (ex) => {
    setEditId(ex.id);
    setEditExercise(ex.exercise);
    setEditReps(ex.reps);
    setEditWeight(ex.weight);
  };

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "exercises", editId), {
        exercise: editExercise,
        reps: parseInt(editReps),
        weight: parseFloat(editWeight),
      });
      setEditId(null);
    } catch (error) {
      console.error("Erro ao atualizar:", error);
    }
  };

  return (
    <div className="exercises-container">
      <h2>Meus Exercícios</h2>
      <button onClick={() => navigate("/dashboard")}>
        <FaArrowLeft /> Voltar
      </button>
      <ul>
        {exercises.map((ex) => (
          <li key={ex.id} className="exercise-item">
            {editId === ex.id ? (
              <div>
                <input
                  value={editExercise}
                  onChange={(e) => setEditExercise(e.target.value)}
                />
                <input
                  value={editReps}
                  onChange={(e) => setEditReps(e.target.value)}
                />
                <input
                  value={editWeight}
                  onChange={(e) => setEditWeight(e.target.value)}
                />
                <button onClick={handleUpdate}>Salvar</button>
                <button onClick={() => setEditId(null)}>Cancelar</button>
              </div>
            ) : (
              <div>
                <strong>{ex.exercise}</strong> - {ex.reps} repetições -{" "}
                {ex.weight} kg
                <button onClick={() => handleEdit(ex)}>
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(ex.id)}>
                  <FaTrash />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Exercises;
