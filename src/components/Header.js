import React from 'react';
import { Link } from "react-router-dom";
import rocket from "../clipart/rocket.png";

const Header = () => {

  const handleClick = () => {
    alert("Thanks for the interest but this feature is not available yet. When it is, you wil be able to sign in with your Google account to save your favorite cryptos and view them in a curated list.")
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