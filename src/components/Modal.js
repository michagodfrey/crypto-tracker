import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { db, auth, provider } from "../firebase-config";
import { doc, setDoc } from "@firebase/firestore";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isModalOpen, closeModal }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      closeModal();
    } catch (error) {
      document.getElementById("modalErrorMsg").innerHTML = `${error.message}`;
    }
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const registerName = res.user.displayName;
        const registerEmail = res.user.email;
        const registerImage = res.user.photoURL;

        // localStorage.setItem("userName", userName);
        // localStorage.setItem("userEmail", userEmail);
        // localStorage.setItem("userImg", userImg);

        const ref = doc(db, "users", res.user.uid);
        await setDoc(ref, { email: registerEmail, name: registerName, image: registerImage });
      })
      .then(() => {
        closeModal();
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
            <button onClick={closeModal}>
              <FaTimes></FaTimes>
            </button>
          </div>
        </div>

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

        <button className="modal-container__login" onClick={login}>
          Login
        </button>
        <p id="modalErrorMsg"></p>
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