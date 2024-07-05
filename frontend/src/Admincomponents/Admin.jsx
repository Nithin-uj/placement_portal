import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Admindashboard from './Admindashboard';
import Footer from '../Components/Footer';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { address } from '../Address';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(address+'/isadmin', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        // console.error(error.response);
        navigate('/admin-login');
      }
      // console.log(user);
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(address+'/logout', {}, { withCredentials: true });
      navigate('/admin-login');
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return <Box sx={{ display: 'flex',height:"100vh" }} className="align-items-center justify-content-center">
  <CircularProgress className='m-5'/>
  </Box>;

  return (
    <div style={{height:"100vh"}} className='d-flex flex-column'>
      {/* <h2>Profile</h2>
      <p>Name: {user.adminname}</p>
      <p>Email: {user.adminemail}</p>
      <p>Type: {user.admintype}</p>
      <button onClick={handleLogout}>Logout</button> */}
    <Header/>
    {/* <hr className='m-0' /> */}
    <div className="border-bottom border-dark"></div>
    <div style={{flex: 1}}><Admindashboard user={user} handleLogout={handleLogout}/></div>
    <Footer />
    </div>
  );
}

export default Profile;
