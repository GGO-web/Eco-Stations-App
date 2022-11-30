/* eslint-disable */
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

export default function Header() {

   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <Box sx={{ flexGrow: 1 }}>
         <AppBar >
            <Toolbar>
               <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
               >

               </IconButton>
               <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  <NavLink to='/'> Eco Station</NavLink>
               </Typography>
               <IconButton
                  sx={{}}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
               >
                  <AccountCircle />
               </IconButton>
               <div>
                  <Menu
                     id="menu-appbar"
                     anchorEl={anchorEl}
                     anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     keepMounted
                     transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                     }}
                     open={Boolean(anchorEl)}
                     onClose={handleClose}
                  >
                     <NavLink to='/Login'><MenuItem onClick={handleClose}>Sign in</MenuItem></NavLink>
                     <NavLink to='/Auth'><MenuItem onClick={handleClose}>Create a new account</MenuItem></NavLink>
                  </Menu>
               </div>
            </Toolbar>
         </AppBar>
      </Box >
   );
}