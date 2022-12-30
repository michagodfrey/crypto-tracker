import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { db, auth, googleProvider } from "../firebase-config";
import { doc, collection, query, where, setDoc } from "@firebase/firestore";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isModalOpen, closeModal, showAlert }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      closeModal();
      showAlert(true, "success", "Logged in!");
    } catch (error) {
      document.getElementById("modalErrorMsg").innerHTML = `${error.message}`;
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (res) => {

        const registerName = res.user.displayName;
        const registerEmail = res.user.email;
        const registerImage = res.user.photoURL;

        const usersCol = collection(db, "users");
        const userExists = query(usersCol, where("email", "==", registerEmail))

        if (!userExists) {
          const ref = doc(db, "users", res.user.uid);
          await setDoc(ref, {
            email: registerEmail,
            name: registerName,
            image: registerImage,
            favorites: [],
          });
        }  
      })
      .then(() => {
        closeModal();
        showAlert(true, "success", "Logged in!");
      })
      .catch((error) => {
        document.getElementById("modalErrorMsg").innerHTML = `${error.message}`;
      });
  };

  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <div className="modal-container__title">
          <div>
            <h2>Sign in</h2>
          </div>
          <div>
            <span onClick={closeModal}>
              <FaTimes></FaTimes>
            </span>
          </div>
        </div>
        <span id="modalErrorMsg"></span>
        <form>
          <input
            id="modalEmail"
            type="email"
            autoComplete="email"
            placeholder="email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            id="modalPassword"
            type="password"
            autoComplete="current-password"
            placeholder="password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
        </form>
        <button
          type="submit"
          className="modal-container__login"
          onClick={login}
        >
          Login
        </button>
        <br></br>
        <br></br>
        <hr></hr>
        <p>Or sign in with Google</p>
        <p>
          <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </p>
        <p>
          Don't have an account?{" "}
          <Link to={"/signup"} onClick={closeModal}>
            Sign up with email here
          </Link>
        </p>
        <p>
          Forgot your password?{" "}
          <Link to={"/reset"} onClick={closeModal}>
            Reset it here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Modal