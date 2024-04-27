import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, IconButton, TextField, Button, Modal} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { BrowserRouter, Route, Routes,useNavigate,useParams } from 'react-router-dom';

const dummyData = [
  { id: 1, image: 'https://via.placeholder.com/150', text: 'Card 1 Text', isFavorite: false },
  { id: 2, image: 'https://via.placeholder.com/150', text: 'Card 2 Text', isFavorite: true },
  { id: 3, image: 'https://via.placeholder.com/150', text: 'Card 3 Text', isFavorite: false },
  { id: 4, image: 'https://via.placeholder.com/150', text: 'Card 4 Text', isFavorite: true },
  { id: 5, image: 'https://via.placeholder.com/150', text: 'Card 5 Text', isFavorite: false },
  { id: 6, image: 'https://via.placeholder.com/150', text: 'Card 1 Text', isFavorite: false },
  { id: 7, image: 'https://via.placeholder.com/150', text: 'Card 2 Text', isFavorite: true },
  { id: 8, image: 'https://via.placeholder.com/150', text: 'Card 3 Text', isFavorite: false },
  { id: 9, image: 'https://via.placeholder.com/150', text: 'Card 4 Text', isFavorite: true },
  { id: 10, image: 'https://via.placeholder.com/150', text: 'Card 5 Text', isFavorite: false },
];

