import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './UserDashboard.css';


function UserDashboard() {
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogout = () => {
    // Perform logout actions here if needed
    // For now, simply navigate to the login page
    navigate('/');
  };

  return (
    <div className="user-dashboard-wrapper"> 
    <div className="dashboard-container">
      <nav>
       <ul>
          <li><Link to="/UserDashboard">Home</Link></li>
          <li><Link to="/Medicines">Medicines</Link></li>
          <li><Link to="/Cart">Cart</Link></li>
        </ul>
      </nav>
      <div className="content">
       
      
        <div id="welcome-message">
          <h2>Welcome</h2>
          <p>Buy your medicine online</p>
        </div>
        {/* Logout button */}
        <div className="logout-button">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default UserDashboard;
