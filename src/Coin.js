import React from "react";
import { format } from "date-fns";

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
  
  const ath_date_parsed = Date.parse(ath_date);

  return (
    <tr>
      <td>{rank}</td>
      <td className="coin">
        <img className="coin__image" src={image} alt="crypto" />
        <h2 className="coin__name">{name}</h2>
        <p className="coin__symbol">{symbol}</p>
      </td>
      <td>${price}</td>
      {priceChange < 0 ? (
        <td className="percent--red">
          {priceChange.toFixed(2)}%
        </td>
      ) : (
        <td className="percent--green">
          {priceChange.toFixed(2)}%
        </td>
      )}
      <td>${market_cap.toLocaleString()}</td>
      <td>${ath}</td>
      <td>{format(ath_date_parsed, "yyyy/MM/dd")}</td>
      <td>{ath_change}%</td>
    </tr>
  );
};

export default Coin;
