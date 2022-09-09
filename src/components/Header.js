import React from 'react';
import { Link } from "react-router-dom";
import rocket from "../rocket.png";

const Header = () => {
  return (
    <header>
      <Link to="/">
        {/* <span>To the Moon Crypto Tracker</span> */}
        <img src={rocket} alt="rocket" />
      </Link>
      <span>Login/Signup</span>
    </header>
  );
}

export default Header