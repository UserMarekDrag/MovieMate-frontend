import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Navbar from './Navbar';
import Footer from './Footer';
import MovieList from './MovieList';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import SearchForm from './SearchForm';
import AboutUs from './AboutUs';
import ResetPassword from './ResetPassword';
import ChangePassword from './ChangePassword';

axios.defaults.withCredentials = true;

function App() {
  const [searchParams, setSearchParams] = useState({});

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <>
      <ToastContainer />
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={ <SearchForm onSearch={handleSearch} /> } />
              <Route path="/movies" element={ <MovieList searchParams={searchParams} /> } />
              <Route path="/login" element={ <Login /> } />
              <Route path="/register" element={ <Register /> } />
              <Route path="/profile" element={ <Profile /> } />
              <Route path="/about" element={ <AboutUs /> } />
              <Route path="/password/reset" element={ <ResetPassword /> } />
              <Route path="/password/change" element={ <ChangePassword /> } />
          </Routes>
          <Footer />
      </Router>
    </>
  );
}

export default App;
