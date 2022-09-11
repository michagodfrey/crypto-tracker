import React from 'react';
import { Link } from "react-router-dom";
import rocket from "../rocket.png";

const Header = () => {

  const handleClick = () => {
    alert("Sign up coming soon")
  }

  return (
    <header>
      <Link className='homepage-link' to="/">
        <img src={rocket} alt="rocket" />
        <span className='hide-mobile'>To the Moon Crypto Tracker</span>
      </Link>
      <span onClick={handleClick}>Login/Signup</span>
    </header>
  );
}

export default Header