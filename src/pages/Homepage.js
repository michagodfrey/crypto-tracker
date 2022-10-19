import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import Header from "../components/Header";
import Banner from "../components/Banner";
import CoinRow from "../components/CoinRow";
import Footer from "../components/Footer";

const Homepage = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [favList, setFavList] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const handleFavorite = (id) => {

    if (favList.includes(id)) {
      console.log(`${id} removed from favorites!`)
      setFavList((current) =>
        current.filter((element) => {
          return element !== id;
        })
      );
    } else {
      console.log(`${id} added to favorites!`)
      setFavList([...favList, id]);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false"
      )
      .then((res) => {
        setLoading(false);
        // console.log(res.data);
        setCoins(res.data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.log(error);
      });
  }, []);

  // search
  const handleChange = (e) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  };

  // filter favorites
  function toggleShowFavorites() {
    setCurrentPage(0);
    if (favList.length < 1) {
      console.log('favList empty')
    }
    setShowFavorites(!showFavorites);
  };

  // display coins
  const filteredCoins = () => {
    if (showFavorites) {
      return coins.filter((coin) => favList.includes(coin.id));
    } else {
      return coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(search.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
    }
  };

  // pagination
  const coinsPerPage = 10;
  const pages = currentPage * coinsPerPage;
  const pageCount = Math.ceil(coins.length / coinsPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  // loading and error displays
  if (loading) {
    return (
      <>
        <Header />
        <main>
          <div className="loading">Loading...</div>
        </main>
        <Footer />
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
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Banner />

        <div className="search">
          <label for="search" className="search__label">
            search cryptocurrencies
          </label>
          <i className="material-icons search-icon">search</i>
          <input
            id="search"
            className="search__input"
            type="text"
            onChange={handleChange}
            placeholder="Search..."
          />
        </div>

        <div className="favorites">
          <div className="switch">
            <input
              id="showFavs"
              type="checkbox"
              onChange={toggleShowFavorites}
            />
            <span className="slider round"></span>
          </div>
          <label for="showFavs">Show Favorites</label>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>
                  <FaStar />
                </th>
                <th>#</th>
                <th>Coin</th>
                <th>Price</th>
                <th>% Change 24hr</th>
                <th className="hide-mobile">Volume 24hr</th>
                <th className="hide-mobile">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins()
                .slice(pages, pages + coinsPerPage)
                .map((coin) => {
                  return (
                    <CoinRow
                      key={coin.id}
                      id={coin.id}
                      name={coin.name}
                      price={coin.current_price}
                      symbol={coin.symbol}
                      market_cap={coin.market_cap}
                      image={coin.image}
                      priceChange={coin.price_change_percentage_24h}
                      rank={coin.market_cap_rank}
                      volume={coin.total_volume}
                      favList={favList}
                      handleFavorite={handleFavorite}
                    />
                  );
                })}
            </tbody>
          </table>
        </div>
        <ReactPaginate
          previousLabel={<FaChevronLeft />}
          nextLabel={<FaChevronRight />}
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
      <Footer />
    </>
  );
};

export default Homepage;
