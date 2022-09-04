import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const CoinPage = () => {

  const params = useParams();
  const [coin, setCoin] = useState();

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${params.id}`)
      .then((res) => {
        setCoin(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

return (
  <>
    <Header />
    <div>CoinPage</div>
  </>
);
}

export default CoinPage