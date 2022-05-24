import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5PGHURuSwO_DQ1ojlNgMo2U8sXEeQKEE",
  authDomain: "compliance-management-sy-a889b.firebaseapp.com",
  databaseURL:
    "https://compliance-management-sy-a889b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "compliance-management-sy-a889b",
  storageBucket: "compliance-management-sy-a889b.appspot.com",
  messagingSenderId: "1019273321721",
  appId: "1:1019273321721:web:fc9e5e03ca0b33d4fa5628",
  measurementId: "G-61MSHT4JL9",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export const storage = getStorage();

export const auth = getAuth(app);

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};
