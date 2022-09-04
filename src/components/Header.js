import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <span>Crypto Price Tracker</span>
      </Link>
      <span>
        Data provided by <a href="https://www.coingecko.com/">CoinGecko</a>
      </span>
    </header>
  );
}

export default Header