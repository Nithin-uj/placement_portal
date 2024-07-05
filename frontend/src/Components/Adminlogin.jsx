import React, { useState } from 'react'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
// import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import companies from './companies.png'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import bgimage from "./campus.png"
import adminlogo from "./adminlogo.png"
import axios from 'axios';
import {Link,useNavigate } from 'react-router-dom';
import { address } from '../Address';

function Adminlogin() {

  const mainstyle = {
    backgroundImage: `url(${bgimage})`,
    backgroundSize: 'cover',
  }
  const [ltype, setLtype] = useState('1');
  const [logindata,setLogindata] = useState({
    email : "",
    password : ""
  })
  const [errors,setErrors] = useState({
    email : "",
    password : "",
  })
  const navigate = useNavigate();
  const handelinput = (e)=>{
    setErrors({email : "",password : "",});
    setLogindata({...logindata,[e.target.name]:e.target.value});
    if(e.target.name === "email"){
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(!pattern.test(e.target.value)){
      setErrors({...errors,[e.target.name]:"Invalid Email"});
      }
      else{
      setErrors({...errors,[e.target.name]:""});
      }
    }
  }
  const handelsubmit = async (e) => {
    e.preventDefault();
    // console.log(ltype);
    if(!!errors.email){
      return null;
    }
    if(ltype==='1'){
      // console.log(logindata);
    try {
      const response = await axios.post(address+'/adminlogin', logindata, { withCredentials: true });
      // alert(response.data.message);
      if(response.data.message === "Login successful"){
      navigate('/admin');
      }
    } catch (error) {
      // console.log(error.response.data);

      if(error.response.data === "Email not found"){
        setErrors({...errors, email : error.response.data})
      }
      if(error.response.data === "Incorrect password"){
        setErrors({...errors, password : error.response.data})
      }
      // console.error(error);
      // alert('Login failed');
    }
    }
    else if(ltype==='2'){
      // console.log(logindata);
      try {
        const response = await axios.post(address+'/companylogin', logindata, { withCredentials: true });
        // alert(response.data.message);
        if(response.data.message === "Login successful"){
        navigate('/company')
        }
      } catch (error) {
        // console.log(error.response.data);
        if(error.response.data === "Email not found"){
          setErrors({...errors, email : error.response.data})
        }
        if(error.response.data === "Incorrect password"){
          setErrors({...errors, password : error.response.data})
        }
        // console.error(error);
        // alert('Login failed');
      }
    }
  }
  return (
    <div>
      <Header />
      <Navbar />
      <div className='container-fluid' style={mainstyle}>
        <div className='row d-felse
    else{
      setLtype(1);
    }lex justify-content-center p-2'>
          <div className='col-12 col-sm-10 col-md-8 col-lg-6'>
            <div className='card'>
              <b className='card-header d-flex justify-content-center'>Admin Login</b>
              <div className='card-body p-0'>
                <div className='row'>
                  <div className="col d-none d-sm-flex ms-4 align-items-center justify-content-center">
                    <img src={companies} width="100%" alt='conpanies'/>
                  </div>
                  <div className="col d-flex justify-content-center">
                    <form style={{ width: "max-content" }} onSubmit={handelsubmit}>
                      <div className='d-flex justify-content-center mt-2'><img src={adminlogo} width={"30px"} alt='Admin'/></div>
                      <div className='d-flex justify-content-center mt-2'>Enter Login Details</div>
                      <div className='d-flex justify-content-center mt-2'>
                        <FormControl className='w-50 p-0'>
                          {/* <InputLabel id="ltype-select">Brannch</InputLabel> */}
                          <Select
                            labelId="ltype-select"
                            value={ltype}
                            name="ltype"
                            onChange={(e) => { setLtype(e.target.value);setErrors({email : "",password : "",}); }}
                            // label="Brannch"
                            required
                          >
                            <MenuItem value={"1"}>Admin</MenuItem>
                            {/* <MenuItem value={"2"}>Company</MenuItem> */}
                          </Select>
                        </FormControl>
                      </div>
                      <div className='d-flex justify-content-center'>
                        <TextField className="m-2" 
                        label="Email" name='email' 
                        onChange={handelinput} 
                        required
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth 
                        />
                      </div>
                      <div className='d-flex justify-content-center'><div>
                        <TextField className="m-2 mb-0" 
                        label="Password" 
                        name="password" 
                        onChange={handelinput} 
                        error={!!errors.password}
                        helperText={errors.password}
                        required
                        type='password' />
                        {/* <a href="http://www.google.com" disabled className='d-block' style={{ paddingLeft: "10px" }}>Forgotted Password?</a> */}
                        <div><Link to="/admin-login" className='ps-2'>Forgotten password?</Link></div>
                      </div>
        
                      </div>
                      <div className="d-flex justify-content-end me-2 mt-2 mb-2"><Button variant='contained' type='submit'>Login</Button></div>
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

export default Adminlogin;


// import React from 'react'

// function Adminlogin() {
//   return (
//     <div>Adminlogin</div>
//   )
// }

// export default Adminlogin