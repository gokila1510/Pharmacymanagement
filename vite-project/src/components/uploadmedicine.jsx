import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './uploadmedicine.css';

const UploadMedicine = () => {
  const [medicine, setMedicine] = useState({
    imgsrc: '',
    title: '',
    indication: '',
    dosage: '',
    sideEffects: '',
    price: 0,
    countInStock: 0,
    category: ''
  });
 
  const navigate = useNavigate();

  const handleUpload = async () => {
    try {
      const response = await fetch('http://localhost:3001/upload-medicine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicine)
      });
      alert('Medicine uploaded successfully');
      setTimeout(() => {
        navigate('/AdminDashboard'); // Redirect to AdminDashboard after a delay
      }, 2000);
    } catch (error) {
      console.error('Error uploading medicine:', error);
    }
  };
  const handleBack = () => {
    navigate('/AdminDashboard');
  };

  return (
    <div className="upload-medicine-container">
    
      <h3>Upload Medicine</h3>
      <div>
        <input
          type="text"
          placeholder="Image Source URL"
          value={medicine.imgsrc}
          onChange={(e) => setMedicine({ ...medicine, imgsrc: e.target.value })}
          className="upload-medicine-input"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Medicine Title"
          value={medicine.title}
          onChange={(e) => setMedicine({ ...medicine, title: e.target.value })}
          className="upload-medicine-input"
        />
      </div>
      <div>
        <textarea
          placeholder="Indication"
          value={medicine.indication}
          onChange={(e) => setMedicine({ ...medicine, indication: e.target.value })}
          className="upload-medicine-textarea"
        ></textarea>
      </div>
      <div>
        <textarea
          placeholder="Dosage"
          value={medicine.dosage}
          onChange={(e) => setMedicine({ ...medicine, dosage: e.target.value })}
          className="upload-medicine-textarea"
        ></textarea>
      </div>
      <div>
        <textarea
          placeholder="Side Effects"
          value={medicine.sideEffects}
          onChange={(e) => setMedicine({ ...medicine, sideEffects: e.target.value })}
          className="upload-medicine-textarea"
        ></textarea>
      </div>
      <div>
      <label htmlFor="price">Price:</label>
        <input
          type="number"
          placeholder="Price"
          value={medicine.price}
          onChange={(e) => setMedicine({ ...medicine, price: parseFloat(e.target.value) })}
          className="upload-medicine-input"
        />
      </div>
      <div>
      <label htmlFor="countInStock">Count in Stock:</label>
        <input
          type="number"
          placeholder="Count in Stock"
          value={medicine.countInStock}
          onChange={(e) => setMedicine({ ...medicine, countInStock: parseInt(e.target.value) })}
          className="upload-medicine-input"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Category"
          value={medicine.category}
          onChange={(e) => setMedicine({ ...medicine, category: e.target.value })}
          className="upload-medicine-input"
        />
      </div>
      <div>
        <button onClick={handleUpload} className="upload-medicine-button">Upload</button>
        <button onClick={handleBack} className="back-button">Back</button>
      </div>
    </div>
  );
}

export default UploadMedicine;
