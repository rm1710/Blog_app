import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Trending() {
  const { blogs } = useAuth();
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Trending</h1>
      <Carousel responsive={responsive} itemClass="px-2">
        {blogs && blogs.allblogs && blogs.allblogs.length > 0 ? (
          blogs.allblogs.slice(0, 6).map((element) => {
            console.log(element);
            return (
              <Link
                to={`/blog/${element._id}`}
                key={element._id}
                className="bg-white rounded-lg hover:shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500 ease-in-out m-2"
              >
                <div className="group relative rounded-lg overflow-hidden">
                  <img
                    src={element.blogImage.url}
                    alt=""
                    className="w-full h-56 object-cover rounded-t-lg transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                  <h1 className="absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-400 group-hover:translate-y-2 transition-all duration-500">
                    {element.title}
                  </h1>
                </div>
                <div className="p-6 flex items-center">
                  <img
                    src={element.adminPhoto}
                    alt=""
                    className="w-12 h-12 rounded-full border-2 border-yellow-400 transform transition-transform duration-500 group-hover:rotate-6"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-800 group-hover:text-yellow-500 transition-colors duration-500">
                      {element.adminName}
                    </p>
                    <p className="text-xs text-gray-400 animate-pulse">New</p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div><div className='text-center h-screen items-center justify-center'>Loading...</div></div>
        )}
      </Carousel>
    </div>
  );
}

export default Trending;
