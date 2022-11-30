/* eslint-disable */
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Popover, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React, { useState } from 'react';

interface State {
   amount: string;
   password: string;
   weight: string;
   weightRange: string;
   showPassword: boolean;
}

export function Auth() {
   const [values, setValues] = React.useState<State>({
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
   });

   const handleChange =
      (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
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

   const [role, setRole] = useState('');

   const handleChangeRole = (event: SelectChangeEvent) => {
      setRole(event.target.value as string);
   };

   return (
      <div>
         <Card sx={{ width: 480, height: 480, mt: 10, ml: '33%' }}>
            <CardContent>
               <Typography sx={{ fontSize: 30, ml: 2 }} color="text.secondary" gutterBottom>
                  Create a new account
               </Typography>
               <Box sx={{ display: 'flex' }}>
                  <TextField
                     sx={{ m: 1, width: '50ch' }}
                     helperText="Please enter your name"
                     id="demo-helper-text-aligned"
                     label="Name"
                  />
               </Box>
               <Box sx={{ display: 'flex' }}>
                  <TextField
                     sx={{ m: 1, width: '50ch' }}
                     helperText="Please enter your e-mail"
                     id="demo-helper-text-aligned"
                     label="e-mail"
                  />
               </Box>
               <Box sx={{ minWidth: 100, textAlign: 'start', marginLeft: 1 }}>
                  <FormControl sx={{ minWidth: 100 }}>
                     <InputLabel id="demo-simple-select-label">Role</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Role"
                        onChange={handleChangeRole}
                     >
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="Service">Service</MenuItem>
                     </Select>
                  </FormControl>
               </Box>
               <Box sx={{ display: 'flex' }}>
                  <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
                     <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                     <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                           <InputAdornment position="end">
                              <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={handleClickShowPassword}
                                 onMouseDown={handleMouseDownPassword}
                                 edge="end"
                              >
                                 {values.showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                           </InputAdornment>
                        }
                        label="Password"
                     />
                  </FormControl>
               </Box>
            </CardContent>
            <CardActions>
               <Button sx={{ marginLeft: 2 }} variant="outlined">Sign up</Button>
            </CardActions>
         </Card>
      </div >
   )
}