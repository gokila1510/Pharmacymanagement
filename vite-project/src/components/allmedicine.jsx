import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Medicines.css';
import { Link } from 'react-router-dom';
function Medicines() {
  const [medicineData, setMedicineData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchSideEffects, setSearchSideEffects] = useState('');
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/all-medicines')
      .then(response => {
        setMedicineData(response.data);
        setFilteredMedicines(response.data); // Initialize filtered medicines with all medicines
      })
      .catch(error => {
        console.error('Error fetching medicine data:', error);
      });
  }, []);

  useEffect(() => {
    // Filter medicines whenever search criteria change
    const updatedMedicines = medicineData.filter(medicine =>
      medicine.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (searchCategory === '' || medicine.category?.toLowerCase().includes(searchCategory.toLowerCase())) &&
      (searchSideEffects === '' || medicine.sideEffects?.toLowerCase().includes(searchSideEffects.toLowerCase()))
    );
    setFilteredMedicines(updatedMedicines);
  }, [searchTerm, searchCategory, searchSideEffects, medicineData]);

  return (
    <div className="dashboard-container">
      <div id="menu">
        <ul>
          <li><Link to="/UserDashboard">Home</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </div>
      <div className="content">
        <div className="all-medicines">
          <h1 style={{ textAlign: 'center' }}>All Medicines</h1>
          <div className="search-area">
            <input
              type="text"
              placeholder="Search for medicines..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <select onChange={(event) => setSearchCategory(event.target.value)}>
              <option value="">All Categories</option>
              <option value="Diabetes">Diabetes</option>
              <option value="Dental">Dental</option>
              {/* Add more categories here */}
            </select>
            <input
              type="text"
              placeholder="Search by side effects..."
              value={searchSideEffects}
              onChange={(event) => setSearchSideEffects(event.target.value)}
            />
          </div>
          <div className="medicines-list">
            {filteredMedicines.map((medicine, index) => (
              <div key={index} className="medicine">
                <img src={medicine.imgsrc} alt={medicine.title} />
                <div className="medicine-details">
                  <h2>{medicine.title}</h2>
                  <p><strong>Price:</strong> ${medicine.price}</p>
                  {/* Add more details here */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Medicines;
