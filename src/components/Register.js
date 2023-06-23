import React, { useState } from 'react';
import axios from 'axios';

import './Register.css';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async event => {
      event.preventDefault();
  
      // Validation
      if (!username || !password || !email || password !== confirmPassword || !acceptTerms) {
          setError("Please fill in all fields correctly and accept the terms and conditions.");
          return;
      }
  
      const user = {
          username: username,
          password: password,
          email: email
      };
  
      try {
          const response = await axios.post('http://localhost:8000/api-user/register', user);
          console.log(response.data);
      } catch (err) {
          // Assuming the API returns a message in case of an error
          setError(err.response.data.message);
      }
  };
  

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required/>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required/>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required/>
      <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required/>
      <div className="checkbox-container">
        <input type="checkbox" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} />
        <span>I accept the terms and conditions</span>
      </div>
      <button type="submit">Register</button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}

export default Register;
