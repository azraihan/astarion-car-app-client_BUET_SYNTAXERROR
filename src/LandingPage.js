import React,{useState, useEffect} from 'react';
import { Grid, TextField, Button, Box ,MenuItem, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';

import { BrowserRouter, Route, Routes,useNavigate } from 'react-router-dom';
import axios from 'axios';


function LandingPage(authenticate, getUserName) {
    const navigate= useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [isLoggingIn, setIsLogginIn]= useState(true);
    const [isRegistering, setIsRegistering]= useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [dialogTitle, setDialogTitle] = useState('');

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function replaceSpacesWithUnderscores(str) {
      return str.replace(/ /g, '_');
  }
  


  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleRoleChange = (event)=>{
        setRole(event.target.value);
    }
  
    const handleLoginClick = async () => {
      const requestBody = {
        name: username,
        password: password,
      };
    
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody),
        });
    
        const data = await response.json();  // Parsing the JSON body of the response

        const role= data.user.role==="seller"?"businesspage":"userpage";

        const id= data.user._id;
    
        console.log(data);
        console.log('Login successful', data);
        console.log(data.success);
        console.log(data.token);
        if (data.success && data.token) {
          localStorage.setItem('token', data.token); // Save the token to localStorage
          console.log("Logged In");
          setIsAuthenticated(true);
          //authenticate(true);

          //getUserName(username);
          navigate(`/${role}/${replaceSpacesWithUnderscores(username)}/${id}`);
        } else {
          setLoginError('Unsuccessful login. Please check your username and/or password.');
          setIsModalOpen(true); // Open modal if login is unsuccessful
          setDialogTitle('Unsuccessful')
        }
      } catch (error) {
        console.error('Login request failed', error);
        setLoginError('Login request failed. Please try again later.');
        setIsModalOpen(true); // Open modal if an error occurs
        setDialogTitle('Error')
      }
    };


    const handleRegisterClick = async () => {
      const requestBody = {
        name: username, // Assuming the username state holds the name
        email: email, // Make sure to have a separate state for email if it's different from the username
        password: password,
        role: role
      };
    
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody),
        });
    
        const data = await response.json(); // Parsing the JSON body of the response
    
        if (response.ok) {
          console.log('Registration successful', data);
          setLoginError("Registration successful");
          setIsModalOpen(true); // Open modal to show the error
          setDialogTitle('Successful')
        } else {
          throw new Error(data.message || 'Unable to register. Please try again later.');
        }
      } catch (error) {
        console.error('Registration request failed', error);
        setLoginError(error.message);
        setIsModalOpen(true); // Open modal to show the error
        setDialogTitle('Error')
      }
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
              style={{backgroundColor: 'rgba(181, 179, 179, 0.5)' }}
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
            <div style={{ display: 'flex', gap: '20px', marginBottom:'20px' }}>
  <div style={{ flex: 1, borderRadius: '20px', overflow: 'hidden' }}>
    <TextField
      label="Username"
      variant="filled"
      style={{ backgroundColor: 'rgba(181, 179, 179, 0.5)' }}
      onChange={handleUsernameChange}
    />
  </div>
  <div style={{ flex: 1, borderRadius: '20px', overflow: 'hidden' }}>
    <TextField
      label="Email"
      variant="filled"
      style={{ backgroundColor: 'rgba(181, 179, 179, 0.5)' }}
      onChange={handleEmailChange}
    />
  </div>
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
    style={{ backgroundColor: 'rgba(181, 179, 179, 0.5)', borderRadius: '20px', width: '100%' }}
    onChange={handleRoleChange}
    SelectProps={{
      MenuProps: {
        style: { width: '200px' }, // Adjust width as needed
      },
    }}
  >
    <MenuItem value="Seller">Business</MenuItem>
    <MenuItem value="Buyer">Customer</MenuItem>
  </TextField>
</div>
            
            <Button variant="contained" color="primary" onClick={handleRegisterClick} sx={{
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

<Dialog
    open={isModalOpen}
    onClose={() => setIsModalOpen(false)}
  >
    <DialogTitle><h2>{dialogTitle}</h2></DialogTitle>
    <DialogContent>
      <p>{loginError}</p>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setIsModalOpen(false)}>Close</Button>
    </DialogActions>
  </Dialog>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LandingPage;
