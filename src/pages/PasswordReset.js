import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from "../firebase-config";
import { useAuth } from '../AuthContext';
import Header from "../components/Header";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

const PasswordReset = () => {
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const { showAlert } = useAuth();

    const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
        showAlert(true, "success", `Password reset sent to ${email}. Please check your SPAM folder.`);
        navigate("/");
        })
        .catch((error) => {
        document.getElementById(
            "resetErrorMsg"
        ).innerHTML = `${error.message}`;
        });
    }

    return (
      <>
        <Header />
        <main>
          <Banner />
          <div className="admin">
            <h2>Reset password</h2>
            <p id="resetErrorMsg"></p>
            <form>
              <input
                type="email"
                placeholder="account email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </form>
            <button onClick={resetPassword}>Send reset email</button>
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

export default PasswordReset