import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/ProductCard.css';

//Product Cards produced from .map pulled from API ------------------------------------------------------------------------------------//
  const ProductCard = ({ product }) => {


// React component to display a single product card ---------------------------------------------------------------------------------//
  return (
    <div>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <Link to={`/product/${product.id}`}>View Details</Link>

    </div>
  );
};

export default ProductCard;

