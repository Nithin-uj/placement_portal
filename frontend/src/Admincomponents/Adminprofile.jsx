import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import { address } from '../Address';

function Adminprofile({user,handleLogout}) {
    // console.log(user);
    const [admindata,setAdmindata] = useState();
    const [errors,setErrors] = useState({
      email:"",
      name:"",
      phno : "",
      cpassword : ""
    });
    const [passwords,setPasswords] = useState({
      oldpassword : "",
      password : "",
      cpassword : ""
    })
    const [alert,setAlert] = useState({
      show : false,
      type : "",
      message : "",
    });

    useEffect(()=>{
        const removeadmin = async ()=>{
          try {
            const response = await axios.post(address+'/admingetedit',{"email" : `${user.adminemail}`});
            setAdmindata(response.data[0]);
            // console.log(response.data[0]);
          } catch (error) {
            console.log(error);
          }
        }
        removeadmin()
      },[user.adminemail])

      if(!!!admindata) return <Box sx={{ display: 'flex',height:"100%" }} className="align-items-center justify-content-center">
      <CircularProgress className='m-5'/>
      </Box>;

      const handelchange = (e)=>{
        setAdmindata({...admindata,[e.target.name]:e.target.value});
        if(e.target.name === 'email'){
          const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if(!pattern.test(e.target.value)){
          setErrors({...errors,[e.target.name]:"Invalid Email"});
          }
          else{
          setErrors({...errors,[e.target.name]:""});
          }
        }
        if(e.target.name === "phno"){
          const phpattern = /^[0-9]{10}$/
          if(!phpattern.test(e.target.value)){
            setErrors({...errors,[e.target.name]:"Invalid Phone no."});
          }
          else{
          setErrors({...errors,[e.target.name]:""});
          }
        }
        if(e.target.name === "name"){
          if(e.target.value.length<=0){
            setErrors({...errors,[e.target.name]:"Required"});
          }
          else{
            setErrors({...errors,[e.target.name]:""});
          }
        }
      }

      const handelpasschange = (e)=>{
        setPasswords({...passwords,[e.target.name]:e.target.value});
        // console.log(e.target.value);
        if(e.target.name === "password"){
          if(e.target.value !== passwords.cpassword && passwords.cpassword!==""){
            setErrors({...errors,cpassword:"Password not matching"})
          }
          else{
            setErrors({...errors,cpassword:""})
          }
        }
        if(e.target.name === "cpassword"){
          if(e.target.value !== passwords.password){
            setErrors({...errors,[e.target.name]:"Password not matching"})
          }
          else{
            setErrors({...errors,[e.target.name]:""})
          }
        }
      }

  const handelupdateemail = async () =>{
    if(!!!errors.email){
      // if(user.adminemail === admindata.email){console.log("same same")}
      if(user.adminemail === admindata.email){
        window.alert("Can't update same E-mail");
      }
      else{
        if(window.confirm("Confirm Changing E-mail")){
          try {
            const response = await axios.post(address+'/adminemailedit',{oldemail:`${user.adminemail}`,email:`${admindata.email}`});
            if(response.data.affectedRows > 0){
              // window.alert("Log out...")
              handleLogout();
            }
          } catch (error) {
            // console.log(error.response.data);
            console.log(error);
          }
        }
      }
    }
  }

  const handelupdate = async () =>{
    if(!!!errors.phno && !!!errors.name){
        // console.log(admindata.email);
        // console.log(user.adminemail);
        // console.log(admindata.phno);
        try {
          const response = await axios.post(address+'/adminprofileedit',{email :`${user.adminemail}`,name : `${admindata.name}`,phno : `${admindata.phno}`});
          if(response.data.affectedRows > 0){
            setAlert({
              show : true,
              type : "success",
              message : "Successfully updated",
            })
            setTimeout(()=>{
              setAlert({
                show : false,
                type : "",
                message : "",
              })
            },3000)
          }
        } catch (error) {
          // console.log(error);
          setAlert({
            show : true,
            type : "error",
            message : "Unable to updated",
          })
          setTimeout(()=>{
            setAlert({
              show : false,
              type : "",
              message : "",
            })
          },3000)
        }
    }
  }
  const handelupdatepassword = async (e) =>{
    e.preventDefault();
    if(!!!errors.cpassword){
      try {
        const response = await axios.post(address+'/adminpasswordedit',{email:`${user.adminemail}`,oldpassword:`${passwords.oldpassword}`,cpassword:`${passwords.cpassword}`});
        window.alert(response.data);
        handleLogout();
      } catch (error) {
        window.alert(error.response.data);
        // console.log(error);
      }
    }
  }

  return (
    <div>
      <div className='container-fluid'>
        <div className='row d-flex justify-content-center'>
          <div className="col-12 col-sm-8 col-md-10 col-lg-8 d-md-flex">
            <div className="card m-2">
                <div className="card-header"><b className='d-flex justify-content-center align-items-center'>Profile</b></div>
                <div className="card-body">
                {<Alert className="mb-3 p-0" severity='none' color='warning'><b>Note : </b>Changing E-mail results in logout</Alert>}
                <TextField label="E-mail" name="email" className="mb-3" required fullWidth value={admindata.email} onChange={handelchange} variant="outlined" error={!!errors.email} helperText={errors.email}/>
                <div className='d-flex justify-content-end'><Button color='warning' variant='contained' onClick={()=>{handelupdateemail()}}>Update Email</Button></div>
                <hr/>
                {alert.show && <Alert severity={alert.type} className='mb-2'>{alert.message}</Alert>}
                <TextField label="Name" name="name" className="mb-3" required fullWidth value={admindata.name} onChange={handelchange} variant="outlined" error={!!errors.name} helperText={errors.name} />
                <TextField label="Phone no." name="phno" className="mb-3" required fullWidth value={admindata.phno} onChange={handelchange} variant="outlined" error={!!errors.phno} helperText={errors.phno}/>
                <div className='d-flex justify-content-end'><Button color='warning' variant='contained' onClick={()=>{handelupdate()}}>Update</Button></div>
                </div>
            </div>
            <div className="card m-2">
                <div className="card-header"><b className='d-flex justify-content-center align-items-center'>Change password</b></div>
                <form className="card-body" onSubmit={handelupdatepassword}>
                {<Alert className="mb-3 p-0" severity='none' color='warning'><b>Note : </b>Changing Password results in logout</Alert>}
                <TextField fullWidth label="Current password" name="oldpassword" required className='mb-3' type='password' value={passwords.oldpassword} onChange={handelpasschange}/>
                <TextField fullWidth label="New password" name="password" required className='mb-3' type='password' value={passwords.password} onChange={handelpasschange}/>
                <TextField fullWidth label="Confirm new password" name="cpassword" required className='mb-3' type='password' value={passwords.cpassword} onChange={handelpasschange} error={!!errors.cpassword} helperText={errors.cpassword}/>
                <div className='d-flex justify-content-end'><Button color='warning' variant='contained' type='submit'>Change password</Button></div>
                </form>
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Adminprofile