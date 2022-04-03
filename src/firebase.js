import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBu9oEXFYS7YOHBodJ7FTF1L693NQwrYdo",
  authDomain: "connect2-c7d93.firebaseapp.com",
  projectId: "connect2-c7d93",
  storageBucket: "connect2-c7d93.appspot.com",
  messagingSenderId: "337587282929",
  appId: "1:337587282929:web:e03ee906ab80f004fc5a50",
};
initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export const db = getFirestore();
