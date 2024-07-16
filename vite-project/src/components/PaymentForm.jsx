import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function PaymentForm() {
  const [paymentError, setPaymentError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (result.error) {
      setPaymentError(result.error.message);
    } else {
      // Send payment method to your server for processing
      // Handle success/failure on the server
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {paymentError && <div>{paymentError}</div>}
    </form>
  );
}

export default PaymentForm;
