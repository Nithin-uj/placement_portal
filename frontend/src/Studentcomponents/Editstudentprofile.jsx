import React, { useEffect, useState } from 'react'
import { TextField,Button } from '@mui/material'
import Editstudentdetails from './Editstudentdetails'
import axios from 'axios'
import { address } from '../Address'
import {Alert} from '@mui/material'
import Customalert from './Customalert'

function Editstudentprofile({usn,handleLogout}) {
    const [password,setPassword] = useState({
        oldpassword : "",
        newpassword : "",
        cpassword : ""
    })
    const [error,setError] = useState({
        oldpassword : "",
        cpassword : ""
    })
    const [alert,setAlert] = useState({
        show:false,
        message:""
    });
    const [resumealert,setResumealert] = useState(false);
    const [controls,setControls] = useState(null);
    const handelpasschange = (e)=>{
        const {name,value} = e.target;
        setPassword({...password,[name]:value});
        if(name === "newpassword"){
        setPassword({...password,[name]:value,cpassword:""});
        setError({...error,cpassword:""});
        }
        if(name === "cpassword"){
            if(value !== password.newpassword){
                setError({...error,cpassword:"Password not matching"})
            }
            else{
                setError({...error,cpassword:""})
            }
        }
    }
    const handelupdatepassword = async (e)=>{
        e.preventDefault();
        if(!!!error.cpassword){
            try{
                const response = await axios.post(address+'/updatestudentpassword',{usn:usn,op:password.oldpassword,np:password.cpassword})
                if(response.status === 200){
                    setAlert({
                        show:true,
                        message : "Password changed"
                    })
                    setPassword({
                        oldpassword : "",
                        newpassword : "",
                        cpassword : ""
                    })
                    // window.alert("Password changed");
                    setTimeout(()=>{
                        setAlert({
                            show:false,
                            message : ""
                        })
                        handleLogout();
                    },2000)
                }
            }
            catch(error){
                console.log(error)
            }
        }
    }
    const [resume,setResume] = useState(-1);
    const handelresumechange = async (e)=>{
        e.preventDefault();
        try{
            const response = await axios.post(address+"/updateresumelink",{usn:usn,resume:resume});
            if(response.status === 200){
                setResumealert(true)
                setTimeout(()=>{
                    setResumealert(false);
                },3000)
            }
        }
        catch(error){
            console.log("Failed to update resume link");
        }
    }

    useEffect(()=>{
        const getresumeandcontrol = async ()=>{
            try{
                const response = await axios.post(address+"/getresumelink",{usn:usn});
                const response2 = await axios.post(address+"/geteditcontrols");
                if(response.status === 200){
                    setResume(response.data[0].resume);
                }
                if(response2.status === 200){
                    setControls(response2.data[0]);
                    // console.log(response2.data[0]);
                }
            }
            catch(error){
                console.log("Failed to get resume link");
            }
        }
        getresumeandcontrol();
    },[])

    if(resume === -1){
        return <>Loading</>;
    }

  return (
    <>
    {resume === "" || resume === null ? <Customalert message={"Please update resume link"} severity={"warning"}/> : <></>}
    <div className='d-block d-sm-flex container-fluid justify-content-center'>
        <div className='col col-12 col-sm-6 col-lg-4'>    
            <div className="card m-1 p-0 shadow">
                    <div className="card-header"><b className='d-flex justify-content-center align-items-center'>Change password</b></div>
                    <form className="card-body" onSubmit={handelupdatepassword}>
                    {alert.show && <Alert className='my-1'>{alert.message}</Alert>}
                    {<Alert className="mb-3 p-0" severity='none' color='warning'><b>Note : </b>Changing Password results in logout</Alert>}
                    <TextField fullWidth label="Current password" name="oldpassword" required className='mb-3' type='password' value={password.oldpassword} onChange={handelpasschange}/>
                    <TextField fullWidth label="New password" name="newpassword" required className='mb-3' type='password' value={password.newpassword} onChange={handelpasschange}/>
                    <TextField fullWidth label="Confirm new password" name="cpassword" required className='mb-3' type='password' value={password.cpassword} onChange={handelpasschange} error={!!error.cpassword} helperText={error.cpassword}/>
                    <div className='d-flex justify-content-end'><Button color='warning' variant='contained' type='submit'>Change password</Button></div>
                    </form>
            </div>
            {resume !== -1 && 
                <div className="card m-1 p-0 shadow">
                        <div className="card-header"><b className='d-flex justify-content-center align-items-center'>Change resume link</b></div>
                        <form className="card-body" onSubmit={handelresumechange}>
                            { resumealert && <Alert className='mb-2'> Resume link updated</Alert>}
                            <TextField fullWidth label="Resume link" name='resume' value={resume} onChange={(e)=>{setResume(e.target.value)}}/>
                            <div className='d-flex justify-content-end mt-1'><Button variant='contained' type='submit' color="warning">Update</Button></div>
                        </form>
                </div>}
        </div>
        {controls.value === 1 && 
            <div className='col col-12 col-sm-6 col-lg-4'> 
                <Editstudentdetails usn={usn}/>
            </div>
        }
    </div>

    {/* <div className='container-fluid d-flex justify-content-center p-2'>
        <div className="col col-12 col-sm-6 col-md-6 col-lg-4">
            <div className="row p-0">
                <Editstudentdetails usn={usn}/>
            </div>
        </div>
    </div> */}
    </>
  )
}

export default Editstudentprofile