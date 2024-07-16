import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Medicines.css';

function Medicines() {
  const [medicineData, setMedicineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/all-medicines')
      .then(response => {
        setMedicineData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching medicine data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div id="menu">
        <ul>
          <li><Link to="/AdminDashboard">Home</Link></li>
          <li><Link to="/Medicines">All Medicines</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </div>
      <div className="content">
        <div className="all-medicines">
          <h1 style={{ textAlign: 'center' }}>All Medicines</h1>
          <div className="medicines-list">
            {medicineData.map(medicine => (
              <div key={medicine._id} className="medicine">
                <Link to={`/medicine/${medicine._id}`}>
                  <img src={medicine.imgsrc} alt={medicine.title} />
                </Link>
                <div className="medicine-details">
                  <h2>{medicine.title}</h2>
                  <p><strong>Price:</strong> ${medicine.price}</p>
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
