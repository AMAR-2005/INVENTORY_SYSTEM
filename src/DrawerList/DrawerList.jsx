// DrawerList.js
import React from 'react';
import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import SpeedTwoToneIcon from '@mui/icons-material/SpeedTwoTone';
import ShopTwoTwoToneIcon from '@mui/icons-material/ShopTwoTwoTone';
import ShoppingCartCheckoutTwoToneIcon from '@mui/icons-material/ShoppingCartCheckoutTwoTone';
import LoyaltyTwoToneIcon from '@mui/icons-material/LoyaltyTwoTone';
import TimelineTwoToneIcon from '@mui/icons-material/TimelineTwoTone';
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import logo from '../image.png';
import { useNavigate } from 'react-router-dom';

function DrawerList({ toggleDrawer }) {
  const navigate=useNavigate();
  return (
    <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
      <List sx={{ marginLeft: 3, display: "flex", alignItems: "center" }}>
        <img className="log" src={logo} alt="Alt" width={25} />
        <p className="head">INVENTORY</p>
        <IconButton sx={{ marginLeft: 2 }} onClick={toggleDrawer(false)}>
          <ArrowBackIosTwoToneIcon />
        </IconButton>
      </List>
      <Divider />
      <List>
        {['Dashboard', 'Inventory', 'Sales', 'Purchases'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton 
              onClick={() => {
                switch(index) {
                  case 0:
                    navigate('/dashboard');
                    break;
                  case 1:
                    navigate('/inventory');
                    break;
                  case 2:
                    navigate('/sales');
                    break;
                  case 3:
                    navigate('/purchase');
                    break;
                  default:
                    break;
                }
              }}
            >
              <ListItemIcon>
                {index === 0 ? <SpeedTwoToneIcon /> : ""}
                {index === 1 ? <ShoppingCartCheckoutTwoToneIcon /> : ""}
                {index === 2 ? <LoyaltyTwoToneIcon /> : ""}
                {index === 3 ? <ShopTwoTwoToneIcon /> : ""}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Report'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => { 
                navigate('/report'); 
              }}>
              <ListItemIcon>
                {index === 0 ? <TimelineTwoToneIcon /> : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default DrawerList;
