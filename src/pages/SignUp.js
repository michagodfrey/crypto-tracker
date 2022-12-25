import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { auth, db } from "../firebase-config";
import Header from '../components/Header';
import Banner from "../components/Banner";
import Footer from '../components/Footer';

const SignUp = () => {
    const [ registerName, setRegisterName ] = useState("");
    const [ registerEmail, setRegisterEmail ] = useState("");
    const [ registerPassword, setRegisterPassword ] = useState("");

    const navigate = useNavigate();

    const register = () => {
        createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
          )
          .then(async (result) => {
            const ref = doc(db, "users", result.user.uid);
            await setDoc(ref, { email: registerEmail, name: registerName })
          })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            switch (error.code) {
                case "auth/invalid-email":
                    alert(`Sorry, ${registerEmail} is not a valid email`);
                    break;
                case "auth/weak-password":
                    alert("Password must be at least 6 characters");
                    break;
                case "auth/email-already-in-use":
                    alert(`${registerEmail} is already in use`);
                    break;
                case "auth/operation-not-allowed":
                    alert("Sorry, error during sign up");
                    break;
                default:
                    alert(error.message);
                    break;
            }
          })
    };

  return (
    <>
      <Header />
      <main>
        <Banner />
        <div className="sign-up">
          <h2>Register with email</h2>
          <form>
            <input
              placeholder="name (optional)"
              onChange={(event) => {
                setRegisterName(event.target.value);
              }}
            />
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
          </form>
          <button onClick={register}>Sign up</button>
          <p>
            Login credientials stored securely on{" "}
            <a href="https://firebase.google.com/">Firebase</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SignUp