import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

function Notfound() {
    const navigate = useNavigate();
    const handelbtn = ()=>{
        navigate("/")
    }
  return (
    <div>
        <Header/>
        <hr className='m-0 '/>
            <h1 className='text-secondary text-center my-5'>Looks like you are lost !</h1>
            <div className='d-flex justify-content-center my-5'><Button onClick={handelbtn} variant='outlined'>Go to home</Button></div>
        <Footer/>
    </div>
  )
}

export default Notfound