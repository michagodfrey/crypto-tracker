import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <>
      <Header />
      <main>
        <div class="not-found">
          Sorry, can't find that page :(
        </div>
      </main>
      <Footer />
    </>
  );
}

export default NotFound