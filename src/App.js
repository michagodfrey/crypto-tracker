import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setLoading(false)
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <>
        <header>
          <h1>Crypto Price Tracker</h1>
          <span>
            Data provided by <a href="https://www.coingecko.com/">CoinGecko</a>
          </span>
        </header>
        <main>Loading...</main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <header>
          <h1>Crypto Price Tracker</h1>
          <span>
            Data provided by <a href="https://www.coingecko.com/">CoinGecko</a>
          </span>
        </header>
        <main>Sorry I cocked up</main>
      </>
    );
  }

  return (
    <>
      <header>
        <h1>Crypto Price Tracker</h1>
        <span>
          Data provided by <a href="https://www.coingecko.com/">CoinGecko</a>
        </span>
      </header>
      <main>
        <form>
          <i className="material-icons search">search</i>
          <input type="text" onChange={handleChange} placeholder="Search..." />
          <i className="material-icons cancel">cancel</i>
        </form>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Coin</th>
                <th>Price</th>
                <th>% Change 24hr</th>
                <th>Market Cap</th>
                <th>All Time High</th>
                <th>ATH Date</th>
                <th>% ATH Change</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => {
                return (
                  <Coin
                    key={coin.id}
                    name={coin.name}
                    price={coin.current_price}
                    symbol={coin.symbol}
                    market_cap={coin.market_cap}
                    image={coin.image}
                    priceChange={coin.price_change_percentage_24h}
                    rank={coin.market_cap_rank}
                    ath={coin.ath}
                    ath_change={coin.ath_change_percentage}
                    ath_date={coin.ath_date}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

export default App;
