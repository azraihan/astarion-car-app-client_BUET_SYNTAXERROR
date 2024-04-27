import React,{useState, useEffect} from 'react';
import LandingPage from './LandingPage';
import BusinessPage from './BusinessPage';
import UserPage from './UserPage';

import { BrowserRouter, Route, Routes,useNavigate } from 'react-router-dom';




function App() {
  const[isAuthenticated, setIsAuthenticated]=useState(false);
  const authenticate=(authenticated)=>{
      setIsAuthenticated(authenticated);
  }

  const[username, setUsername]=useState('');

  const getUserName=(username)=>{
    setUsername(username);
  }

  return (
    <BrowserRouter>
        <Routes>
             <Route path='/' element={<LandingPage authenticate={authenticate} getUserName={getUserName}/>}/>
             <Route path="/businesspage/:username/:id" element={<BusinessPage/>}/>
             <Route path="/userpage/:username/:id" element={<UserPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
