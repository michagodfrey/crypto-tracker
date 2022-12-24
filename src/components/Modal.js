import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle } from "../firebase-config";
import { FaTimes } from "react-icons/fa";

const Modal = ({ isModalOpen, closeModal }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      closeModal();
    } catch (error) {
      console.log(error.message);
      closeModal();
    }
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
            type="email"
            placeholder="email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
        </form>
        <button className='modal-container__login' onClick={login}>Login</button>
        <p>
          Don't have an account?{" "}
          <Link to={"/signup"} onClick={closeModal}>
            Sign up with email here
          </Link>
        </p>
        {/* <button onClick={signInWithGoogle}>Sign in with Google</button> */}
      </div>
    </div>
  );
};

export default Modal