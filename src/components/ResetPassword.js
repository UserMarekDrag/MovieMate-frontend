import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import InputField from './InputField';

import './ResetPassword.css';

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async event => {
    event.preventDefault();

    const validate = () => {
      let newErrors = {};

      // email validation
      if (!email) newErrors.email = 'Email is required.';
      else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is not valid.';
      
      setErrors(newErrors);

      // if newErrors is empty return true, else false
      return Object.keys(newErrors).length === 0 ? null : newErrors;
    };

    const errors = validate()

    if (!errors) {
        const user = {
          email
        };

        try {
          const response = await axios.post('http://localhost:8000/api-user/reset', user);
          console.log(response.data);
        } catch (err) {
          // Assuming the API returns a message in case of an error
          setErrors({...errors, api: err.response.data.message});
        }
    }   
  };
  

  return (
    <form className="password-form" onSubmit={handleSubmit}>
      <InputField type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" error={errors.email} />
      <button type="submit">Reset password</button>
      {errors.api && <div className="error-message">{errors.api}</div>}
      <div class="password-links">
        <span>Requires a verified email address.</span>
      </div>
      <div class="password-links">
        <span>Already have an account?</span>
        <Link to="/login">Sign in</Link>
      </div>
    </form>
  );
}

export default ResetPassword;
