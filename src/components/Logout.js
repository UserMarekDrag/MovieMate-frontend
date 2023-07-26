import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { checkAuth } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api-user/logout/', {}, {
        headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
      });
      localStorage.removeItem('token');
      checkAuth();
      toast.success('Successfully logout!');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Link className="logout-btn" onClick={handleLogout}>Logout</Link>
  );
}

export default Logout;
