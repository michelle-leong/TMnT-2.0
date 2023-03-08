import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';


const App = () => {

  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} /> */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
 
export default App;