const BusinessPage = () => {
  const navigate= useNavigate();
  
  const { username, id } = useParams();
  console.log(username);

  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');


  const [data, setData]= useState(dummyData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [imageURL, setImageURL] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(-1);
  const [description, setDescription] = useState('');
  const [modelNo, setModelNo] = useState('');

  const [cars, setCars] = useState([]);



  const fetchCars = async (seller_id) => {

    const url = `http://localhost:5000/api/seller/cars/${seller_id}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();  
  
      if (response.ok) {
        if (data.success && data.cars) {
          console.log('Fetched cars successfully:', data.cars);
          return data.cars; 
        } else {
          throw new Error('No cars data found');
        }
      } else {
        throw new Error(data.message || 'Failed to fetch cars');
      }
    } catch (error) {
      console.error('Error fetching cars:', error.message);
      return []; 
    }
  };

  useEffect(() => {
    const loadCars = async () => {
      try {
        const fetchedCars = await fetchCars(id);
        setCars(fetchedCars);
      } catch (error) {
        console.error('Failed to load cars:', error);
      }
    };
    loadCars();
  }, [id]); 
  

  const handleFavoriteClick = (id) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    });
    setData(updatedData);
  };


  const handleConfirmClick = () => {
    setIsModalOpen(true);
    setModalTitle("Confirm Order")
    setModalMessage("Do you want to confirm your order now?")
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageChange=(event)=>{
    setImageURL(event.target.value);
  }

  const handleTitleChange=(event)=>{
    setTitle(event.target.value);
  }

  const handlePriceChange=(event)=>{
    setPrice(Number(event.target.value));
  }

  const handleModelNumberChange=(event)=>{
    setModelNo(event.target.value);
  }

  const handleDescriptionChange=(event)=>{
    setDescription(event.target.value)
  }



  const handleSubmitCarClick = async () => {
    const seller_id = id;  
    const url = `http://localhost:5000/api/seller/cars/${seller_id}`;
    const requestBody = {
      title: title,
      description: description,
      price: price,
      image_url: imageURL,
      model_no: modelNo
    };
  
    try {
      console.log(requestBody);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`  // Assuming you store your token in localStorage
        },
        body: JSON.stringify(requestBody)
      });
  
      const data = await response.json();  // Parsing the JSON body of the response
  
      if (response.ok) {
        setModalMessage('Car submission successful');
        setModalTitle('Success');
        setIsModalOpen(true);  
      } else {
        throw new Error(data.message || 'Failed to submit car details.');
      }
    } catch (error) {
      setModalMessage(error.message || 'Request failed');
      setModalTitle('Error');
      setIsModalOpen(true);
    }
  };

  const handleCarClick = (carId) => {
    console.log(`Car clicked with ID: ${carId}`);
    navigate(`/carPage/${carId}`)
  };
  

  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>


        {/* Available Car List*/}
    

    <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
    <div style={{display:'flex', flexDirection:'column', maxWidth:'70%'}}>
        <div style={{left:0}}><h1>Available Cars</h1></div>
    <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
    <div style={{ overflowX: 'auto', display: 'flex', alignItems: 'center', gap: '10px', padding: '20px', maxWidth:'100%' }}>
      {cars.map((item) => (
        <Card key={item._id} style={{ minWidth: '200px' }}>
          <CardActionArea onClick={() => handleCarClick(item._id)}>
            <CardMedia component="img" height="200" image={item.image_url} alt={`Card ${item.title}`} />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
     
    </div>
    </div>
    

    
    <div style={{borderRadius:'20px', overflow:'hidden',marginBottom: 20, width:'30%', marginTop:'40px'}}>
            <TextField
              label="Name"
              variant="filled"
              style={{backgroundColor: 'rgba(181, 179, 179, 0.5)', width:'100%' }}
              //onChange={handleUsernameChange}
            />
    </div>
    <div style={{borderRadius:'20px', overflow:'hidden',marginBottom: 20, width:'30%'}}>
            <TextField
              label="Price"
              variant="filled"
              style={{backgroundColor: 'rgba(181, 179, 179, 0.5)', width:'100%' }}
              //onChange={handleUsernameChange}
            />
    </div>
            
    </div>
    </div>

    {/*Car Adding Options */}

    <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '30%', border: '1px solid black', marginTop:'150px' }}>
        <div><h3>Add Car</h3></div>
        <TextField
          label="Image URL"
          variant="filled"
          style={{ borderRadius:'20px', overflow:'hidden', width:'80%', backgroundColor: 'rgba(181, 179, 179, 0.5)'}}
          onChange={handleImageChange}
        />
        <TextField
          label="Title"
          variant="filled"
          style={{ borderRadius:'20px', overflow:'hidden', width:'80%', backgroundColor: 'rgba(181, 179, 179, 0.5)'}}
          onChange={handleTitleChange}
        />
        <TextField
          label="Description"
          variant="filled"
          multiline
          rows={4}
          style={{ borderRadius:'20px', overflow:'hidden', width:'80%', backgroundColor: 'rgba(181, 179, 179, 0.5)'}}
          onChange={handleDescriptionChange}
        />
        <TextField
          label="Price"
          variant="filled"
          style={{ borderRadius:'20px', overflow:'hidden', width:'80%', backgroundColor: 'rgba(181, 179, 179, 0.5)'}}
          onChange={handlePriceChange}
        />
        <TextField
          label="Model Number"
          variant="filled"
          style={{ borderRadius:'20px', overflow:'hidden', width:'80%', backgroundColor: 'rgba(181, 179, 179, 0.5)' }}
          onChange={handleModelNumberChange}
        />

        <Button variant='contained' onClick={handleSubmitCarClick}>Submit</Button>
      </div>

      </div>

      {/* Pending Orders */}


    <div style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:'150px'}}>
    <div style={{display:'flex', flexDirection:'column', maxWidth:'70%'}}>
        <div style={{left:0}}><h1>Pending Orders</h1></div>
    <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
    <div style={{ overflowX: 'auto', display: 'flex', alignItems: 'center', gap: '10px', padding: '20px', maxWidth:'100%' }}>
      {data.map((item) => (
        <Card key={item.id} style={{ minWidth: '200px' }}>
          <CardActionArea>
            <CardMedia component="img" height="200" image={item.image} alt={`Card ${item.id}`} />
            <IconButton
              onClick={() => handleFavoriteClick(item.id)}
              style={{ position: 'absolute', top: '10px', right: '10px', color: item.isFavorite ? 'red' : 'grey' }}
              aria-label="add to favorites"
            >
              <FavoriteIcon />
            </IconButton>
            <CardContent>
              <div style={{display:'flex', flexDirection:'column'}}>
              <Typography variant="body2" color="textSecondary" component="p">
                {item.text}
              </Typography>
              <Button variant="contained" style={{marginTop:'20px'}} onClick={handleConfirmClick}>Confirm</Button>
              </div>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
     
    </div>
    </div>


    </div>
    </div>


          {/* Modal */}
          <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h3>{modalTitle}</h3>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb:4 }}>
            {modalMessage}
          </Typography>
          {modalTitle==="Confirm Order" ? (
          <>
          <Button variant="contained" onClick={handleCloseModal}>Confirm Now</Button>
          <Button variant="contained" onClick={handleCloseModal} style={{ marginLeft: '10px' }}>Confirm Later</Button>
          </>
          ):
          (
          <>
            <Button variant="contained" onClick={handleCloseModal}>Close</Button>
          </>
          )}
        </Box>
          
      </Modal>


    </div>
  );
};

export default BusinessPage;
