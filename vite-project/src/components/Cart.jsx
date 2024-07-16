import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  
  useEffect(() => {
    // Fetch cart items for the current user when the component mounts
    fetchCartItems();
  }, []);

  const fetchCartItems = () => {
    // Send the user's authentication token with the request
    const authToken = localStorage.getItem('authToken'); // Example: retrieve the auth token from local storage
    axios.get('http://localhost:3001/cart/items', {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(response => {
        setCartItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart items:', error);
      });
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h2>{item.name}</h2>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
