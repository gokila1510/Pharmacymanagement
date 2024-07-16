import React, { useState, useEffect } from 'react';
import './UserProfile.css';
function UserProfile() {
  const [userData, setUserData] = useState(null); // State to hold user data

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://your-api.com/user'); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Error fetching user data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      {userData ? (
        <>
          {userData.name && <p><strong>Name:</strong> {userData.name}</p>}
          {userData.email && <p><strong>Email:</strong> {userData.email}</p>}
          {/* Add more user profile fields as needed */}
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
}

export default UserProfile;