import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get('http://localhost:8000/api-user/user/', {
          headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
        });
        setUsername(result.data.user.username);
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>User name: {username}</p>
      <div className="login-links">
        <span>Change your password.</span>
        <Link to="/password/change">Change password</Link>
      </div>
    </div>
  );
}

export default Profile;
