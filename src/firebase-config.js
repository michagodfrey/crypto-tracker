import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDy9risPAB3ncznLa2oYPoSoj4KTGUqWr8",
  authDomain: "mooncryptotracker.firebaseapp.com",
  projectId: "mooncryptotracker",
  storageBucket: "mooncryptotracker.appspot.com",
  messagingSenderId: "523478148851",
  appId: "1:523478148851:web:30334828295059430f7986",
  measurementId: "G-3QV7HBDRTW",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
