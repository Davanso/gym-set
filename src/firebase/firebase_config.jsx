import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCr9y7_FNzhI2P3xM2l_obHPWH64O4P0kY",
  authDomain: "my-firebase-react-app-f94ca.firebaseapp.com",
  projectId: "my-firebase-react-app-f94ca",
  storageBucket: "my-firebase-react-app-f94ca.firebasestorage.app",
  messagingSenderId: "783737883023",
  appId: "1:783737883023:web:18f1a0405bece6478da3fa",
  measurementId: "G-5MCZF5V505",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
