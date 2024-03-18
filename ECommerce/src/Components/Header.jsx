import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../Styles/Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header>
      <h1>My E-commerce App</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/cart">Cart </Link> 
        {user ? (
          <>
            <span> | Welcome, {user.username}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">| Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
