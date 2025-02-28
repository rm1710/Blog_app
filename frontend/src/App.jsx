import React from 'react';
import Navbar from './components/Navbar';
import Home from '../src/components/Home';
import Footer from './components/Footer';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Blogs from '../src/pages/Blogs';
import About from '../src/pages/About';
import Contact from '../src/pages/Contact';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Dashboard from '../src/pages/Dashboard';
import Creators from '../src/pages/Creators';
import UpdateBlog from '../src/dashboard/UpdateBlog';
import { useAuth } from './context/AuthProvider';
import { Toaster } from 'react-hot-toast';
import Details from './pages/Details';
import Notfound from './pages/Notfound';

function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(location.pathname);
  const {blogs, isAuthenticated}= useAuth();
  console.log(blogs);
  console.log(isAuthenticated);
  return (
  <div>
    {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route exact path="/" element={isAuthenticated=== true? <Home/> : <Navigate to="/login"/>} />
        <Route exact path="/blogs" element={<Blogs/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/contact" element={<Contact/>} />
        <Route exact path="/creators" element={<Creators/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/dashboard" element={<Dashboard/>} />
        {/* update page route */}
        <Route exact path="/blog/:id" element={<Details/>} />

        <Route exact path="/blog/update/:id" element={<UpdateBlog/>} />
        <Route exact path="*" element={<Notfound/>} />

      </Routes>
      <Toaster/>
    {!hideNavbarFooter && <Footer />}
  </div>
  );
}

export default App;