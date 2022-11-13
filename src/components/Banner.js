import React, { useState, useEffect } from "react";
import axios from "axios";
import moon from "../clipart/moon.png";
import rocket from "../clipart/rocket.png";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const Banner = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h"
      )
      .then((res) => {
        setTrendingCoins(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const items = trendingCoins.map((coin) => {
    return (
      <Link to={`/coins/${coin.id}`}>
        <div className="carousel__box">
          <img className="carousel__img" src={coin?.image} alt={coin.name} />
          <div className="carousel__row">
            <span>{coin.symbol.toUpperCase()}</span>
            {coin.market_cap_change_percentage_24h < 0 ? (
              <span className="red">
                {coin.market_cap_change_percentage_24h.toFixed(2)}%
              </span>
            ) : (
              <span className="green">
                {coin.market_cap_change_percentage_24h.toFixed(2)}%
              </span>
            )}
          </div>
          <p className="carousel__price">${coin.current_price.toFixed(2)}</p>
        </div>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 1,
    },
    512: {
      items: 2,
    },
    768: {
      items: 3,
    },
    1024: {
      items: 4,
    },
  };

  return (
    <div className="banner">
      <div className="title">
        <img src={moon} alt="moon" />
        <h1>To the Moon Crypto Tracker</h1>
        <img src={rocket} alt="rocket" />
      </div>
      <div className="carousel">
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          disableDotsControls
          disableButtonsControls
          autoPlay
          items={items}
          responsive={responsive}
        />
      </div>
      <span className="banner__attribution">
        Background image from{" "}
        <a href="https://www.freepik.com/free-vector/cartoon-galaxy-background-with-planets_14121184.htm#query=space&position=18&from_view=keyword">
          FreePik
        </a>
      </span>
    </div>
  );
};

export default Banner;
