import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';
import '../Styles/Cart.css';

// Cart Functionailty ------------------------------------------------------------------------------------------------------------//
  const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

// Quanity Function
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);

// Remove from cart logic
  const handleRemoveFromCart = (productId, quantityToRemove) => {
    removeFromCart(productId, quantityToRemove);
  };

// Checkout Nav
  const handleCheckout = () => {
    navigate('/checkout');
  };

//  Redirect to login page if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);


// React component to display Cart items purchase ---------------------------------------------------------------------------------//
  return (
    <div>
      <h2>Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
          <p>${item.price}</p>
          <label>
            Quantity:
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value, 10) || 1))}
              min="1"
            />
          </label>
          <button onClick={() => handleRemoveFromCart(item.id, item.quantity)}>Remove From Cart</button>

        </div>
      ))}

      <div className="total">   
        <h3>Cart Summary</h3>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ${totalPrice}</p>
      </div>
          
      {user && cartItems.length > 0 && (
        <button onClick={handleCheckout}>Proceed to Checkout</button>
      )}
    </div>
    
  );
};

export default Cart;

