import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Popover, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface State {
   amount: string;
   password: string;
   weight: string;
   weightRange: string;
   showPassword: boolean;
}

export const Auth: React.FC = () => {

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

   //popup
   const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const open = Boolean(anchorEl);
   const id = open ? 'simple-popover' : undefined;


   return (
      <div>
         <Button aria-describedby={id} variant="contained" onClick={handleClick} >
            sign up
         </Button>
         <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
               vertical: 'bottom',
               horizontal: 'center',
            }}
            transformOrigin={{
               vertical: 'top',
               horizontal: 'center',
            }}
         >
            <Card sx={{ minWidth: 400, minHeight: 480 }}>
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
                           <MenuItem value={'User'}>User</MenuItem>
                           <MenuItem value={'Service'}>Service</MenuItem>
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
               </CardContent >
               <CardActions>
                  <Button sx={{ marginLeft: 2 }} variant="outlined">Sign up</Button>
               </CardActions>
            </Card>
         </Popover>
      </div>
   )
}