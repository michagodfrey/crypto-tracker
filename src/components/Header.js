import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <span>To the Moon Crypto Tracker</span>
      </Link>
      <span>Login/Signup</span>
    </header>
  );
}

export default Header