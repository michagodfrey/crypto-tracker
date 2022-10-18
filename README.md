# To the Moon Crypto Tracker

This is a cryptocurrency price tracking app. It displays the price data for the top 200 cryptocurrencies as ranked by [CoinGecko](https://www.coingecko.com/).

The data comes from [CoinGecko's public API](https://www.coingecko.com/en/api) and [Firebase](https://firebase.google.com/) hosts the web app.

## Version 1

The homepage displays a list of cryptocurrencies starting with the largest market cap. The list shows rank, price and recent price changes. Each cryptocurrency page has more details including a historical price chart and description.

### Links

[Live site](https://mooncryptotracker.firebaseapp.com/)

### Screenshots

Homepage view

![homepage view](./screenshots/screenshot-homepage.png)

CoinPage view

![coin page view](./screenshots/screenshot-coinpage.png)

### Built with

I used the React framework to build the frontend of this project. It has the following dependencies:

- axios
- react-router-dom
- react-paginate
- chart.js
- reactchartjs-2
- react-alice-carousel
- dompurify
- date-fns
- react-icons

Styling was done with a custom CSS stylesheet and included the normalize stylesheet.

### Useful resources

I always wanted to build a crypto price app using data and built this app myself from scratch. However, as I am learning React, used multiple sources to workout how to make specific components.

#### Tutorials that helped

To get started this tutorial by [Brian Design](https://www.youtube.com/watch?v=9ohK7CapmIs&t) helped give me the refresher I needed on getting data from APIs.

[Roadside Coder](https://www.youtube.com/watch?v=QA6oTpMZp84)'s tutorial and repo helped me implement the more complex components of the app and was also the inspiration for the overall layout.

I also studied the repo from the turorial by [Code Commerce](https://www.youtube.com/watch?v=gxXw-M5lDOw&t) to implement some of the features in this project.

To make the pagination component I followed this tutorial by [PedroTech](https://www.youtube.com/watch?v=HANSMtDy508).

The examples Chart-js 2 at [Educative](<https://www.educative.io/answers/how-to-use-chartjs-to-create-charts-in-react>) helped me figure out to to display a chart in this app.

#### Images

Moon image from [Stick PNG](http://www.stickpng.com/img/nature/moon/moon-clipart)

Rocket image from [Clipart World](https://clipart.world/rocket-clipart/rocket-clipart-transparent-background-7/)

Space background image from [FreePik](https://www.freepik.com/free-vector/cartoon-galaxy-background-with-planets_14121184.htm#query=space&position=18&from_view=keyword)
