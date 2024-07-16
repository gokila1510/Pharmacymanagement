import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MedicineDetails.css';

function MedicineDetails() {
  const { medicineId } = useParams();
  const [medicine, setMedicine] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/medicine/${medicineId}`)
      .then(response => {
        setMedicine(response.data);
      })
      .catch(error => {
        console.error('Error fetching medicine details:', error);
      });
  }, [medicineId]);

  const addToCart = () => {
    if (!medicine) return; // Check if medicine is null before adding to cart
    axios.post(`http://localhost:3001/cart/add/${medicine._id}`)
      .then(response => {
        console.log('Medicine added to cart:', response.data);
        // Optionally, you can navigate to the cart page or show a success message
      })
      .catch(error => {
        console.error('Error adding medicine to cart:', error);
        // Handle error, such as displaying an error message to the user
      });
  };

  const navigateBack = () => {
    navigate('/Medicines');
  };

  return (
    <div className="medicine-details-container">
      {medicine ? (
        <>
          <h1 style={{ fontWeight: 'bold' }}>{medicine.title}</h1>
          <img src={medicine.imgsrc} alt={medicine.medicinename} style={{ width: '200px', borderRadius: '5px' }} />
          <p><strong>Indication:</strong> {medicine.indication}</p>
          <p><strong>Dosage:</strong> {medicine.dosage}</p>
          <p><strong>Side Effects:</strong> {medicine.sideEffects}</p>
          <p><strong>Price:</strong> ${medicine.price}</p>
          <p><strong>Count in Stock:</strong> {medicine.countInStock}</p>
          <p><strong>Category:</strong> {medicine.category}</p>
          <button onClick={addToCart}>Add to Cart</button>
          <button onClick={navigateBack}>Back to Medicines</button>
        </>
      ) : (
        <div>Loading...</div> // Add loading indicator or error message here
      )}
    </div>
  );
}

export default MedicineDetails;
