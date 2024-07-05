import React, { useState } from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import companies from './companies.png'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import bgimage from "./campus.png"
import logo from "./image.png"
// import Alert from "@mui/material/Alert";
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'
import {address} from '../Address'

function Studentlogin() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    usn: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    usn: "",
    password: "",
  })
  const mainstyle = {
    backgroundImage: `url(${bgimage})`,
    backgroundSize: 'cover',
  }
  const handelinput = (e) => {
    const { name, value } = e.target;
    setErrors({
      usn: "",
      password: ""
    })
    if(name==="usn"){
      setValues({ ...values, [name]: value.toUpperCase() });
      const pattern = /^[4][N][I][2][1-4][A-Z]{2}[0-9]{3}$/;
      if(!pattern.test(value)){
      setErrors({...errors,usn:"Invalid USN"});
      }
      else{
      setErrors({...errors,usn:""});
      }
    }
    if(name==="password"){
    setValues({ ...values, [name]: value });
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    if(!!errors.usn){
      return null;
    }
    try {
      const response = await axios.post(address+'/login', values, { withCredentials: true });
      if(response.data.message === "Login successful"){
      navigate('/student');
      }
    } catch (error) {
      // console.log(error.response.data);

      if(error.response.data === "USN Not Registered"){
        setErrors({...errors, usn : error.response.data})
      }
      if(error.response.data === "Incorrect password"){
        setErrors({...errors, password : error.response.data})
      }
      // console.error(error);
      // alert('Login failed');
    }
  };
  return (
    <div>
      <Header />
      <Navbar />
      <div className='container-fluid' style={mainstyle}>
        <div className='row d-flex justify-content-center p-2'>
          <div className='col-12 col-sm-10 col-md-8 col-lg-6'>
            <div className='card'>
              <b className='card-header d-flex justify-content-center'>Student Login</b>
              <div className='card-body p-0'>
                <div className='row'>
                  <div className="col d-none d-sm-block">
                    <img src={companies} width="100%" alt="companies" />
                  </div>
                  <div className="col d-flex justify-content-center">
                    <form style={{ width: "max-content" }} onSubmit={handleLogin}>
                      <div className='d-flex justify-content-center mt-1'><img src={logo} width={"60px"} alt="logo" /></div>
                      <div className='d-flex justify-content-center mt-2'>Enter Login Details</div>
                      <div className='d-flex justify-content-center'><TextField value={values.usn} name="usn" onChange={handelinput}  required error={!!errors.usn}
                        helperText={errors.usn}
                        className="m-2" label="USN" fullWidth /></div>
                      <div className='d-flex justify-content-center'><div><TextField className="m-2 mb-0" label="Password" name="password" type='password' required error={!!errors.password}
                        helperText={errors.password} value={values.password} onChange={handelinput} />
                        {/* <div><a href="https://google.com" disabled className='' style={{ paddingLeft: "10px" }}>Forgotted Password?</a></div> */}
                        <div><Link to="/student-login" className='ps-2'>Forgotten password?</Link></div>
                        </div></div>
                      <div className="d-flex justify-content-end me-2 mb-2"><Button variant='contained' type='submit'>Login</Button></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Studentlogin