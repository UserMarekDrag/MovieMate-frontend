import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './Profile.css';

function Profile() {
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const result = await axios('http://localhost:8000/api-user/user');
      setUsername(result.data.username);
    };

    fetchUser();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    const user = {
      username: newUsername,
    };

    const response = await axios.put('http://localhost:8000/api-user/user', user);
    setUsername(response.data.username);
    setNewUsername("");
  };

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>User name: {username}</p>

      <form className="profile-form" onSubmit={handleSubmit}>
        <input type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)} placeholder="New username" />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Profile;
