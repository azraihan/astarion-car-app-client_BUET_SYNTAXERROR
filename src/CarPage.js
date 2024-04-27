import React,{useState} from 'react';
import { Grid, TextField, Button, Box ,MenuItem, Modal} from '@mui/material';

import { BrowserRouter, Route, Routes,useNavigate } from 'react-router-dom';
import axios from 'axios';


function CarPage() {
    //const navigate= useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [openModal, setOpenModal] = useState(false);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);


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

    const handleOpenModal = () => {
      setOpenModal(true);
    };
    
    const handleCloseModal = () => {
      setOpenModal(false);
    };
    
    const handlePaymentOptionSelect = (option) => {
      setSelectedPaymentOption(option);
    };
    


  return (
    <Box sx={{ width: '100vw', height: '100vh', position: 'relative', backgroundColor:'rgba(181, 179, 179, 0.5)'}}>


      <Grid container style={{ height: '100%' }}>
        {/* <Grid item xs={7} >
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <img src="dummy_car.jpg" alt="Dummy Car" style={{ maxWidth: '80%', maxHeight: '100%', borderRadius: '20px' }} />
        </Box>
        
        
        </Grid>   */}


<Grid item xs={7} style={{ position: 'relative' }}>
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2, 
    }}
  >
    <img src="dummy_car.jpg" alt="Dummy Car" style={{ maxWidth: '80%', maxHeight: '100%', objectFit: 'cover', borderRadius: '20px', opacity: 1 }} />
  </Box>

  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(dummy_car.jpg)`,
      backgroundColor:'rgb(0,0,0)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: 0.3, 
      zIndex: 1,
    }}
  ></Box>
</Grid>




        <Grid item xs={5} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255, 0.8)' }}>
  <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '80%', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
    <h2>Car Name</h2>
    <p>Description of the car goes here.</p>
    {/* Additional details for the car */}
    <Button variant="contained" onClick={handleOpenModal}>Buy</Button>
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{marginBottom:'40px'}}>Select Payment Option</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap:'1rem' }}>
          <Button variant="contained" onClick={() => handlePaymentOptionSelect('Online Payment')}>Online Payment</Button>
          <Button variant="contained" onClick={() => handlePaymentOptionSelect('Cash on Delivery')}>Cash on Delivery</Button>
        </div>
        
      </Box>
    </Modal>
  </Box>
</Grid>




      </Grid>
    </Box>
  );
}

export default CarPage;
