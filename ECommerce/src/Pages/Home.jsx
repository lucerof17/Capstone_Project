import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchProductsByCategory } from '../API';
import ProductCard from '../Components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        let response;
        if (selectedCategory === 'all') {
          response = await fetchProducts();
        } else {
          response = await fetchProductsByCategory(selectedCategory);
        }
        let sortedProducts = response.data;
        switch (sortOption) {
          case 'priceAsc':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
          case 'priceDesc':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
          case 'nameAsc':
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'nameDesc':
            sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
            break;
          default:
            // Default sorting or any other logic you want to implement
            break;
        }
        setProducts(sortedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAndSetProducts();
  }, [selectedCategory, sortOption]);

  return (
    <div>
      <h2>Products</h2>
      <div>
        <label>
          Filter by category:
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </label>
        <label>
          Sort by:
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="default">Default</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="nameAsc">Name: A to Z</option>
            <option value="nameDesc">Name: Z to A</option>
          </select>
        </label>
      </div>
      
      <div className="grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Home;


/*

import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchProductsByCategory } from '../API';
import ProductCard from '../Components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      try {
        let response;
        if (selectedCategory === 'all') {
          response = await fetchProducts();
        } else {
          response = await fetchProductsByCategory(selectedCategory);
        }
        const sortedProducts = response.data.sort((a, b) =>
          sortOrder === 'asc' ? a.price - b.price : b.price - a.price
        );
        setProducts(sortedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAndSetProducts();
  }, [sortOrder, selectedCategory]);

  return (
    <div>
      <h2>Products</h2>
      <div>
        <label>
          Sort by price:
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <label>
          Filter by category:
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </label>
      </div>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;



*/