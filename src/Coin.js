import React from "react";

const Coin = ({
  name,
  price,
  symbol,
  market_cap,
  image,
  priceChange,
  rank,
  ath,
  ath_change,
  ath_date,
}) => {

  // const date = ath_date.getFullYear()
  
  return (
    <tr>
      <td>{rank}</td>
      <td className="coin">
        <img className="coin__image" src={image} alt="crypto" />
        <h2 className="coin__name">{name}</h2>
        <p className="coin__symbol">{symbol}</p>
      </td>
      <td className="coin__price">${price}</td>
      {priceChange < 0 ? (
        <td className="coin__percent coin__percent--red">
          {priceChange.toFixed(2)}%
        </td>
      ) : (
        <td className="coin__percent coin__percent--green">
          {priceChange.toFixed(2)}%
        </td>
      )}
      <td className="coin__volume">${market_cap.toLocaleString()}</td>
      <td>${ath}</td>
      <td>{ath_date}</td>
      <td>{ath_change}%</td>
    </tr>
  );
};;

export default Coin;
