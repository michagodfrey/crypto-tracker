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
        .then(async (res) => {
        const ref = doc(db, "users", res.user.uid);
        await setDoc(ref, { email: registerEmail, name: registerName, favorites: [] });
        localStorage.setItem("userName", registerName);
        localStorage.setItem("userEmail", registerEmail);
        })
        .then(() => {
        navigate("/");
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
            <p id="signupErrorMsg"></p>
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