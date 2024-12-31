import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthProvider';



function Login() {
  const {isAuthenticated, setIsAuthenticated} = useAuth();

  const navigateTo = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');


  const handleLogin = async(e) =>{
    e.preventDefault();
    if(!email || !password || !role){
      toast.error('Please fill all the fields');
      return; 
    }
    try{
      const {data} = await axios.post('http://localhost:3000/api/users/Login',
      {email, password, role},
      {
        withCredentials: true,
        headers: {'Content-Type': 'multipart/form-data',}}
      );
      console.log(data);
      toast.success(data.message ||'User Logined Successfully');
      setIsAuthenticated(true);
      setEmail('');
      setPassword('');
      setRole('');
      navigateTo('/');
    }catch(error){
      console.log(error);
      toast.error(error.message || "please fill required fields")
    }
  }
  return (
    <div>
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-red-200 via-purple-200 to-blue-100'>
        <div className='w-full max-w-md bg-white shadow-md rounded-lg p-6'>
          <form onSubmit={handleLogin}>
          <div className='font-bold text-3xl items-center text-center mb-4'>
            True<span className='text-red-600'>Blogs</span>
          </div>
            <h1 className="text-xl font-semibold mb-4">Login</h1>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 mb-4 border rounded-md">
              <option value="">Select Role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            <div className='mb-3'>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className='mb-3'>
              <input
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <p className='text-center mb-3'>
              New User?{"  "} <Link to="/register"className="text-blue-500">Register Now</Link>
            </p>

            <button type="submit"className='w-full p-2 bg-red-500 hover:bg-red-600 duration-300 rounded-md text-white'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
