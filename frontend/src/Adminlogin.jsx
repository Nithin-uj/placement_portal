import React from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import companies from './companies.png'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import bgimage from "./campus.png"
import adminlogo from "./adminlogo.png"

function Studentlogin() {

  const mainstyle = {
    backgroundImage: `url(${bgimage})`
  }
  return (
    <div>
    <Header/>
    <Navbar/>
    <div className='container-fluid' style={mainstyle}>
      <div className='row d-flex justify-content-center p-2'>
        <div className='col-12 col-sm-10 col-md-8 col-lg-6'>
          <div className='card'>
            <b className='card-header d-flex justify-content-center'>Admin Login</b>
          <div className='card-body p-0'>
          <div className='row'>
            <div className="col d-none d-sm-block">
              <img src={companies} width="100%"/>
            </div>
            <div className="col d-flex justify-content-center">
              <div style={{width:"max-content"}}>
              <div className='d-flex justify-content-center mt-1'><img src={adminlogo} width={"60px"}/></div>
              <div className='d-flex justify-content-center mt-2'>Enter Login Details</div>
              <div className='d-flex justify-content-center'><TextField className="m-2" label="Email" fullWidth/></div>
              <div className='d-flex justify-content-center'><div><TextField className="m-2 mb-0" label="Password" type='password'/><a href="#" disabled className='d-block' style={{paddingLeft:"10px"}}>Forgotted Password?</a></div></div>
              <div className="d-flex justify-content-end me-2 mb-2"><Button variant='contained'>Login</Button></div>
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>
      </div>
      </div>
    <Footer/>
    </div>
  )
}

export default Studentlogin