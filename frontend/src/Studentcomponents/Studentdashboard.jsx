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
import Companies from './Companies';
import Studentprofile from './Studentprofile';
import Editstudentprofile from './Editstudentprofile';
// import Viewfeedback from './Viewfeedback';
import Studenthome from './Studenthome';

function Studentdashboard({user,handleLogout}) {
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
        return <Studenthome/>;
      case 2:
        return <Companies usn={user.usn}/>;
      // case 3:
      //   return <Viewfeedback/>;
      case 10:
        return <Studentprofile usn={user.usn}/>;
      case 11:
        return <Editstudentprofile usn={user.usn} handleLogout={handleLogout}/>;
      default:
        return <div>Default</div>
    }
  }

  const DrawerList = (
    <Box sx={{ width: 200 }} role="presentation" onClick={window.innerWidth<768 ? toggleDrawer(false) : toggleDrawer(true)}>
      <b className='m-2 d-flex justify-content-center'>{"STUDENT"}</b>
      <div className='m-1 d-flex justify-content-center'><b>USN : </b> &nbsp;{user.usn.toUpperCase()}</div>
      <div className='m-1 d-flex justify-content-center'><b>Name&nbsp;: </b><span>&nbsp;{user.fullname}</span></div>
      {/* <div className='m-1 d-flex justify-content-center'><div>{user.email}</div></div> */}
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
            <ListItemButton onClick={()=>{setOption(2)}}>Company / Job</ListItemButton>
          </ListItem>
      </List>
      {/* <List disablePadding>
          <ListItem disablePadding className={`${option === 3 && 'text-light bg-primary'}`}>
            <ListItemButton onClick={()=>{setOption(3)}}>View feedbacks</ListItemButton>
          </ListItem>
      </List> */}
      <Divider />
      <List disablePadding>
          <ListItem disablePadding className={`${option === 10 && 'text-light bg-primary'}`}>
            <ListItemButton onClick={()=>{setOption(10)}}>
              Profile
            </ListItemButton>
          </ListItem>
      </List>
      <List disablePadding>
          <ListItem disablePadding className={`${option === 11 && 'text-light bg-primary'}`}>
            <ListItemButton onClick={()=>{setOption(11)}}>
              Edit profile
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );

  return (
    // <div className={window.innerWidth < 768 ? 'd-block' : 'd-flex'}>
    <div>
        <div className='d-flex justify-content-between bg-dark'><Button onClick={open ? toggleDrawer(false) : toggleDrawer(true)} className='p-0 m-1 text-light' ><MenuIcon className='text-light' fontSize='large'/><div className='d-flex align-items-center h-100'>Menu</div></Button>
        <Button color='error' onClick={handleLogout}>Logout</Button></div>
        <div className='d-flex'>
        <div className="border-end">
          {window.innerWidth < 768 && <div>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer></div>}
          {window.innerWidth >= 768 && <div>
            {open &&  <div>{DrawerList}</div>}</div>}
        </div>
        <div style={{width:"100%",minHeight:"50vh"}}>{Optionrender()}</div>
        </div>
    </div>
  )
}

export default Studentdashboard
