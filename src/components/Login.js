import React, { useState } from 'react';
import axios from 'axios';

import './Login.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async event => {
      event.preventDefault();
  
      // Validation
      if (!username || !password) {
          setError("Please fill in all fields correctly.");
          return;
      }
  
      const user = {
          username: username,
          password: password,
      };
  
      try {
          const response = await axios.post('http://localhost:8000/api-user/login', user);
          console.log(response.data);
      } catch (err) {
          // Assuming the API returns a message in case of an error
          setError(err.response.data.message);
      }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}

export default Login;
