import React, { useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, IconButton, TextField } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

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

const UserPage = () => {
  const [data, setData] = useState(dummyData);

  const handleFavoriteClick = (id) => {
    const updatedData = data.map(item => {
      if (item.id === id) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    });
    setData(updatedData);
  };

  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>


        {/* Available Car List*/}
    

    <div style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
    <div style={{display:'flex', flexDirection:'column', maxWidth:'70%'}}>
        <div style={{left:0}}><h1>Available Cars</h1></div>
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
              <Typography variant="body2" color="textSecondary" component="p">
                {item.text}
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


    {/* Orders Requested */}

    <div style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:'80px'}}>
    <div style={{display:'flex', flexDirection:'column', maxWidth:'70%'}}>
        <div style={{left:0}}><h1>Orders Requested</h1></div>
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
              <Typography variant="body2" color="textSecondary" component="p">
                {item.text}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
     
    </div>
    </div>
            
    </div>
    </div>


    {/* Orders Received */}

    <div style={{display:'flex', flexDirection:'row', justifyContent:'center', marginTop:'80px'}}>
    <div style={{display:'flex', flexDirection:'column', maxWidth:'70%'}}>
        <div style={{left:0}}><h1>Orders Received</h1></div>
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
              <Typography variant="body2" color="textSecondary" component="p">
                {item.text}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
     
    </div>
    </div>
            
    </div>
    </div>  

    </div>
  );
};

export default UserPage;
