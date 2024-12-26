import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
export const AuthContext = createContext();



export const AuthProvider = ({children}) => {
    const [blogs, setBlogs] = useState();
   

    useEffect(() => {
        const fetchBlogs = async () => {
            try{
                const {data} = await axios.get("http://localhost:3000/api/blogs/all-blogs",
                {withCredentials: true}
                );
                console.log(data);
                setBlogs(data);
            }catch(error){
                console.log(error)
            }
        };
        fetchBlogs();
    }, []); 
  return (
    <AuthContext.Provider value={{blogs}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)