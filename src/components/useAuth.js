import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useAuth = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [navigate]);

  const checkAuth = async () => {
    try {
      await axios.get('http://localhost:8000/api-user/user/', {
        headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      localStorage.removeItem('token');
      navigate('/login');
      setIsAuthenticated(false);
    }
  };

  return { isAuthenticated, checkAuth };
};
