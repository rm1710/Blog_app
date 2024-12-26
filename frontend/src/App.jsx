import React from 'react';
import Navbar from './components/Navbar';
import Home from '../src/components/Home';
import Footer from './components/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import Blogs from '../src/pages/Blogs';
import About from '../src/pages/About';
import Contact from '../src/pages/Contact';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Dashboard from '../src/pages/Dashboard';
import Creators from '../src/pages/Creators';
import { useAuth } from "./context/AuthProvider";

function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(location.pathname);
  const {blogs}= useAuth();
  console.log(blogs);
  return (
  <div>
    {!hideNavbarFooter && <Navbar />}
      <Routes>
        {/* <Route exact path="/" element={<Home/>} /> */}
        <Route exact path="/blogs" element={<Blogs/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/contact" element={<Contact/>} />
        <Route exact path="/creators" element={<Creators/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/dashboard" element={<Dashboard/>} />
      </Routes>
    {/* {!hideNavbarFooter && <Footer />} */}
  </div>
  );
}

export default App;