import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Blogs() {
  const { blogs } = useAuth();
      return (
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
              {blogs && blogs.allblogs && blogs.allblogs.length > 0 ? (
                  blogs.allblogs.map((blog,index) => {
                      console.log(blog);
                      return (
                        <Link
                        to={`/blog/${blog._id}`}
                        key={index}
                        className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
                      >
                        <img
                          src={blog?.blogImage?.url}
                          alt={blog?.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black opacity-30"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h2 className="text-lg font-semibold">{blog?.title}</h2>
                          <p className="text-sm">{blog?.category}</p>
                        </div>
                      </Link>
                      );
                  })
              ) : (
                  <div>blog not available</div>
              )}
          </div>
  );
}

export default Blogs;