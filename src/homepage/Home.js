import React, {  useContext } from 'react'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import './Home.css';
import logo from './image.png';
import Drawer from '@mui/material/Drawer';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import {Box, Button, Container} from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';
import ShopTwoTwoToneIcon from '@mui/icons-material/ShopTwoTwoTone';
import ShoppingCartCheckoutTwoToneIcon from '@mui/icons-material/ShoppingCartCheckoutTwoTone';
import LoyaltyTwoToneIcon from '@mui/icons-material/LoyaltyTwoTone';
import TimelineTwoToneIcon from '@mui/icons-material/TimelineTwoTone';
import AddItem from '../inventorypage/AddItem';
import Dashboard from '../dashboard/Dashboard';
import Purchase from '../purchase/Purchase';
import Sale from '../sales/Sale';
import {context} from '../ContextAPI';
import Report from '../Report/Report';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navi=useNavigate();
  const {dash,invn,sale,purc,toggleChange,report }=useContext(context);
  const [nav, setNav] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setNav(newOpen);
  };
  const gotologin=()=>{
    navi("/");
  }
  const DrawerList = (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
      <List sx={{marginLeft:3,display:"flex",alignItems:"center"}}>
      <img class="log" src={logo} alt='ALt' width={25} />
      <p className='head'>INVENTORY</p>
      <IconButton sx={{ marginLeft:2 }} onClick={toggleDrawer(false)}><ArrowBackIosTwoToneIcon/></IconButton>
      </List>
      <Divider />
      <List>
        {['Dashboard','Inventory','Sales', 'Purchases'].map((text,index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={toggleChange(index+1)}>
              <ListItemIcon>
                {index===0 ?<SpeedTwoToneIcon/>:""}
                {index===1 ?<ShoppingCartCheckoutTwoToneIcon/>:""}
                {index===2 ?<LoyaltyTwoToneIcon/>:""}
                {index===3 ?<ShopTwoTwoToneIcon/>:""}
              </ListItemIcon>
              <ListItemText primary={text}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Report'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={toggleChange(5)}>
              <ListItemIcon>
                {index === 0 ?<TimelineTwoToneIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
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
      {dash && <Dashboard/> }
      {invn && <AddItem/> }
      {sale && <Sale/>}
      {purc && <Purchase/> }
      {report && <Report/> }
      <Drawer open={nav} onClose={toggleDrawer(false)}>
          {DrawerList}
      </Drawer>
    </div>
  )
}

export default Home