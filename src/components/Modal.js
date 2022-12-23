import React, { useState } from 'react';
import { useGlobalContext } from "../context";
import { FaTimes } from "react-icons/fa";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, signInWithGoogle } from "../firebase-config";

const Modal = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { isModalOpen, closeModal } = useGlobalContext();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
        // create new document in users collection that takes the auth uid as the doc id

      // await addDoc(colRef, { email: registerEmail });
      // db.collection('users').doc()
      closeModal();
    } catch (error) {
      console.log(error.message);
      closeModal();
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      closeModal()
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
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes></FaTimes>
        </button>
        <div>
          <p>Register</p>
          <input
            type="email"
            placeholder="email"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
          <button onClick={register}>Sign up</button>
          <p>Sign in</p>
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
          <button onClick={login}>Login</button>
        </div>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
    </div>
  );
}

export default Modal