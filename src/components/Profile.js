import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import { useAuth } from './useAuth';
import Loader from './Loader';
import Delete from './Delete';

import './Profile.css';

import './Profile.css';

const Profile = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get('http://localhost:8000/api-user/user/', {
          headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
        });
        setUsername(result.data.user.username);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (!isAuthenticated && !isLoading) {
    checkAuth();
    return null;
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>User name: {username}</p>
      <div className="login-links">
        <span>Change your password.</span>
        <Link to="/password/change">Change password</Link>
        <Logout />
        <Delete />
      </div>
    </div>
  );
}

export default Profile;