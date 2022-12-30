import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FaSearch, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "@firebase/firestore";
import { db } from "../firebase-config";
import { useAuth } from "../AuthContext";
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
  const [showFavList, setShowFavList] = useState(false);
  
  const { user, showAlert, alert } = useAuth();

  // fetch crytocurrency data from coingecko
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
        console.log(error.message);
        document.getElementById(
          "dataErrorMsg"
        ).innerHTML = `${error.message}`;
      });
  }, []);

  // display users favorites on login
  useEffect(() => {
    const getFirestoreFavList = async () => {
      try {
        const userDoc = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setFavList(docSnap.data().favorites);
        } else {
          console.log("Favorites list not found");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getFirestoreFavList();
  }, [user]);

  // search
  const handleChange = (e) => {
    setCurrentPage(0);
    setSearch(e.target.value);
  };

  // add and remove favorites
  const handleFavorite = async (id) => {
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      if (favList.includes(id)) {
        showAlert(true, "warning", `${id} removed from favorites!`);
        setFavList((current) =>
          current.filter((element) => {
            return element !== id;
          })
        );
        await updateDoc(userDoc, {
          favorites: arrayRemove(id),
        });
      } else {
        showAlert(true, "success", `${id} added to favorites!`);
        setFavList([...favList, id]);
        await updateDoc(userDoc, {
          favorites: arrayUnion(id),
        });
      }
    } else {
      if (favList.includes(id)) {
        showAlert(true, "warning", `${id} removed from favorites!`);
        setFavList((current) =>
          current.filter((element) => {
            return element !== id;
          })
        );
      } else {
        showAlert(true, "success", `${id} added to favorites!`);
        setFavList([...favList, id]);
      }
    }
  };

  // filter favorites
  function toggleShowFavList() {
    setCurrentPage(0);
    setShowFavList(!showFavList);
  }

  // display coins
  const filteredCoins = () => {
    if (showFavList) {
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
  const coinsPerPage = 20;
  const pages = currentPage * coinsPerPage;
  const pageCount = Math.ceil(coins.length / coinsPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
    document.documentElement.scrollTop = 300;
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
          <div id="dataErrorMsg" className="error"></div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header setFavList={setFavList} showAlert={showAlert} />

      <main>
        {alert.show && <Alert {...alert} showAlert={showAlert} />}
        <Banner />

        <div className="search">
          <label htmlFor="search" className="search__label">
            Search top 250 cryptocurrencies
          </label>
          <FaSearch className="search-icon" />
          <input
            id="search"
            type="text"
            onChange={handleChange}
            placeholder="Search..."
          />
        </div>

        <div className="favorites">
          <div className="favorites__switch">
            <input id="showFavs" type="checkbox" onChange={toggleShowFavList} />
            <span className="favorites__slider"></span>
          </div>
          <label className="favorites__label" htmlFor="showFavs">
            {showFavList ? `Show All` : `Show Favorites`}
          </label>
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
                <th className="hide-mobile">% Change 24hr</th>
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
