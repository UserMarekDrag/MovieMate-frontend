import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import { AuthContext } from './AuthContext';

import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { isAuthenticated, checkAuth } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async event => {
    event.preventDefault();

    if (!email || !password) {
        setError("Please fill in all fields correctly.");
        return;
    }

    const user = {
        email: email,
        password: password,
    };

    try {
        const response = await axios.post('http://localhost:8000/api-user/login/', user);
        localStorage.setItem('token', response.data.token);
        checkAuth();
        navigate('/profile');
    } catch (err) {
      setError("Incorrect login or password");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <InputField type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
      <InputField type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
      {error && <div className="error-message">{error}</div>}
      <div className="login-links">
        <span>Don't have an account yet?</span>
        <Link to="/register">Register now</Link>
      </div>
    </form>
  );
}

export default Login;
