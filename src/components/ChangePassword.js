import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import InputField from './InputField';
import { toast } from 'react-toastify';
import { AuthContext } from './AuthContext';

import './ChangePassword.css';

function ChangePassword() {
    const navigate = useNavigate();
    const { checkAuth } = useContext(AuthContext);
    const [old_password, setOldPassword] = useState("");
    const [new_password, setNewPassword] = useState("");
    const [new_password2, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
          try {
            await axios.get(`${process.env.REACT_APP_API_URL}/api-user/user/`, {
              headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
            });
          } catch (error) {
            console.error(error);
            navigate('/login');
            checkAuth();
          }
        };
    
        fetchUser();
    }, [navigate, checkAuth]);

    const validate = () => {
        let newErrors = {};

        if (!new_password || !new_password2) newErrors.password = "Please fill in both password fields.";
        else if (new_password !== new_password2) newErrors.password = "The passwords do not match.";
        else if (new_password.length < 8) newErrors.password = 'Password should be at least 8 characters long.';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (validate()) {
            const password = {
                old_password,
                new_password,
                new_password2,
            };

            try {
                const response = await axios.put(`${process.env.REACT_APP_API_URL}/api-user/change/`, password, {
                  headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
                });
                console.log(response.data);
                if (response.status === 200) {
                    toast.success('Successfully password changed!');
                    navigate('/profile');
                } else {
                    toast.error('An error occurred during password changed.');
                }
            } catch (err) {
                setErrors({...errors, api: err.response.data.message});
            }
        }
    };

    return (
        <form className="password-form" onSubmit={handleSubmit}>
            <InputField type="password" value={old_password} onChange={e => setOldPassword(e.target.value)} placeholder="Old password"/>
            <InputField type="password" value={new_password} onChange={e => setNewPassword(e.target.value)} placeholder="New password"/>
            <InputField type="password" value={new_password2} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" error={errors.password} />
            <button type="submit">Change password</button>
            {errors.api && <div className="error-message">{errors.api}</div>}
            <div className="password-links">
                <Link to="/profile">Back to profile</Link>
            </div>
        </form>
    );
}

export default ChangePassword;
