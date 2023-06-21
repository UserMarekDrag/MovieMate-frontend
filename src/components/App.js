import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';
import MovieList from './MovieList';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import SearchForm from './SearchForm';

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={ <><SearchForm /><MovieList /></> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/profile" element={ <Profile /> } />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
