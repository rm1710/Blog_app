import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [education, setEducation] = useState('');
  const [photo, setPhoto] = useState('');
  const [PhotoPreview, setPhotoPreview] = useState('');
  const changePhoteHandler = (e) => {
    console.log(e);
    const file= e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload= () => {
      setPhotoPreview(reader.result);
      setPhoto(file);
    }
  };

  const handleRegister = async(e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('education', education);
    formData.append('photo', photo);
    try{
      const {data} = await axios.post('http://localhost:3000/api/users/register', formData,
      {
        withCredentials: true,
        headers: {'Content-Type': 'multipart/form-data',}}
      );
      console.log(data);
      toast.success(data.message ||'User Registered Successfully');
      setName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setRole('');
      setEducation('');
      setPhoto('');
      setPhotoPreview('');
    }catch(error){
      console.log(error);
      toast.error(error.message || "please fill required fields")
    }
  }
  return (
    <div>
      <div className='flex items-center justify-center bg-gray-200 py-14 bg-gradient-to-r from-blue-100 via-purple-200 to-red-200'>
        <div className='w-full max-w-md bg-white shadow-md rounded-lg p-6'>
          <form onSubmit={handleRegister}>
          <div className='font-bold text-3xl items-center text-center mb-4'>
  True<span className='text-red-600'>Blogs</span>
</div>
            <h1 className="text-xl font-semibold mb-4">Register</h1>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 mb-4 border rounded-md">
              <option value="">Select Role</option>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
            <div className='mb-3'>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
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
                type="tel"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="">Select Your Education</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="BSC.IT">BSC.IT</option>
            </select>
            <div className='flex items-center mb-4'>
              <div className='photo w-20 h-20 mr-4'>
                <img src={PhotoPreview?`${PhotoPreview}`:"phtot"} alt="Photo" />
              </div>
              <input
                type="file"
                onChange={changePhoteHandler}
                className='w-full p-2 border rounded-md'
              />
            </div>
            <p className='text-center mb-3'>
              Already Registered?{"  "} <Link className="text-blue-500">Login Now</Link>
            </p>

            <button type="submit"className='w-full p-2 bg-red-500 hover:bg-red-600 duration-300 rounded-md text-white'>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
