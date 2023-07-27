import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Loader from './Loader';
import Delete from './Delete';

import './Profile.css';

const Profile = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, checkAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get('http://localhost:8000/api-user/user/', {
          headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
        });
        setUsername(result.data.user.username);
      } catch (error) {
        console.error(error);
        checkAuth();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [checkAuth]);

  if (!isAuthenticated && !isLoading) {
    navigate('/login');
    return null;
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile</h2>
        <div className="user-info">
          <p><span className="info-label">Username:</span> {username}</p>
        </div>
        <div className="action-links">
          <Link to="/password/change" className="btn-change-password">Change Password</Link>
          <Delete />
        </div>
      </div>
    </div>
  );
}

export default Profile;