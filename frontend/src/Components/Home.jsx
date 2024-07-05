import React, { useEffect } from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import Mcontent from './Maincontent'
import axios from 'axios'
import { address } from '../Address'

function Home() {
  useEffect(()=>{
    const getserver = async ()=>{
      try {
        const response = await axios.post(address+"/sample");
        if(response.status===200){
          console.log(response.data);
        }
      } catch (error) {
        console.log("Backend not connected")
      }
    }
    getserver();
  },[])
  return (
    <div>
        <Header/>
        <Navbar/>
        <Mcontent/>
        <Footer/>
    </div>
  )
}

export default Home