import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { format } from "date-fns";
import Header from "../components/Header";
import CoinGraph from "../components/CoinGraph";
import Footer from "../components/Footer";

const CoinPage = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${params.id}`)
      .then((res) => {
        setLoading(false);
        setCoin(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <main className="coin">
        <div className="coin__flexItem1">
          <div>{coin.image ? <img src={coin.image.large} alt="" /> : null}</div>

          <div className="coin__container">
            <div>{coin.name}</div>
            <div className="coin__rank">Rank # {coin.market_cap_rank}</div>
          </div>

          <div className="coin__container">
            <div>
              {coin.symbol ? <p>{coin.symbol.toUpperCase()}/USD</p> : null}
            </div>
            <div>
              {coin.market_data?.current_price ? (
                <>
                  {coin.market_data.current_price.usd > 1000 ? (
                    <p>
                      ${coin.market_data.current_price.usd.toLocaleString()}
                    </p>
                  ) : (
                    <p>${coin.market_data.current_price.usd}</p>
                  )}
                </>
              ) : null}
            </div>
          </div>

          <div className="coin__container">
            <p>Market Cap</p>
            {coin.market_data?.market_cap ? (
              <p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
            ) : null}
          </div>

          <div className="coin__container">
            <p>Circulating Supply</p>
            {coin.market_data ? (
              <p>{coin.market_data.circulating_supply.toLocaleString()}</p>
            ) : null}
          </div>

          <div className="coin__table">
            <table>
              <thead>
                <tr>
                  <th>ATH</th>
                  <th>ATH Date</th>
                  <th>% Change</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>
                      {coin.market_data?.ath ? (
                        <p>${coin.market_data.ath.usd.toLocaleString()}</p>
                      ) : null}
                    </div>
                  </td>
                  <td>
                    <div>
                      {coin.market_data?.ath_date ? (
                        <p>
                          {format(
                            new Date(coin.market_data.ath_date.usd),
                            "dd/MM/yyyy"
                          )}
                        </p>
                      ) : null}
                    </div>
                  </td>
                  <td>
                    <div>
                      {coin.market_data?.ath_change_percentage ? (
                        <p>{coin.market_data.ath_change_percentage.usd}%</p>
                      ) : null}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="coin__table">
            <table>
              <thead>
                <tr>
                  <th>ATL</th>
                  <th>ATL Date</th>
                  <th>% Change</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>
                      {coin.market_data?.atl ? (
                        <p>${coin.market_data.atl.usd.toLocaleString()}</p>
                      ) : null}
                    </div>
                  </td>
                  <td>
                    <div>
                      {coin.market_data?.atl_date ? (
                        <p>
                          {format(
                            new Date(coin.market_data.atl_date.usd),
                            "dd/MM/yyyy"
                          )}
                        </p>
                      ) : null}
                    </div>
                  </td>
                  <td>
                    <div>
                      {coin.market_data?.atl_change_percentage ? (
                        <p>{coin.market_data.atl_change_percentage.usd}%</p>
                      ) : null}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="coin__flexItem2">
          <div className="coin__graph">
            <CoinGraph coin={coin}/>
          </div>

          <div className="coin__container">
            <h4>24 Hour Volume</h4>
            {coin.market_data?.total_volume ? (
              <p>${coin.market_data.total_volume.usd.toLocaleString()}</p>
            ) : null}
          </div>

          <div className="coin__container">
            <h4>24 Hour High</h4>
            {coin.market_data?.high_24h ? (
              <p>${coin.market_data.high_24h.usd.toLocaleString()}</p>
            ) : null}
          </div>

          <div className="coin__container">
            <h4>24 Hour Low</h4>
            {coin.market_data?.low_24h ? (
              <p>${coin.market_data.low_24h.usd.toLocaleString()}</p>
            ) : null}
          </div>
        </div>
      </main>

      <section className="coin__description">
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              coin.description ? coin.description.en : ""
            ),
          }}
        ></p>
      </section>
      <Footer />
    </>
  );
};

export default CoinPage;
