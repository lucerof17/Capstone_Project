import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductDetails } from '../API';
import { useCart } from '../CartContext';
import { useAuth } from '../AuthContext';
import '../Styles/ProductPage.css';

// Individual Product Page with add to cart btn ---------------------------------------------------------------------------------//
  const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);


// API Ftech product
  useEffect(() => {
    fetchProductDetails(id)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [id]);

// Add cart and auth user logged in logic
  const { addToCart } = useCart();
  const { user } = useAuth();

// Cart btn and alert if not logged user
  const handleAddToCart = () => {
    if (!user) {
      alert('You must be logged in to add items to the cart!');
      return;
    }
    addToCart(product, quantity);
    alert('Product added to cart!');
  };

  if (!product) {
    return <div>Loading...</div>;
  }


  // // React component to display a single product card quantity and cart btn ---------------------------------------------------------------------------------//
  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p>${product.price}</p>
      <label>
        Quantity:
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
          min="1"
        />
      </label>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductPage;
