import React,{useEffect, useState} from 'react';
import { Grid, TextField, Button, Box ,MenuItem, Modal} from '@mui/material';

import { BrowserRouter, Route, Routes,useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';


function CarPage() {
    const navigate= useNavigate();

    const {car_id}=useParams();


    const fetchCarDetails = async (carId) => {
      const url = `http://localhost:5000/api/seller/cars/info/${carId}`;
    
      try {
        const response = await fetch(url);
        const data = await response.json();
    
        if (response.ok) {
          console.log('Car details fetched successfully:', data);
          return data;
        } else {
          throw new Error(data.message || 'Failed to fetch car details');
        }
      } catch (error) {
        console.error('Error fetching car details:', error.message);
        throw error;
      }
    };

    const [car, setCar]= useState(null)
    

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [openModal, setOpenModal] = useState(false);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState(null);

    const [openPdfModal, setOpenPdfModal] = useState(false);

const handleOpenPdfModal = () => setOpenPdfModal(true);
const handleClosePdfModal = () => setOpenPdfModal(false);


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

    useEffect(() => {
      fetchCarDetails(car_id).then(setCar).catch(console.log("Error"));
    }, [car_id]);


    if (!car) {
      return <div>Loading...</div>;
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

    const generatePdfDocument = async (car) => {
      const doc = new jsPDF();
      doc.text(car.title, 10, 10);
      doc.text(`Price: $${car.price}`, 10, 20);
      doc.text(car.description, 10, 30);
    
      // Convert image URL to canvas and then to PNG data URL
      if (car.image_url) {
        try {
          const dataUrl = await toPng(document.getElementById('carImage'));
          doc.addImage(dataUrl, 'PNG', 10, 40, 180, 160);
        } catch (error) {
          console.error('Failed to load image', error);
        }
      }
    
      // Save the created PDF
      doc.save('car-details.pdf');
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

    const postCarPurchaseRequest = async (carId) => {
      const url = `http://localhost:5000/api/buyer/cars/${carId}/request`;
    
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Include authorization token if needed:
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          //body: JSON.stringify(buyerData)
        });
    
        const data = await response.json();
    
        if (response.ok) {
          console.log('Car purchase request submitted successfully:', data);
          return data;
        } else {
          throw new Error(data.message || 'Failed to submit car purchase request');
        }
      } catch (error) {
        console.error('Error submitting car purchase request:', error.message);
        throw error;  // Rethrow the error for further handling if necessary
      }
    };
    


    const handleBuyCar = async (carId) => {
    
      try {
        const result = await postCarPurchaseRequest(carId);
        console.log('Purchase successful:', result);
        // Handle further actions like redirecting or showing a success message
      } catch (error) {
        console.error('Purchase failed:', error);
        //Handle errors, e.g., by showing an error message to the user
      }
    };
    
    const handlePaymentOptionSelect = async (option) => {
      setSelectedPaymentOption(option);

      handleBuyCar(car_id);
    
      // Generate PDF
      await generatePdfDocument(car);
    
      // Open modal to show PDF
      handleOpenPdfModal();
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
    <img src={car.image_url} alt={car.title} style={{ maxWidth: '80%', maxHeight: '100%', objectFit: 'cover', borderRadius: '20px', opacity: 1 }} />
  </Box>

  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${car.image_url})`,
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
    <h2>{car.title}</h2>
    <p>{car.description}</p>
    <p>Price: {car.price}</p>
    <p>Seller: {car.seller_id.name}</p>
    <p>Model: {car.model_no}</p>
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

    <Modal open={openPdfModal} onClose={handleClosePdfModal}>
  <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
    <h3>Car Purchase Agreement</h3>
    <iframe src="car-details.pdf" width="100%" height="400px"></iframe>
    <Button variant="contained" onClick={() => {
      const link = document.createElement('a');
      link.href = 'car-details.pdf';
      link.download = 'car-details.pdf';
      link.dispatchEvent(new MouseEvent('click'));
    }}>Download PDF</Button>
  </Box>
</Modal>

  </Box>
</Grid>




      </Grid>
    </Box>
  );
}

export default CarPage;
