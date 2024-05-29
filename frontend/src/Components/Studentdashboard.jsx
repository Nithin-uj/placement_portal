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
        return <div>Home</div>;
      case 2:
        return <div>option2</div>
      default:
        return <div>Default</div>
    }
  }

  const DrawerList = (
    <Box sx={{ width: 200 }} role="presentation" onClick={window.innerWidth<768 ? toggleDrawer(false) : toggleDrawer(true)}>
      {/* <b className='m-2 d-flex justify-content-center'>{user.admintype.toUpperCase()}</b> */}
      <div className='m-1 d-flex justify-content-center'><b>USN : </b><b>{user.usn.toUpperCase()}</b></div>
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
            <ListItemButton onClick={()=>{setOption(2)}}>2</ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List disablePadding>
          <ListItem disablePadding className={`${option === 10 && 'text-light bg-primary'}`}>
            <ListItemButton onClick={()=>{setOption(10)}}>
              Section2
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
        <div>
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

export default Studentdashboard
