import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Alert from "../components/Alert";
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
  const [alert, setAlert] = useState({ show: false, type: '', msg: ''});

  // add favorites to array in user doc, get favorites from user doc rather than local storage

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

  // alert message for adding/removing favorites
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  // add and remove favorites
  const handleFavorite = (id) => {
    if (favList.includes(id)) {
      showAlert(true, "remove", `${id} removed from favorites!`);
      setFavList((current) =>
        current.filter((element) => {
          return element !== id;
        })
      );
    } else {
      showAlert(true, "add", `${id} added to favorites!`);
      setFavList([...favList, id]);
    }
  };

  // filter favorites
  function toggleShowFavorites() {
    setCurrentPage(0);
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
          <label htmlFor="search" className="search__label">
            Search top 250 cryptocurrencies
          </label>
          <i className="material-icons search-icon">search</i>
          <input
            id="search"
            type="text"
            onChange={handleChange}
            placeholder="Search..."
          />
        </div>

        <div className="favorites">
          <div className="favorites__switch">
            <input
              id="showFavs"
              type="checkbox"
              onChange={toggleShowFavorites}
            />
            <span className="favorites__slider"></span>
          </div>
          <label className="favorites__label" htmlFor="showFavs">
            {showFavorites ? `Show All` : `Show Favorites`}
          </label>
            {alert.show && <Alert {...alert} showAlert={showAlert} />}
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
