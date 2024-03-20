import React from 'react';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import '../Styles/Checkout.css';

// Checkout Functionailty ----------------------------------------------------------------------------------------------------------------//
  const Checkout = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();

// Quanity Function
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);

// Place order logic alert
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Order placed successfully!');
  };

// alert if not logged in
  if (!user) {
    return <div>Please log in to proceed with checkout.</div>;
  }


// React component to display Checkout items and summary  ---------------------------------------------------------------------------------//
  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" required />
        </div>
        <div>
          <label>Address: </label>
          <input type="text" required />
        </div>
        <div>
          <label>Card Infromation:</label>
          <input type="text" required />
        </div>
        <div>
          <h2>Order Summary: </h2>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.title} - Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
        <div>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice}</p>
      </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;
