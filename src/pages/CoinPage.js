import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { format } from "date-fns";
import Header from "../components/Header";
import CoinChart from "../components/CoinChart";
import Footer from "../components/Footer";

const CoinPage = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [readMore, setReadMore] = useState(false);

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
        document.getElementById(
          "coinErrorMsg"
        ).innerHTML = `${error.message}`;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // while loading display loading animation
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

  // if error fetching data display error message
  if (error) {
    return (
      <>
        <Header />
        <main>
          <div id="coinErrorMsg" className="error"></div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <div className="coin">
          <div className="coin__flexItem1">
            <div>
              {coin.image ? <img src={coin.image.large} alt="" /> : null}
            </div>

            <div className="coin__container">
              <h2>{coin.name}</h2>
              <span className="coin__rank">Rank # {coin.market_cap_rank}</span>
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

            <div className="coin__container">
              <p>Total Supply</p>
              {coin.market_data?.total_supply ? (
                <p>{coin.market_data.total_supply.toLocaleString()}</p>
              ) : (
                <p>N/A</p>
              )}
            </div>

            <div className="coin__table">
              <table>
                <thead>
                  <tr>
                    <th>All Time High</th>
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
                          <p className="red">
                            {coin.market_data.ath_change_percentage.usd.toFixed(
                              2
                            )}
                            %
                          </p>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                </tbody>
                <thead>
                  <tr>
                    <th>All Time Low</th>
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
                          <p className="green">
                            {coin.market_data.atl_change_percentage.usd.toFixed(
                              2
                            )}
                            %
                          </p>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="coin__flexItem2">
            <CoinChart coin={coin} />
            <div className="coin__outer-container">
              <div className="coin__container coin__container--stretch">
                <h4>24 Hour Volume:</h4>
                {coin.market_data?.total_volume ? (
                  <p>${coin.market_data.total_volume.usd.toLocaleString()}</p>
                ) : null}
              </div>

              <div className="coin__container coin__container--stretch">
                <h4>24 Hour High:</h4>
                {coin.market_data?.high_24h ? (
                  <p className="green">${coin.market_data.high_24h.usd}</p>
                ) : null}
              </div>

              <div className="coin__container coin__container--stretch">
                <h4>24 Hour Low:</h4>
                {coin.market_data?.low_24h ? (
                  <p className="red">${coin.market_data.low_24h.usd}</p>
                ) : null}
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>1h</th>
                  <th>24h</th>
                  <th>7d</th>
                  <th>14d</th>
                  <th>30d</th>
                  <th>1yr</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {coin.market_data
                      ?.price_change_percentage_1h_in_currency.usd ? (
                      coin.market_data.price_change_percentage_1h_in_currency
                        .usd > 0 ? (
                        <p className="green">
                          {coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      ) : (
                        <p className="red">
                          {coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      )
                    ) : null}
                  </td>
                  <td>
                    {coin.market_data
                      ?.price_change_percentage_24h_in_currency.usd ? (
                      coin.market_data.price_change_percentage_24h_in_currency
                        .usd > 0 ? (
                        <p className="green">
                          {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      ) : (
                        <p className="red">
                          {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      )
                    ) : null}
                  </td>
                  <td>
                    {coin.market_data
                      ?.price_change_percentage_7d_in_currency.usd ? (
                      coin.market_data.price_change_percentage_7d_in_currency
                        .usd > 0 ? (
                        <p className="green">
                          {coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      ) : (
                        <p className="red">
                          {coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      )
                    ) : null}
                  </td>
                  <td>
                    {coin.market_data
                      ?.price_change_percentage_14d_in_currency.usd ? (
                      coin.market_data.price_change_percentage_14d_in_currency
                        .usd > 0 ? (
                        <p className="green">
                          {coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      ) : (
                        <p className="red">
                          {coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      )
                    ) : null}
                  </td>
                  <td>
                    {coin.market_data
                      ?.price_change_percentage_30d_in_currency.usd ? (
                      coin.market_data.price_change_percentage_30d_in_currency
                        .usd > 0 ? (
                        <p className="green">
                          {coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      ) : (
                        <p className="red">
                          {coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      )
                    ) : null}
                  </td>
                  <td>
                    {coin.market_data
                      ?.price_change_percentage_1y_in_currency.usd ? (
                      coin.market_data.price_change_percentage_1y_in_currency
                        .usd > 0 ? (
                        <p className="green">
                          {coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      ) : (
                        <p className="red">
                          {coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                            1
                          )}
                          %
                        </p>
                      )
                    ) : null}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr></hr>

        <div className="coin__description">
          <h3>Description:</h3>
          {readMore ? (
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  coin.description ? coin.description.en : ""
                ),
              }}
            ></p>
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  coin.description
                    ? `${coin.description.en.substring(0, 250)}...`
                    : ""
                ),
              }}
            ></p>
          )}
          <button
            className="read-more-btn"
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? "show less" : " read more"}
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CoinPage;
