import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import Header from '../components/Header';
import Banner from "../components/Banner";
import Footer from '../components/Footer';

const SignUp = () => {
    const [ registerName, setRegisterName ] = useState("");
    const [ registerEmail, setRegisterEmail ] = useState("");
    const [ registerPassword, setRegisterPassword ] = useState("");
    const [ currentEmail, setCurrentEmail ] = useState("");

    const navigate = useNavigate();

    function isEmailValid(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    function userExists(email) {
        // query users collection for email and assign 
        console.log(email)
    }

    const register = async () => {
        if (!isEmailValid(registerEmail) || registerPassword.length < 6) {
          alert("Must use valid email with password of at least 6 characters");
        } else if (userExists(registerEmail)) {
            // a user with that name already exists, reset password link
        } else {
          try {
            await createUserWithEmailAndPassword(
              auth,
              registerEmail,
              registerPassword
            );
            // create new document in users collection that takes the auth uid as the doc id

            // await addDoc(colRef, { email: registerEmail });
            // db.collection('users').doc()
            navigate("/");
          } catch (error) {
            console.log(error.message);
            // error message
          }
        }
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