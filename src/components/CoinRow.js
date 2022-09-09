import React from "react";
import { Link } from "react-router-dom";

const Coin = ({
  id,
  name,
  price,
  symbol,
  market_cap,
  image,
  priceChange,
  rank,
  volume
}) => {
  return (
    <tr>
      <td>{rank}</td>
      <td className="coin-row">
        <Link to={`/coins/${id}`}>
          <img src={image} alt="coin" />
          <h2>{name}</h2>
          <p>{symbol.toUpperCase()}</p>
        </Link>
      </td>
      {price > 1000 ? <td>${price.toLocaleString()}</td> : <td>${price}</td>}
      {priceChange < 0 ? (
        <td className="red">{priceChange.toFixed(2)}%</td>
      ) : (
        <td className="green">{priceChange.toFixed(2)}%</td>
      )}
      <td className="coin-row__hideMobile">${volume.toLocaleString()}</td>
      <td className="coin-row__hideMobile">${market_cap.toLocaleString()}</td>
    </tr>
  );
};

export default Coin;
