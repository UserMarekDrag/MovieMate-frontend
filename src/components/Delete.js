import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Delete = () => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete('http://localhost:8000/api-user/delete/', {
        headers: { 'Authorization': 'Token ' + localStorage.getItem('token') }
      });
      toast.success('Successfully Deleted!');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Link className="delete-btn" onClick={handleDelete}>Delete</Link>
  );
}

export default Delete;