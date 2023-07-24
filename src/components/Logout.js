import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api-user/logout/', {}, {
        headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
      });
      localStorage.removeItem('token');
      toast.success('Successfully logout!');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
