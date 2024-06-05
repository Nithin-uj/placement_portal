import React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Adminprofile from './Adminprofile';
import Adminlist from './Adminlist';
import Studetntlist from './Studetntlist';

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
        return <div>Home</div>;
      case 2:
        return <Studetntlist/>;
      case 3:
        return <div>Company</div>;
      case 11:
        return <Adminlist user={user}/>;
      case 12:
        return <Adminprofile user={user} handleLogout={handleLogout}/>;
      default:
        return <div>Default</div>;
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
            <ListItemButton onClick={()=>{setOption(2)}}>Student</ListItemButton>
          </ListItem>
      </List>
      <List disablePadding>
          <ListItem disablePadding className={`${option === 3 && 'text-light bg-primary'}`}>
            <ListItemButton onClick={()=>{setOption(3)}}>Company</ListItemButton>
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
      <List disablePadding>
          <ListItem disablePadding className={`${option === 12 && 'text-light bg-primary'}`}>
            <ListItemButton onClick={()=>{setOption(12)}}>
              Profile
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
        <div style={{width:"100%"}} className='overflow-auto'>{Optionrender()}</div>
        </div>
    </div>
  )
}