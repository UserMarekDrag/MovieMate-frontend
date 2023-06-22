import React, { useState } from 'react';
import axios from 'axios';

import './Register.css';

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    const response = await axios.post('http://localhost:8000/api-user/register', user);
    console.log(response.data);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
