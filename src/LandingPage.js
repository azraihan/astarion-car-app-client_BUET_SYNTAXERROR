import React,{useState} from 'react';
import { Grid, TextField, Button, Box } from '@mui/material';

import { BrowserRouter, Route, Routes,useNavigate } from 'react-router-dom';
import axios from 'axios';


function LandingPage() {
    const navigate= useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };
  
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


  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <img src="green_city_concept.jpg" alt="Green City" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', zIndex: -1 }} />
      <Grid container style={{ height: '100%' }}>
        <Grid item xs={6} /> 
        <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <img src="ecosync_logo_transparent.png" alt="EcoSync Logo" style={{ width: '50%', height: 'auto', marginBottom: '20px' }} />
            <TextField
              label="Username"
              variant="filled"
              style={{ marginBottom: 20, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
              onChange={handleUsernameChange}
            />
            <TextField
              label="Password"
              type="password" 
              variant="filled"
              style={{ marginBottom: 20, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
              onChange={handlePasswordChange}
            />
            <Button variant="contained" color="primary" onClick={handleLoginClick} sx={{
          backgroundColor: '#9dc799', // Button background color
          '&:hover': {
            backgroundColor: '#85b080', // Button hover background color
          },
        }}>
          <div style={{color:'black',fontWeight:'bold'}}>Login</div>
        </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LandingPage;
