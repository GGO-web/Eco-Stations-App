import React from 'react';

import { NavLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton, Menu, MenuItem } from '@mui/material';

export function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar elevation={0} style={{ position: 'sticky', background: '#8EE4AF', color: '#05386B' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        />

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <NavLink className="text-4xl font-bold" to="/">EcoFinder</NavLink>
        </Typography>

        <div className="flex gap-4 items-center">
          <Typography variant="h6" component="div">
            <NavLink className="text-xl font-bold" to="/detailed">Detailed</NavLink>
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
            <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" data-testid="AccountCircleIcon"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z" /></svg>
          </IconButton>
        </div>

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
            <NavLink to="/Login">
              <MenuItem onClick={handleClose}>Sign in</MenuItem>
            </NavLink>

            <NavLink to="/Auth">
              <MenuItem onClick={handleClose}>Create a new account</MenuItem>
            </NavLink>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}
