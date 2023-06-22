import React, { useState } from 'react';
import axios from 'axios';

import './Login.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    const response = await axios.post('http://localhost:8000/api-user/login', user);
    console.log(response.data);
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
