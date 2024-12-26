import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { Link } from 'react-router-dom';

function Hero() {
  const {blogs} = useAuth();
  console.log(blogs);
  return (
    <div>
      {blogs && blogs.length>0 ?(
        blogs.slice(0,4).map((element)=>{
          {
            console.log(element);
          }
          return (
          <Link to={`/`} key={element._id}>
            <div>
              <img src={element.blogImage.url} alt=""/>
              <div></div>
              <h1>{element.title}</h1>
            </div>
            <div>
              <img src="" alt=""/>
              <p></p>
              <p></p>
            </div>
          </Link>
        );
          
        })
      ):(<div></div>)}
    </div>
  );
}

export default Hero