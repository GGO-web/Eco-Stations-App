import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Card, CardActions, CardContent, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

interface State {
   amount: string;
   password: string;
   weight: string;
   weightRange: string;
   showPassword: boolean;
}

export const LoginPage: React.FC = () => {

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

   return (
      <div>
         <Card sx={{ minWidth: 400, minHeight: 360 }}>
            <CardContent>
               <Box sx={{ display: 'flex', ml: 1.5 }}>
                  <Typography sx={{ fontSize: 30, }} color="text.secondary" gutterBottom>
                     Login
                  </Typography>
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
               <Button sx={{ marginLeft: 2 }} variant="outlined">Sign in</Button>
            </CardActions>
         </Card>
      </div >
   )
}