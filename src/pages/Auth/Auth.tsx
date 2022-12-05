import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';

import jwt_decode from 'jwt-decode';

import { toast } from 'react-toastify';

import { useUserRegisterMutation } from '../../redux/services/auth';

import { useActions } from '../../hooks/actions';
import { useLocalStorage } from '../../hooks/localStorage';

import { IAuth } from '../../models/auth.model';
import { AUTH_CREDENTIALS } from '../../constants';

export function Auth() {
  const [values, setValues] = React.useState<IAuth>({
    password: '',
    showPassword: false,
    username: '',
    email: '',
  });

  const [userRole, setUserRole] = useState('');

  const [createUser] = useUserRegisterMutation();

  const { setCredentials } = useActions();
  const [credentialsStore, setCredentialsStore] = useLocalStorage(AUTH_CREDENTIALS, {});

  const navigate = useNavigate();

  const handleChange = (prop: keyof IAuth) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChangeRole = (event: SelectChangeEvent) => {
    setUserRole(event.target.value as string);
  };

  const handleAuth = async () => {
    if (values.password === ''
      || values.username === ''
      || values.email === ''
      || userRole === '') {
      toast.error('Please fill all the fields 😅', {
        toastId: 'error-msg',
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });

      return;
    }

    const { jwtToken } = await createUser({
      username: values.username,
      password: values.password,
      email: values.email,
      role: userRole,
    }).unwrap();

    const { role, sub }: { role: string, sub: string } = jwt_decode(jwtToken as string);

    const credentials = {
      role,
      username: sub,
      token: jwtToken as string,
    };

    setCredentials(credentials);
    setCredentialsStore(credentials);

    toast.success('You have been Registered 😎', {
      toastId: 'error-msg',
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
    });

    navigate('/');
  };

  return (
    <div className="grid place-items-center fixed w-full h-screen bg-light">
      <Card sx={{
        width: 480,
        paddingBottom: '20px',
      }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography sx={{ fontSize: 30 }} color="text.secondary">
            Create a new account
          </Typography>

          <Box sx={{ display: 'flex' }}>
            <TextField
              sx={{ width: '50ch' }}
              helperText="Please enter your name"
              id="demo-helper-text-aligned"
              label="Name"
              value={values.username}
              onChange={handleChange('username')}
            />
          </Box>

          <Box sx={{ display: 'flex' }}>
            <TextField
              sx={{ width: '50ch' }}
              type="email"
              helperText="Please enter your e-mail"
              id="demo-helper-text-aligned"
              label="Email"
              value={values.email}
              onChange={handleChange('email')}
            />
          </Box>

          <Box sx={{ minWidth: 200, textAlign: 'start' }}>
            <FormControl sx={{ minWidth: 100 }}>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userRole}
                label="Role"
                onChange={handleChangeRole}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Service">Service Provider</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ width: '50ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>

              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword
                        ? <svg width="24" height="24" className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VisibilityOffIcon"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78 3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" /></svg>
                        : <svg width="24" height="24" className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VisibilityIcon"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>}
                    </IconButton>
                  </InputAdornment>
                )}
                label="Password"
              />
            </FormControl>
          </Box>
        </CardContent>

        <CardActions>
          <Button sx={{ marginLeft: 1 }} variant="outlined" onClick={handleAuth}>Sign up</Button>
        </CardActions>
      </Card>
    </div>

  );
}
