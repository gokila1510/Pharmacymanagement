import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css';

const RoleSelection = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (role === 'admin') {
      navigate('/login');
    } else if (role === 'user') {
      navigate('/register');
    } else {
      alert('Please select a role!');
    }
  };

  return (
    <div className="background">
      <div className="container">
        <div className="role-selection-form">
          <h1>Welcome to Pharmacy Management System</h1>
          <p>Please select your role:</p>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                onChange={() => handleRoleSelection('admin')}
              />
              Admin
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                onChange={() => handleRoleSelection('user')}
              />
              User
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
