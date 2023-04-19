import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import UserContext from './context/UserContext.jsx';
import BoardPage from './pages/BoardPage.jsx';

//user: testing
//password: testing1

const App = () => {
  const [user, setUser] = useState({
    // null
    id: 18,
    username: 'testing',
    first_name: 'test',
    last_name: 'test',
  });
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
