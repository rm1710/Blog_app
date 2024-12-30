import React from 'react'
import { useAuth } from '../context/AuthProvider'
import Sidebar from '../dashboard/Sidebar';
import MyProfile from '../dashboard/MyProfile';
import CreateBlog from '../dashboard/CreateBlog';
import MyBlogs from '../dashboard/MyBlogs';
import UpdateBlog from '../dashboard/UpdateBlog';

function Dashboard() {
  const { profile, isAuthenticated } = useAuth();
  console.log(profile);
  console.log(isAuthenticated);
  return (
    <div>
      <div><Sidebar component={component} setComponent={setComponent} />
        {component === "My Profile" ? (<MyProfile />) : component === "Create Blog" ? (<CreateBlog />) : component === "Update Blog" ? (<UpdateBlog />) : (<MyBlog/>)}
      </div>
    </div>
  )
}

export default Dashboard