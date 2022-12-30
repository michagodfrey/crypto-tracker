import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../AuthContext';
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import rocket from "../clipart/rocket.png";
import Modal from './Modal';

const Header = ({ setFavList, showAlert }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.getElementById("modalEmail").value = "";
    document.getElementById("modalPassword").value = "";
    document.getElementById("modalErrorMsg").innerHTML = "";
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.setItem("userName", "");
    localStorage.setItem("userEmail", "");
    localStorage.setItem("userImage", "");
    setFavList([]);
    showAlert(true, "warning", "Logged out!");
  };

  return (
    <header>
      <Link className="homepage-link" to="/">
        <img src={rocket} alt="rocket" />
        <span className="hide-mobile">To the Moon Crypto Tracker</span>
      </Link>
      <div className="user-info">
        {user ? (
          <>
            <span>
              {localStorage.getItem("userImage") ? (
                <img
                  src={`${localStorage.getItem("userImage")}`}
                  alt={`${user.displayName}`}
                />
              ) : null}
            </span>
            <span>
              {localStorage.getItem("userName")
                ? localStorage.getItem("userName")
                : user.email}
            </span>
            <button onClick={logout}>Sign out</button>
          </>
        ) : (
          <button onClick={openModal}>Login/Signup</button>
        )}
      </div>
      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        showAlert={showAlert}
      />
    </header>
  );
}

export default Header