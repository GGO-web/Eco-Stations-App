import React from 'react';

import { NavLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton, Menu, MenuItem } from '@mui/material';

import { useAppSelector } from '../../hooks/redux';

import { useActions } from '../../hooks/actions';

export function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { role, isAuth } = useAppSelector((store) => store.auth);

  const { logOut } = useActions();

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

          {role === 'Service' && (
          <Typography variant="h6" component="div">
            <NavLink className="text-xl font-bold" to="/services">Services</NavLink>
          </Typography>
          )}

          {!isAuth ? (
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" data-testid="AccountCircleIcon"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z" /></svg>
            </IconButton>
          ) : (
            <IconButton
              size="large"
              aria-label="logout button"
              onClick={logOut}
              color="inherit"
            >
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
              >
                <path
                  fill="currentColor"
                  d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 0 1-112.7 75.9A352.8 352.8 0 0 1 512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 0 1-112.7-75.9 353.28 353.28 0 0 1-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 0 0 0-12.6z"
                />
              </svg>
            </IconButton>
          )}
        </div>

        {!isAuth && (
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
        )}
      </Toolbar>
    </AppBar>
  );
}
