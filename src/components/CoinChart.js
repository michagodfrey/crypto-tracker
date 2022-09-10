import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const CoinGraph = ({ coin }) => {
    const [chartData, setChartData] = useState();
    const [days, setDays] = useState(1);
    const [isActive, setIsActive] = useState (false);

    const toggleClass = () => {
      setIsActive(!isActive);
    }

    useEffect(() => {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=${days}`
        )
        .then((res) => {
          // console.log(res.data);
          setChartData(res.data.prices);
        })
        .catch((error) => {
          console.log(error);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days]);

    const chartDays = [
      {
        label: "24 Hours",
        value: 1,
      },
      {
        label: "30 Days",
        value: 30,
      },
      {
        label: "3 Months",
        value: 90,
      },
      {
        label: "1 Year",
        value: 365,
      },
      {
        label: "Max",
        value: 3000,
      }
    ];

  return (
    <div className="coin__chart">
      {!chartData ? (
        <p>Loading chart data...</p>
      ) : (
        <>
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
                  borderColor: "gold",
                  backgroundColor: "#333",
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
          <div>
            {chartDays.map((day) => {
              return (
                <button
                  className={isActive ? "coin__chart-btn--active" : "coin__chart-btn"}
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                    toggleClass();
                  }}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default CoinGraph