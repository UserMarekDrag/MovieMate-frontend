import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { validateRegister } from './Validation';
import InputField from './InputField';
import { toast } from 'react-toastify';

import './Register.css';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();
  
    const validationErrors = validateRegister(username, email, password, confirmPassword, acceptTerms);
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      const user = {
          username,
          email,
          password
      };
  
      try {
        const response = await axios.post('http://localhost:8000/api-user/register/', user);
  
        if (response.status === 201) {
            toast.success('Successfully registered!');
            navigate('/login');
        } else {
            toast.error('An error occurred during registration.');
        }
  
      } catch (err) {
        if (err.response && err.response.data && err.response.data.email) {
            setErrors({...errors, email: err.response.data.email[0]});
        } else if (err.response && err.response.data && err.response.data.message) {
            setErrors({...errors, api: err.response.data.message});
        } else {
            toast.error('An error occurred during registration.');
        }
      }      
    }
  }; 

return (
  <form className="register-form" onSubmit={handleSubmit}>
  
    <InputField type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" error={errors.username} />
    <InputField type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" error={errors.email} />
    <InputField type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" error={errors.password} />
    <InputField type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" error={errors.confirmPassword} />
    <div className="checkbox-container">
      <input type="checkbox" checked={acceptTerms} onChange={e => setAcceptTerms(e.target.checked)} />
      <span>I accept the terms and conditions</span>
    </div>
    {errors.acceptTerms && <p className="field-error">{errors.acceptTerms}</p>}
    
    <button type="submit">Register</button>
    {errors.api && <div className="error-message">{errors.api}</div>}
    
    <div className="register-links">
      <span>Already have an account?</span>
      <Link to="/login">Sign in</Link>
    </div>
  
  </form>
);
}

export default Register;