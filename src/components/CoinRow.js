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
    <tr className="coin-row">
      <td>{rank}</td>
      <td className="coin-row__coin">
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
      <td className="hide-mobile">${volume.toLocaleString()}</td>
      <td className="hide-mobile">${market_cap.toLocaleString()}</td>
    </tr>
  );
};

export default Coin;
