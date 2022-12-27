import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { db, auth } from "../firebase-config";
import rocket from "../clipart/rocket.png";
import Modal from './Modal';

const Header = () => {
  const [ user, setUser ] = useState({});
  const [ userDetails, setUserDetails ] = useState({});
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  
  // make id = id of user
  // const userDoc = doc(db, "users", user.uid);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      


      setUser(currentUser);
    });
  }, []);

  // getDoc(userDoc)
  //   .then((doc) => {
  //     // console.log(doc.data(), doc.id);
  //     const details = doc.data()
  //     setUserDetails(details)
  //     // console.log(details.email)
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //   });

  console.log(user.uid)

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
  };

  return (
    <header>
      <Link className="homepage-link" to="/">
        <img src={rocket} alt="rocket" />
        <span className="hide-mobile">To the Moon Crypto Tracker</span>
      </Link>

      <div>
        {user ? (
          <>
            <span>{user.image ? user.image : null }</span>
            <span>{user.name ? user.name : user.email }</span>
            <button onClick={logout}>Sign out</button>
          </>
        ) : (
          <button onClick={openModal}>Login/Signup</button>
        )}
      </div>
      <Modal isModalOpen={isModalOpen} closeModal={closeModal} />
    </header>
  );
}

export default Header