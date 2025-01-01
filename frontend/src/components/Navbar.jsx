import { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Navbar() {
  const [show, setShow] = useState(false);
  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:3000/api/users/logout", { withCredentials: true });
      toast.success(data.message);
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  }

  return (
    <>
      <nav className='shadow-lg px-7 py-3 bg-red-100'>
        <div className='flex items-center justify-between container mx-auto'>
          <div className='font-semibold text-3xl'>True
            <span className='text-red-600'>Blogs</span>
          </div>
          {/* Desktop */}
          <div className='mx-6 '>
            <ul className='hidden md:flex space-x-6'>
              <Link to="/">HOME</Link>
              <Link to="/blogs">BLOGS</Link>
              <Link to="/creators">CREATORS</Link>
              <Link to="/about">ABOUT</Link>
              <Link to="/contact">CONTACT</Link>
            </ul>
            <div className='md:hidden' onClick={() => setShow(!show)}>
              {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </div>
          <div className="flex space-x-2">
            {isAuthenticated && profile?.role === "admin" ? (
              <Link
                to="/dashboard"
                className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"
              >
                DASHBOARD
              </Link>
            ) : (
              ""
            )}
            {!isAuthenticated ? (
              <Link to="/login" className='bg-blue-600 text-white font-semibold hover:bg-blue-500 duration-300 px-4 py-2 rounded'>LOGIN</Link>
            ) : (
              <button onClick={handleLogout} className='bg-red-600 text-white font-semibold hover:bg-red-500 duration-300 px-4 py-2 rounded'>LOGOUT</button>
            )}
          </div>
        </div>
        {/* Mobile Navbar */}
        {show && (
          <div className='md:hidden'>
            <ul className='flex flex-col h-screen items-center justify-center space-y-3 md:hidden text-xl'>
              <Link to="/" onClick={() => setShow(!show)}>HOME</Link>
              <Link to="/blogs" onClick={() => setShow(!show)}>BLOGS</Link>
              <Link to="/creators" onClick={() => setShow(!show)}>CREATORS</Link>
              <Link to="/about" onClick={() => setShow(!show)}>ABOUT</Link>
              <Link to="/contact" onClick={() => setShow(!show)}>CONTACT</Link>
            </ul>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar;

