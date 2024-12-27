import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Trending() {

  const { blogs } = useAuth();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div className="container mx-auto">
      <h1 className='text-2xl font-semibold mb-4'>Trending</h1>
      <Carousel responsive={responsive}>
        {blogs && blogs.allblogs && blogs.allblogs.length > 0 ? (
          blogs.allblogs.slice(0, 4).map((element) => {
            console.log(element);
            return (
              <Link to={`/`} key={element._id} className='bg-white rounded-lg hover:shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300'>
                <div className='group relative'>
                  <img src={element.blogImage.url} alt="" className='w-full h-56 object-cover' />
                  <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-75 group-hover:opacity-100 transition-transform duration-300'></div>
                  <h1 className='absolute bottom-4 left-4 text-white text-xl font-bold group-hover:text-yellow-500 transition-colors duration-300'>{element.title}</h1>
                </div>
                <div className='p-6 flex items-center'>
                  <img src={element.adminPhoto} alt="" className='w-12 h-12 rounded-full border-2 border-yellow-400' />
                  <div className='ml-4 '>
                    <p className='text-lg font-semibold text-gray-800'>{element.adminName}</p>
                    <p className="text-xs text-gray-400">New</p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div>blog not available</div>
        )}
      </Carousel>
    </div>
  )
}

export default Trending;