import React,{useState} from 'react';
import { Grid, TextField, Button, Box ,MenuItem} from '@mui/material';

import { BrowserRouter, Route, Routes,useNavigate } from 'react-router-dom';
import axios from 'axios';


function LandingPage() {
    //const navigate= useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [isLoggingIn, setIsLogginIn]= useState(true);
    const [isRegistering, setIsRegistering]= useState(false);
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleRoleChange = (event)=>{
        setRole(event.target.value);
    }
  
    const handleLoginClick = async () => {
    //   const requestBody = {
    //     username: username,
    //     password: password,
    //   };

    //   try {
    //     navigate(`/systemAdmin`)
    //     const response = await axios.post('http://localhost:5000/auth/login', requestBody);
    //     console.log('Login successful', response.data);
    //     localStorage.setItem('token', response.data.token);
    //     navigate(`/systemAdmin`)
    //   } catch (error) {
    //     console.error('Login failed', error);
    //   }
    };

    const handleLoginRegisterClick=async()=>{
        setIsLogginIn(!isLoggingIn);
        setIsRegistering(!isRegistering);
    }


  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative' }}>


      <img src="outdoor_car_sale_event.jpg" alt="Car sale" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: -1 }} />
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={6} /> 
        <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255, 0.8)' }}>

          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

          <Box style={{ position: 'absolute', top: 0, left: '60%', padding: '16px', transform: 'translateX(-50%)' }}> {/* Center the button horizontally */}
                <Button variant="contained" color="primary" onClick={handleLoginRegisterClick} sx={{
                        backgroundColor: '#cfcaca', // Button background color
                        '&:hover': {
                        backgroundColor: '#b5b0b0', // Button hover background color
                        },
                        borderRadius: '30px', // This will give you a rounded button
                        color: 'black',
                        fontWeight: 'bold'
        }}>
    {isLoggingIn?"Register As New User":"Already have an account?"}
  </Button>
</Box>




            <img src="astarion's_garage_logo_transparent.png" alt="Astarion's Garage Logo" style={{ width: '50%', height: 'auto', marginBottom: '20px', opacity:'0.9', borderRadius:'20px' }} />
            
            
            {isLoggingIn && (
            <>
            <div style={{borderRadius:'20px', overflow:'hidden',marginBottom: 20}}>
            <TextField
              label="Username"
              variant="filled"
              style={{backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
              onChange={handleUsernameChange}
            />
            </div>
            
            <div style={{borderRadius:'20px', overflow:'hidden',marginBottom: 20}}>
            <TextField
              label="Password"
              type="password" 
              variant="filled"
              style={{  backgroundColor: 'rgba(181, 179, 179, 0.5)'}}
              onChange={handlePasswordChange}
            />
            </div>
            
            <Button variant="contained" color="primary" onClick={handleLoginClick} sx={{
                        backgroundColor: '#cfcaca', // Button background color
                        '&:hover': {
                        backgroundColor: '#b5b0b0', // Button hover background color
                        },
                        borderRadius: '30px', // This will give you a rounded button
                        color: 'black',
                        fontWeight: 'bold'
        }}>
    Login
  </Button>
  </>
  )}

  {isRegistering && (
            <>
            <div style={{borderRadius:'20px', overflow:'hidden',marginBottom: 20}}>
            <TextField
              label="Username"
              variant="filled"
              style={{backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
              onChange={handleUsernameChange}
            />
            </div>

            <div style={{borderRadius:'20px', overflow:'hidden',marginBottom: 20}}>
            <TextField
              label="Email"
              variant="filled"
              style={{backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
              onChange={handleUsernameChange}
            />
            </div>
            
            <div style={{borderRadius:'20px', overflow:'hidden',marginBottom: 20}}>
            <TextField
              label="Password"
              type="password" 
              variant="filled"
              style={{  backgroundColor: 'rgba(181, 179, 179, 0.5)'}}
              onChange={handlePasswordChange}
            />
            </div>

            <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: 20, width:'27%'}}>
  <TextField
    select
    label="Role"
    value={role}
    variant="filled"
    style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '20px', width: '100%' }}
    onChange={handleRoleChange}
    SelectProps={{
      MenuProps: {
        style: { width: '200px' }, // Adjust width as needed
      },
    }}
  >
    <MenuItem value="Business">Business</MenuItem>
    <MenuItem value="Customer">Customer</MenuItem>
  </TextField>
</div>
            
            <Button variant="contained" color="primary" onClick={handleLoginClick} sx={{
                        backgroundColor: '#cfcaca', // Button background color
                        '&:hover': {
                        backgroundColor: '#b5b0b0', // Button hover background color
                        },
                        borderRadius: '30px', // This will give you a rounded button
                        color: 'black',
                        fontWeight: 'bold'
        }}>
    Register
  </Button>
  </>

  )}

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LandingPage;
