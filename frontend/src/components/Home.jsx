import React from 'react';
import Hero from '../Home/Hero';
import Trending from '../Home/Trending';
import Creator from '../Home/Creator';

function Home() {
  return (
    <div className="bg-gradient-to-r from-green-200 via-yellow-300 to-pink-400 min-h-screen">
      {/* Changed gradient to include three different colors: from green-200, via yellow-300, to pink-400 */}
      <Hero />
      <Trending />
      <Creator />
    </div>
  );
}

export default Home;