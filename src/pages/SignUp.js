import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { auth, db } from "../firebase-config";
import { useAuth } from "../AuthContext";
import Header from '../components/Header';
import Banner from "../components/Banner";
import Footer from '../components/Footer';

const SignUp = () => {
    const [ registerName, setRegisterName ] = useState("");
    const [ registerEmail, setRegisterEmail ] = useState("");
    const [ registerPassword, setRegisterPassword ] = useState("");

    const navigate = useNavigate();

    const { showAlert } = useAuth();

    const register = () => {
        createUserWithEmailAndPassword(
            auth,
            registerEmail,
            registerPassword
        )
        .then(async (res) => {
        const ref = doc(db, "users", res.user.uid);
        await setDoc(ref, {
          email: registerEmail,
          name: registerName,
          favorites: [],
          image: "http://placeimg.com/50/50/animals",
        });
        localStorage.setItem("userName", registerName);
        localStorage.setItem("userEmail", registerEmail);
        localStorage.setItem("userImg", "http://placeimg.com/50/50/animals");
        })
        .then(() => {
        navigate("/");
        showAlert(true, "success", "Welcome!");
        })
        .catch((error) => {
        document.getElementById("signupErrorMsg").innerHTML = `${error.message}`;
        })
    };

    return (
      <>
        <Header />
        <main>
          <Banner />
          <div className="admin">
            <h2>Register with email</h2>
            <p id="signupErrorMsg"></p>
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