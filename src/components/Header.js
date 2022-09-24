import React from 'react';
import { Link } from "react-router-dom";
import { useGlobalContext } from '../context';
import rocket from "../clipart/rocket.png";
import Modal from './Modal';

const Header = () => {
   
  const { openModal } = useGlobalContext();

  return (
    <header>
      <Link className='homepage-link' to="/">
        <img src={rocket} alt="rocket" />
        <span className='hide-mobile'>To the Moon Crypto Tracker</span>
      </Link>
      <button onClick={openModal}>Login/Signup</button>
      <Modal />
    </header>
  );
}

export default Header