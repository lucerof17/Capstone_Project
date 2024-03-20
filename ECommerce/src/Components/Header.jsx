import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../Styles/Header.css';


//Header for all pages --------------------------------------------------------------------------------------------//
  const Header = () => {
  const { user, logout } = useAuth();


// React component that renders the header -----------------------------------------------------------------------//
  return (
    <div className='Head'>
      <header>
        <h1>Welcome to my E-Commerce Store!</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/cart">Cart </Link> |
          {user ? (
            <>
              <span> Welcome, {user.username}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
