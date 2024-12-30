import React from 'react'
import { useAuth } from '../context/AuthProvider'

function Sidebar(component, setComponent) {
  const { profile, isAuthenticated } = useAuth();
  console.log(profile);
  return (
    <div>
      <div>
        <img src={profile?.photo?.url} alt="" />
        <p>{profile?.name}</p>
      </div>
      <ul>
        <button className="w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 transition duration-300">MY BLOGS</button>
        <button className="w-full px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300">CREATE BLOG</button>
        <button className="w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 transition duration-300">MY PROFILE</button>
        <button className="w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-rend-700 transition duration-300">HOME</button>
        <button className="w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 transition duration-300">LOGOUT</button>
      </ul>
    </div>
  )
}

export default Sidebar