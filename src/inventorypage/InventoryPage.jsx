import React, {  useContext } from 'react'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import '../Home.css';
import Drawer from '@mui/material/Drawer';
import {Box, Button, Container} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DrawerList from '../DrawerList/DrawerList';
import AddItem from './AddItem';
function InventoryPage() {
  const navi=useNavigate();
  const [nav, setNav] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setNav(newOpen);
  };
  const gotologin=()=>{
    navi("/");
  }
  return (
    <div>

      <Box className='topBar' sx={{zIndex:1000,p: '2px', display:'flex',justifyContent:"flex-start", alignItems: 'center',borderBottom:'1px solid',borderBottomColor:'dimgrey',height:60,width:'100%' }}>
      <IconButton onClick={toggleDrawer(true)}><MenuIcon/></IconButton>
      <Box component="form"  sx={{ marginLeft:5, display:'flex', alignItems: 'center', width: "80%" }}>
        <p className='head1'>INVENTORY MANAGEMENT SYSTEM</p>
        {/*<InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search items" inputProps={{ 'aria-label': 'search google maps' }}/>
       <IconButton type="button" sx={{ p: '10px' }} aria-label="search"><SearchIcon /></IconButton> */}
      </Box>
      <Container sx={{display:'flex',justifyContent:'flex-end'}}>
      <IconButton ><NotificationsNoneRoundedIcon/></IconButton>
      <IconButton><SettingsIcon/></IconButton>
      <Button onClick={gotologin}>Log out</Button>
      </Container>
      </Box>
      <AddItem/> 
      <Drawer open={nav} onClose={toggleDrawer(false)}>
          <DrawerList toggleDrawer={toggleDrawer}/>
      </Drawer>
    </div>
  )
}

export default InventoryPage