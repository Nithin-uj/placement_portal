import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Studentdashboard from './Studentdashboard';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { address } from '../Address';
import { Box,CircularProgress } from '@mui/material';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(address+'/me', { withCredentials: true });
        // const response = await axios.get(address+'/me', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        // console.error(error.response);
        navigate('/student-login');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(address+'/logout', {}, { withCredentials: true });
      navigate('/student-login');
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return <div><Box sx={{ display: 'flex',height:"100%" }} className="align-items-center justify-content-center">
  <CircularProgress className='m-5'/>
  </Box></div>;

  return (
    // <div>
    //   <h2>Profile</h2>
    //   <p>USN: {user.usn}</p>
    //   <p>Email: {user.email}</p>
    //   <button onClick={handleLogout}>Logout</button>
    // </div>
    <div>
      <Header/>
      <Studentdashboard user={user} handleLogout={handleLogout}/>
      <Footer/>
    </div>
  );
}

export default Profile;
