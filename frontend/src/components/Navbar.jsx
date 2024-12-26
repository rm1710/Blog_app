import  {React, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { IoCloseSharp } from 'react-icons/io5';


function Navbar() {
  const {user,blogs}= useAuth();
  const [show, setShow] = useState(false);
  console.log(blogs);
  return (
      <>
        <nav  className='shadow-lg px-4 py-3'>
          <div className='flex items-center justify-between container mx-auto'>
            <div className='font-semibold text-xl'>True
              <span className='text-red-600'>Blogs</span>
            </div>
            {/* Desktop */}
            <div className='mx-6 '>
              <ul className='hidden md:flex space-x-6'>
                <Link to="/"className='hover:text-blue-500'>HOME
                </Link>
                <Link to="/blogs"className='hover:text-blue-500'>BLOGS</Link>
                <Link to="/creators"className='hover:text-blue-500'>CREATORS
                </Link>
                <Link to="/about"className='hover:text-blue-500'>ABOUT</Link>
                <Link to="/contact"className='hover:text-blue-500'>CONTACT
                </Link>
              </ul>
              <div className='md:hidden' onClick={()=>setShow(!show)}>{show?<IoCloseSharp size={24}/>:<AiOutlineMenu size={24}/>}</div>
            </div>
            <div className="hidden md:flex space-x-2">
              <Link to="/dashboard" className='bg-red-600 text-white font-semibold hover:bg-red-500 duration-300 px-4 py-2 rounded'>DASHBOARD</Link>
              <Link to="/Login" className='bg-blue-600 text-white font-semibold hover:bg-blue-500 duration-300 px-4 py-2 rounded'>LOGIN
              </Link>
            </div>
          </div>
          {/* Mobile Navbar */}
          {show && (
            <div className='md:hidden'>
              <ul className='flex flex-col h-screen  items-center justify-center space-y-3 md:hidden text-xl'>
                <Link to="/" onClick={()=>setShow(!show)} smooth='true' duration={500} offset={-70} activeClass="active"  className='hover:text-blue-500'>HOME
                </Link>
                <Link to="/blogs" onClick={()=>setShow(!show)} smooth='true' duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>BLOGS</Link>
                <Link to="/creators" onClick={()=>setShow(!show)} smooth='true' duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>CREATORS
                </Link>
                <Link to="/about" onClick={()=>setShow(!show)} smooth='true' duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>ABOUT</Link>
                <Link to="/contact" onClick={()=>setShow(!show)} smooth='true' duration={500} offset={-70} activeClass="active" className='hover:text-blue-500'>CONTACT
                </Link>
              </ul>
            </div>
          ) }
        </nav>
      </>
  )
}

export default Navbar