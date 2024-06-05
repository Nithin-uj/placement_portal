import React,{useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
// import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';
import { TextField } from '@mui/material';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

export default function Adminlist({user}){

    const [adminlist,setAdminlist] = useState([]);
    const [addadmin,setAddadmin] = useState(false);
    const [editadmin,setEditadmin] = useState("");
    const [alert,setAlert] = useState({
      show : false,
      type : "",
      message : "",
    });
    const [newadmin,setNewadmin] = useState({
      name : "",
      email : "",
      type : "",
      phno : "",
      cpassword : "",
    });
    const [errors,setErrors] = useState({
      email : "",
      phno : "",
      password : "",
    });
    const [password,setPassword] = useState("");
  
    useEffect(()=>{
      const adminlistfunction = async () => {
      try {
        const response = await axios.post('http://localhost:5000/adminlist', { withCredentials: true });
        setAdminlist(response.data);
      } catch (error) {
        // console.log(error.response.data);
        console.log(error);
      }
      }
      adminlistfunction();
    },[]);
  
    const handelchange = (e)=>{
      setNewadmin({...newadmin,[e.target.name]:e.target.value});
      setErrors({...errors,[e.target.name]:""});
      // console.log(e.target.value);
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
      if(e.target.name === "cpassword"){
        if(e.target.value !== password){
          setErrors({...errors,[e.target.name]:"Password not matching"});
        }
        else{
        setErrors({...errors,[e.target.name]:""});
        }
      }
    }
    const handelpasschange = (e)=>{
      setPassword(e.target.value);
      setNewadmin({...newadmin,cpassword:""});
    }
    const handelsubmit = async (e)=>{
      e.preventDefault();
      if(!!!errors.email && !!!errors.phno && !!!errors.cpassword){
        try {
          const response = await axios.post('http://localhost:5000/adminregister',newadmin);
          // console.log(response.data);
          setAlert({
            show : true,
            type : "success",
            message : response.data
          });
          adminlist.push({"name":newadmin.name,"email":newadmin.email,"type":newadmin.type,"phno":newadmin.phno});
          setNewadmin({
            name : "",
            email : "",
            type : "",
            phno : "",
            cpassword : "",
          });
          setPassword("");
          setTimeout(()=>{
            setAlert({
              show : false,
              type : "",
              message : ""
            });
            setAddadmin(false);
          },3000)
        } catch (error) {
          if(error.response.data.code === "ER_DUP_ENTRY"){
            setAlert({
              show : true,
              type : "error",
              message : "E-mail already exist"
            });
            setTimeout(()=>{
              setAlert({
                show : false,
                type : "",
                message : ""
              });
            },5000);
          }
          else{
            // console.log(error.response.data)
            setAlert({
              show : true,
              type : "error",
              message : "Failed to add admin please try again"
            });
            setTimeout(()=>{
              setAlert({
                show : false,
                type : "",
                message : ""
              });
            },5000);
          }
        }
      }
      else{
        console.log("Errors in form")
      }
    }
  
    const handelremove = (e)=>{
      const rconfirm = window.confirm("Remove the admin?");
      if(rconfirm){
        // console.log(e.target.value);
        const removeadmin = async ()=>{
          try {
            const response = await axios.post('http://localhost:5000/removeadmin',{email : e.target.value});
            setAdminlist(adminlist.filter(admin => admin.email !== e.target.value));
            window.alert(response.data);
          } catch (error) {
            // console.log(error.response.data);
            console.log(error);
            // window.alert(error.response.data);
            // window.alert("Failed to remove");
          }
        }
        removeadmin()
      }
    }
  
  if (adminlist.length < 1) return <Box sx={{ display: 'flex',height:"100%" }} className="align-items-center justify-content-center">
  <CircularProgress className='m-5'/>
  </Box>;
  
  if(addadmin) return (<div>
      <div className='container-fluid'>
        {alert.show && <Alert className="m-2" severity={alert.type}>{alert.message}</Alert>}
        <div className='row d-flex justify-content-center'>
          <div className="col-12 col-sm-8 col-md-6 col-lg-6">
            <div className="card m-2">
              <div className="card-header"><b className='d-flex justify-content-center align-items-center'>Add admin</b></div>
              <form className="card-body" onSubmit={handelsubmit}>
              <TextField label="Name" name="name" className="mb-3" required fullWidth value={newadmin.name} onChange={handelchange} variant="outlined" />
              <TextField label="E-mail" name="email" className="mb-3" required fullWidth value={newadmin.email} onChange={handelchange} variant="outlined" error={!!errors.email} helperText={errors.email}/>
              <TextField label="Phone no." name="phno" className="mb-3" required fullWidth value={newadmin.phno} onChange={handelchange} variant="outlined" error={!!errors.phno} helperText={errors.phno}/>
              <FormControl fullWidth className='mb-3'>
                  <InputLabel id="branch-select">Type</InputLabel>
                  <Select
                    labelId="branch-select" 
                    value={newadmin.type}
                    name="type"
                    onChange={handelchange}
                    label="Type"
                    required
                  >
                    <MenuItem value={"admin"}>Admin (Full access)</MenuItem>
                    <MenuItem value={"tpo"}>TPO (Full access)</MenuItem>
                    <MenuItem value={"pc"}>Placement Coordinator (Limited access)</MenuItem>
                  </Select>
                </FormControl>
              <TextField label="Password" name="password" required fullWidth type="password" className="mb-3" value={password} onChange={handelpasschange} variant="outlined" />
              <TextField label="Confirm password" name="cpassword" required fullWidth type="password" className="mb-3" value={newadmin.cpassword} onChange={handelchange} variant="outlined" error={!!errors.cpassword} helperText={errors.cpassword}/>
              <div className='d-flex justify-content-between'>
              <Button onClick={()=>{setAddadmin(false)}} color='error' variant="outlined">back</Button>
              <Button type='submit' variant="contained">Submit</Button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>);
  
    const Editadmin = ({adminemail})=>{
      // console.log(adminemail);
      const [admindata,setAdmindata] = useState([]);
      const [editadminpass,setEditadminpass] = useState("");
      const [editerrors,setEditerrors] = useState({
        email : "",
        phno : "",
        cpassword : ""
      });
      useEffect(()=>{
        const removeadmin = async ()=>{
          try {
            const response = await axios.post('http://localhost:5000/admingetedit',{"email" : `${adminemail}`});
            // window.alert(response.data);
            // console.log(response.data[0]);
            setAdmindata(response.data[0]);
          } catch (error) {
            // console.log(error);
            setEditadmin("");
          }
        }
        removeadmin()
      },[adminemail])
      if(adminemail===""){
        window.alert("Unable to edit");
        setEditadmin("");
        return <></>;
      }
      const handeladminedit = (e)=>{
        setAdmindata({...admindata,[e.target.name]:e.target.value});
        if(e.target.name === 'email'){
          const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if(!pattern.test(e.target.value)){
          setEditerrors({...editerrors,[e.target.name]:"Invalid Email"});
          }
          else{
          setEditerrors({...editerrors,[e.target.name]:""});
          }
        }
        if(e.target.name === "phno"){
          const phpattern = /^[0-9]{10}$/
          if(!phpattern.test(e.target.value)){
            setEditerrors({...editerrors,[e.target.name]:"Invalid Phone no."});
          }
          else{
          setEditerrors({...editerrors,[e.target.name]:""});
          }
        }
        if(e.target.name === "cpassword"){
          if(e.target.value !== editadminpass){
            setEditerrors({...editerrors,[e.target.name]:"Password not matching"});
          }
          else{
          setEditerrors({...editerrors,[e.target.name]:""});
          }
        }
      }
      const handeleditadminpass = (e)=>{
        setEditadminpass(e.target.value);
        setAdmindata({...admindata,cpassword:""});
        // console.log(e.target.value);
      }
      const handeleditsubmit = async (e)=>{
        e.preventDefault();
        if(!!!editerrors.email && !!!editerrors.phno && !!!editerrors.cpassword){
          try {
            const response = await axios.post('http://localhost:5000/adminedit',{admindata,adminemail});
            window.alert(response.data);
            // window.alert("Admin details updated");
            setEditadmin("");
            // console.log(adminlist);
            const user = adminlist.find(u => u.email === adminemail);
            if (user) {
              user.email = admindata.email;
              user.name = admindata.name;
              user.type = admindata.type;
              user.phno = admindata.phno;
            }
            // console.log(adminlist);
        }
        catch(error){
            window.alert("Failed to update");
            // console.log(error);
        }
      }
      }
      return (<div>
        <div className='container-fluid'>
          <div className='row d-flex justify-content-center'>
            <div className="col-12 col-sm-8 col-md-6 col-lg-6">
              <div className="card m-2">
                <div className="card-header"><b className='d-flex justify-content-center align-items-center'>Edit admin</b></div>
                <form className="card-body" onSubmit={handeleditsubmit}>
                <TextField label="Name" name="name" className="mb-3" required fullWidth value={admindata.name} onChange={handeladminedit} InputLabelProps={{shrink: true}} variant="outlined" />
                <TextField label="E-mail" name="email" className="mb-3"  required fullWidth value={admindata.email} onChange={handeladminedit} InputLabelProps={{shrink: true}} variant="outlined" error={!!editerrors.email} helperText={editerrors.email}/>
                <TextField label="Phone no." name="phno" className="mb-3" required fullWidth value={admindata.phno} onChange={handeladminedit} InputLabelProps={{shrink: true}} variant="outlined" error={!!editerrors.phno} helperText={editerrors.phno}/>
                <FormControl fullWidth className='mb-3'>
                    <InputLabel id="branch-select">Type</InputLabel>
                    <Select
                      labelId="branch-select" 
                      value={`${admindata.type}`}
                      name="type"
                      onChange={handeladminedit}
                      label="Type"
                      required
                    >
                      <MenuItem value={"admin"}>Admin (Full access)</MenuItem>
                      <MenuItem value={"tpo"}>TPO (Full access)</MenuItem>
                      <MenuItem value={"pc"}>Placement Coordinator (Limited access)</MenuItem>
                    </Select>
                  </FormControl>
                <TextField label="Password" name="password" required fullWidth type="password" className="mb-3" value={editadminpass} onChange={handeleditadminpass} variant="outlined" />
                <TextField label="Confirm password" name="cpassword" required fullWidth type="password" className="mb-3" value={admindata.cpassword} onChange={handeladminedit} variant="outlined" error={!!editerrors.cpassword} helperText={editerrors.cpassword}/>
                <div className='d-flex justify-content-between'>
                <Button onClick={()=>{setEditadmin("")}} color='error' variant="outlined">back</Button>
                <Button type='submit' variant="contained" color='warning'>Update</Button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>)
    }
  
    if(!!editadmin) return(
      <Editadmin adminemail={editadmin}/>
    )
  
    return(
      <div className='m-3'>
        <div className='d-flex justify-content-between mb-2'>
          <b>Admin List</b>
       {user.admintype !== 'pc' &&  <Button variant='contained' onClick={()=>{setAddadmin(true)}}>Add + </Button> }</div> 
      <TableContainer sx={{ maxHeight: 400, maxWidth: '100%', overflow: 'auto' }} component={Paper}>
      <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell ><b>Name</b></TableCell>
            <TableCell align="center"><b>E-mail</b></TableCell>
            <TableCell align="center"><b>Type</b></TableCell>
            <TableCell align="center"><b>Phone no.</b></TableCell>
            {user.admintype !== "pc" && <TableCell align="center"><b>Operation</b></TableCell> }
          </TableRow>
        </TableHead>
        <TableBody>
              {adminlist.map((row) => (
                <TableRow
                  key={row.email}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.phno}</TableCell>
                 {user.admintype !== "pc" &&  <TableCell align="right">
                    {/* Add any operation buttons or elements here */}
                    <Button size='small' variant='contained' className='me-2' onClick={(e)=>{setEditadmin(row.email);}} disabled={user.adminemail === row.email ? true : false}>Edit</Button>
                    <Button size='small' variant='outlined' color="error" value={row.email} onClick={(e)=>{handelremove(e)}} disabled={user.adminemail === row.email ? true : false}>Remove</Button>
                  </TableCell> }
                </TableRow>
              ))}
            </TableBody>
      </Table>
    </TableContainer>
    </div>
    )
  }