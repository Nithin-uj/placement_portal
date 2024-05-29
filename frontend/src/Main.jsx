import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Studentdashboard from './Components/Studentdashboard';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="bg-danger" onClick={toggleDrawer(false)}>
      <List>
          <ListItem disablePadding>
            <ListItemButton><ListItemText primary={"text"} /></ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={"text"} />
            </ListItemButton>
          </ListItem>
      </List>
    </Box>
  );
  
  const user = { usn: "4NI21IS068", email: "2021is_shamanthkumarhv_b@nie.ac.in" }

  return (
    <div>
      {/* {window.innerWidth < 768 ?
      <div><Button onClick={toggleDrawer(true)}>Open drawer</Button> 
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer></div> : <div>{DrawerList}</div>} */}
      <Studentdashboard user={user}/>
    </div>
  );
}
