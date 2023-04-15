import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import UserContext from './context/UserContext.jsx';

//user: testing
//password: testing1

const App = () => {
  const [user, setUser] = useState({
    id: 18,
    username: 'testing',
    first_name: 'test',
    last_name: 'test',
  });
  console.log(user);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          {/* <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} /> */}
          <Route path='/' element={<HomePage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
