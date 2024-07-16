import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './updatemedicine.css';

const UpdateMedicine = () => {
  const [updateMedicine, setUpdateMedicine] = useState({
    id: '',
    medicinename: '',
    indication: '',
    price: '', // Change the initial value to an empty string
    countInStock: '' // Change the initial value to an empty string
  });

  const navigate = useNavigate();

  const handleUpdate = async () => {
    // Convert price and countInStock to numbers if they are not empty strings
    const updatedMedicine = {
      ...updateMedicine,
      price: updateMedicine.price !== '' ? parseFloat(updateMedicine.price) : '',
      countInStock: updateMedicine.countInStock !== '' ? parseInt(updateMedicine.countInStock) : ''
    };
    const handleBack = () => {
      navigate('/AdminDashboard');
    };
    try {
      const response = await fetch(`http://localhost:3001/medicine/${updateMedicine.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedMedicine) // Use updatedMedicine here
      });
      if (response.ok) {
        alert('Medicine updated successfully');
        setTimeout(() => {
          navigate('/AdminDashboard');
        }, 2000); // Redirect to AdminDashboard after 2 seconds
      } else {
        console.error('Failed to update medicine:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  return (
    <div className="update-medicine-container">
      
      <h3>Update Medicine</h3>
      <div>
        <input
          type="text"
          placeholder="Medicine ID"
          value={updateMedicine.id}
          onChange={(e) => setUpdateMedicine({ ...updateMedicine, id: e.target.value })}
          className="update-medicine-input"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="New Medicine Name"
          value={updateMedicine.medicinename}
          onChange={(e) => setUpdateMedicine({ ...updateMedicine, medicinename: e.target.value })}
          className="update-medicine-input"
        />
      </div>
      <div>
        <textarea
          placeholder="New Indication"
          value={updateMedicine.indication}
          onChange={(e) => setUpdateMedicine({ ...updateMedicine, indication: e.target.value })}
          className="update-medicine-textarea"
        ></textarea>
      </div>
      <div>
        <input
          type="text"
          placeholder="New Price"
          value={updateMedicine.price}
          onChange={(e) => setUpdateMedicine({ ...updateMedicine, price: e.target.value })}
          className="update-medicine-input"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="New Count in Stock"
          value={updateMedicine.countInStock}
          onChange={(e) => setUpdateMedicine({ ...updateMedicine, countInStock: e.target.value })}
          className="update-medicine-input"
        />
      </div>
      <button onClick={handleUpdate} className="update-medicine-button">Update</button>
      <button onClick={() => navigate('/AdminDashboard')} className="back-button">Back to Dashboard</button>
    </div>
  );
}

export default UpdateMedicine;
