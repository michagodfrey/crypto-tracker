import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Line } from "react-chartjs-2";

const CoinGraph = ({ coin }) => {
    const [chartData, setChartData] = useState();
    const [days, setDays] = useState(1);

    useEffect(() => {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=${days}`
        )
        .then((res) => {
          console.log(res.data);
          setChartData(res.data.prices);
        })
        .catch((error) => {
          console.log(error);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <div>
      <Line
        data={{
          labels: chartData.map((coin) => {
            let date = new Date(coin[0]);
            let time =
              date.getHours() > 12
                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                : `${date.getHours()}:${date.getMinutes()} AM`;
            return days === 1 ? time : date.toLocaleDateString();
          }),
          datasets: [
            {
              data: chartData.map((coin) => coin[1]),
              label: `Price ( Past ${days} Days )`,
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
        }}
      />
    </div>
  );
}

export default CoinGraph