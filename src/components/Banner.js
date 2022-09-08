import React from 'react';
import moon from "../moon.png";
import rocket from "../rocket.png";

const Banner = () => {
  return (
    <>
      <div className='banner'>
        <img className="banner__img" src={rocket} alt="rocket" />
        <h1>To the Moon Crypto Tracker</h1>
        <img className="banner__img" src={moon} alt="moon" />
      </div>
    </>
  );
}

export default Banner