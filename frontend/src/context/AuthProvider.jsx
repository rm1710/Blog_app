import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let token = localStorage.getItem("jwt");
        console.log(token);
        if (token) {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/users/my-profile`,
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(data.user);
          setProfile(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/all-blogs`,
          { withCredentials: true }
        );
        console.log(data);
        setBlogs(data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchBlogs();
    fetchProfile();
  }, [isAuthenticated]);
  return (
    <AuthContext.Provider value={{ blogs, profile, setProfile, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
