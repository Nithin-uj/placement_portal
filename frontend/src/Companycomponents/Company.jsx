import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Companydashboard from './Companydashboard';
import { address } from '../Address';

export default function Company() {
  const [company, setCompany] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(address+'/iscompany', { withCredentials: true });
        setCompany(response.data);
        // console.log(response);
      } catch (error) {
        console.error(error.response);
        console.error(error);
        navigate('/admin-login');
      }
    };
    fetchCompany();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(address+'/logout', {}, { withCredentials: true });
      navigate('/admin-login');
    } catch (error) {
      console.error("error");
    //   console.error(error);
    }
  };

  if (!company) return <div>Loading...</div>;

  return (
    // <div>
    //   <h2>Profile</h2>
    //   <p>USN: {user.usn}</p>
    //   <p>Email: {user.email}</p>
    //   <button onClick={handleLogout}>Logout</button>
    // </div>
    <div>
      <Header/>
      {/* <Studentdashboard user={user} handleLogout={handleLogout}/> */}
      <Companydashboard company={company} handleLogout={handleLogout}/>
      <Footer/>
    </div>
  );
}
