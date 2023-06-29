import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './ResetPassword.css';

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async event => {
      event.preventDefault();
      
      // Clear error state
      setError(null);

      // Validation
      if (!email) {
          setError("Please fill in email field.");
          return;
      }
  
      const user = {
          email: email
      };
  
      try {
          const response = await axios.post('http://localhost:8000/api-user/reset', user);
          console.log(response.data);
      } catch (err) {
          // Assuming the API returns a message in case of an error
          setError(err.response.data.message);
      }
  };
  

  return (
    <form className="password-form" onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required/>
      <button type="submit">Reset password</button>
      {error && <div className="error-message">{error}</div>}
      <div class="password-links">
        Requires a verified email address.
      </div>
      <div class="password-links">
        Already have an account?
        <Link to="/login">Sign in</Link>
      </div>
    </form>
  );
}

export default ResetPassword;
