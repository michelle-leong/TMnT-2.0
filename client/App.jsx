import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import UserContext from './context/UserContext.jsx';
import BoardPage from './pages/BoardPage.jsx';

const App = () => {
  const refreshUser = JSON.parse(sessionStorage.getItem('user'));
  const [user, setUser] = useState(refreshUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/boards/:id' element={<BoardPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;

//test2; test2
