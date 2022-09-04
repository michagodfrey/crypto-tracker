import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Header from "../components/Header";
import Coin from "../components/Coin";

const Homepage = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const coinsPerPage = 10;
  const pages = currentPage * coinsPerPage;

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false"
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setCoins(res.data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
    );

  if (loading) {
    return (
      <>
        <Header />
        <main>
          <div className="loading">Loading...</div>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <main>
          <div className="error">Error loading data.</div>
        </main>
      </>
    );
  }

  const pageCount = Math.ceil(coins.length / coinsPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <Header />
      <main>
        <form>
          <i className="material-icons search-icon">search</i>
          <input type="text" onChange={handleChange} placeholder="Search..." />
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
              {filteredCoins.slice(pages, pages + coinsPerPage).map((coin) => {
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
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          forcePage={currentPage}
          containerClassName={"pagination-container"}
          previousLinkClassName={"previous-btn"}
          nextLinkClassName={"next-btn"}
          pageClassName={"pagination__btns"}
          activeClassName={"pagination__btn--active"}
        />
      </main>
    </>
  );
};

export default Homepage;
