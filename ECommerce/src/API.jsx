import axios from 'axios';

// API Fetching URL
  const API_BASE_URL = 'https://fakestoreapi.com';

// API Fetch Products and Categories for filters
  export const fetchProducts = () => axios.get(`${API_BASE_URL}/products`);
  export const fetchProductDetails = (id) => axios.get(`${API_BASE_URL}/products/${id}`);
  export const fetchProductsByCategory = (category) =>
  axios.get(`${API_BASE_URL}/products/category/${category}`);

// API Fetch Users
  export const authenticateUser = async (username, password) => {
    const response = await axios.get(`https://fakestoreapi.com/users`);
    const users = response.data;
    const user = users.find(user => user.username === username && user.password === password);
    return user;
  };
  

