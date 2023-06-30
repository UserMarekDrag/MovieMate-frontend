import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import InputField from './InputField';

import './ChangePassword.css';

function ChangePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem('token');
    let email;
    if (token) {
        try {
            const decoded = jwt_decode(token);
            email = decoded.email;
        } catch (e) {
            console.error(e);
        }
    }

    const validate = () => {
        let newErrors = {};

        // password validation
        if (!password || !confirmPassword) newErrors.password = "Please fill in both password fields.";
        else if (password !== confirmPassword) newErrors.password = "The passwords do not match.";
        else if (password.length < 8) newErrors.password = 'Password should be at least 8 characters long.';

        setErrors(newErrors);

        // if newErrors is empty return true, else false
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (validate()) {
            const user = {
                email,
                password,
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
            <InputField type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" error={errors.password} />
            <InputField type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" error={errors.confirmPassword} />
            <button type="submit">Change password</button>
            {errors.api && <div className="error-message">{errors.api}</div>}
            <div className="password-links">
                <Link to="/password/reset">Request a new confirmation email.</Link>
            </div>
            <div className="password-links">
                <spam>Already have an account?</spam>
                <Link to="/login">Sign in</Link>
            </div>
        </form>
    );
}

export default ChangePassword;
