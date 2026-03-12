import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAuC6TLpuVW-kfUCjJDlQZT2PY87heMbA0",
  authDomain: "falabak-2d69a.firebaseapp.com",
  projectId: "falabak-2d69a",
  storageBucket: "falabak-2d69a.firebasestorage.app",
  messagingSenderId: "981426691090",
  appId: "1:981426691090:web:c9b9831c431ac932144ccb",
  measurementId: "G-FCCHMFWQD6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
