import React from "react";
import { Link } from "react-router-dom";
import CoinPage from "../pages/CoinPage";

const Coin = ({
  id,
  name,
  price,
  symbol,
  market_cap,
  image,
  priceChange,
  rank
}) => {
  return (
    <tr>
      <td>{rank}</td>
      <td className="coin-row">
        <Link to={`/coins/${id}`} element={<CoinPage />} key={id}>
          <img className="coin-row__image" src={image} alt="coin" />
          <h2 className="coin-row__name">{name}</h2>
          <p className="coin-row__symbol">{symbol}</p>
        </Link>
      </td>
      <td>${price.toLocaleString()}</td>
      {priceChange < 0 ? (
        <td className="coin-row__percent--red">{priceChange.toFixed(2)}%</td>
      ) : (
        <td className="coin-row__percent--green">{priceChange.toFixed(2)}%</td>
      )}
      <td>${market_cap.toLocaleString()}</td>
    </tr>
  );
};

export default Coin;
