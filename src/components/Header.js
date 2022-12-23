import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useGlobalContext } from '../context';
import rocket from "../clipart/rocket.png";
import Modal from './Modal';

const Header = () => {
  const [user, setUser] = useState({});

  const { openModal } = useGlobalContext();
  
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
    console.log("signed out");
  };

  // display more user data

  return (
    <header>
      <Link className="homepage-link" to="/">
        <img src={rocket} alt="rocket" />
        <span className="hide-mobile">To the Moon Crypto Tracker</span>
      </Link>

      <div>
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={logout}>Sign out</button>
          </>
        ) : (
          <button onClick={openModal}>Login/Signup</button>
        )}
      </div>
      <Modal />
    </header>
  );
}

export default Header