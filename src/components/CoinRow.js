import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaRegStar } from "react-icons/fa";

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
  const [favorite, setFavorite] = useState(false);

  const toggleFavorite = () => {
    setFavorite(!favorite);
  }

  return (
    <tr className="coin-row">
      {favorite ? (
        <td className="coin-row__star" onClick={toggleFavorite}>
          <FaStar />
        </td>
      ) : (
        <td className="coin-row__star" onClick={toggleFavorite}>
          <FaRegStar />
        </td>
      )}
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
