import React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import axios from 'axios';

export default function Admindashboard({user,handleLogout}) {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [option,setOption] = useState(1);

  useEffect(()=>{
    if(window.innerWidth >= 768){ setOpen(true) }
  },[])

  const Optionrender = ()=>{
    switch(option){
      case 1:
        return <div>Home <Adminhome/></div>;
      case 2:
        return <div>option2</div>
      case 11:
        return <Adminlist/>
      default:
        return <div>Default</div>
    }
  }

  const DrawerList = (
    <Box sx={{ width: 200 }} role="presentation" onClick={window.innerWidth<768 ? toggleDrawer(false) : toggleDrawer(true)}>
      <b className='m-2 d-flex justify-content-center'>{user.admintype.toUpperCase()}</b>
      <div className='m-1 d-flex justify-content-center'><div>{user.adminname}</div></div>
      {/* <div className='m-1 mb-2 d-flex justify-content-center'><Button color='error' className='m-0 p-2' variant='contained' onClick={handleLogout}>Logout</Button></div> */}
      <Divider />
      <hr className='m-0 border-dark'/>
      <List disablePadding>
          <ListItem disablePadding className={`${option === 1 && 'text-light bg-primary'}`}>
            <ListItemButton onClick={()=>{setOption(1)}}>Home</ListItemButton>
          </ListItem>
      </List>
      <List disablePadding>
          <ListItem disablePadding className={`${option === 2 && 'text-light bg-primary'}`}>
            <ListItemButton onClick={()=>{setOption(2)}}>2</ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List disablePadding>
          <ListItem disablePadding className={`${option === 11 && 'text-light bg-primary'}`}>
            <ListItemButton onClick={()=>{setOption(11)}}>
              Admin's list
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
        <div className='d-flex justify-content-between bg-dark'><Button onClick={open ? toggleDrawer(false) : toggleDrawer(true)} className='p-0 m-1 text-light' ><MenuIcon className='text-light' fontSize='large'/><div className='d-flex align-items-center h-100'>Menu</div></Button>
        <Button color='error' onClick={handleLogout}>Logout</Button></div>
        <div className='d-flex'>
        <div className='border-end'>
          {window.innerWidth < 768 && <div>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer></div>}
          {window.innerWidth >= 768 && <div>
            {open &&  <div>{DrawerList}</div>}</div>}
        </div>
        <div style={{width:"100%"}}>{Optionrender()}</div>
        </div>
    </div>
  )
}

// export default Admindashboard

const Adminhome = () =>{
  return (
    <div>
      hii<br/>
      hii<br/>
      hii<br/>
      hii<br/>
      hii<br/>
      hii<br/>
      hii<br/>
      hii<br/>
      hii<br/>
      hii<br/>
    </div>
  )
}

const Adminlist = ()=>{

  const [adminlist,setAdminlist] = useState([]);

  useEffect(()=>{
    const adminlistfunction = async () => {
    try {
      const response = await axios.post('http://localhost:5000/adminlist', { withCredentials: true });
      // alert(response.data.message);
      // console.log(response.data.length);
      setAdminlist(response.data);
    } catch (error) {
      // console.log(error.response.data);
      console.log(error);
    }
  }
  adminlistfunction();
  // console.log(!!adminlist);
}
)

if (adminlist.length < 1) return <Box sx={{ display: 'flex',height:"100%" }} className="align-items-center justify-content-center">
<CircularProgress className='m-5'/>
</Box>;

  return(
    <div className='m-3'>    
    <TableContainer sx={{ maxHeight: 400, maxWidth: '100%', overflow: 'auto' }} component={Paper}>
    <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell >Name</TableCell>
          <TableCell align="center">E-mail</TableCell>
          <TableCell align="center">Type</TableCell>
          <TableCell align="center">Phone no.</TableCell>
          <TableCell align="center">Operation</TableCell>
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
                <TableCell align="center">
                  {/* Add any operation buttons or elements here */}
                  <Button size='small' variant='contained'>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
    </Table>
  </TableContainer>
  </div>
  )
}