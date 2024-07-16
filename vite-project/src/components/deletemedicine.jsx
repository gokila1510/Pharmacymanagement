import React, { useState } from 'react';
import './deletemedicine.css';
import { useNavigate } from 'react-router-dom';

const DeleteMedicine = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/delete-medicine/${name}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setDeleteSuccess(true);
        setTimeout(() => {
          navigate('/AdminDashboard'); // Redirect to AdminDashboard after a delay
        }, 2000);
      } else if (response.status === 404) {
        setError('Medicine not found.');
      } else {
        console.error('Failed to delete medicine:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  const handleBack = () => {
    navigate('/AdminDashboard');
  };

  const validateAndDelete = () => {
    if (!name) {
      setError('Please enter a medicine name.');
    } else {
      // Clear previous error if any
      setError('');
      handleDelete();
    }
  };

  return (
    <div className="delete-medicine-container">
      <h3>Delete Medicine</h3>
      <div>
        <input
          type="text"
          placeholder="Medicine Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="delete-medicine-input"
        />
        {error && <p className="error-message">{error}</p>}
        {deleteSuccess && <p className="success-message">Medicine deleted successfully.</p>}
      </div>
      <div>
        <button onClick={validateAndDelete} className="delete-medicine-button">Delete</button>
        <button onClick={handleBack} className="back-button">Back</button>
      </div>
    </div>
  );
}

export default DeleteMedicine;
