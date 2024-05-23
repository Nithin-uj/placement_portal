import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import Mcontent from './Maincontent'

function Home() {
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