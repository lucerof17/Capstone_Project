import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';
import '../Styles/Cart.css';


const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);

  const handleRemoveFromCart = (productId, quantityToRemove) => {
    removeFromCart(productId, quantityToRemove);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

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
          <button onClick={() => handleRemoveFromCart(item.id, 1)}>Remove One</button>
          <button onClick={() => handleRemoveFromCart(item.id, item.quantity)}>Remove All</button>

          <div>
            <h3>Cart Summary</h3>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice}</p>
          </div>
          
          {user && cartItems.length > 0 && (
            <button onClick={handleCheckout}>Proceed to Checkout</button>
          )}
        </div>

        
      ))}
    </div>
  );
};

export default Cart;

/*
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useCart } from '../CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRemoveFromCart = (productId, quantityToRemove) => {
    removeFromCart(productId, quantityToRemove);
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

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
          <button onClick={() => handleRemoveFromCart(item.id, 1)}>Remove One</button>
          <button onClick={() => handleRemoveFromCart(item.id, item.quantity)}>Remove All</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
*/

