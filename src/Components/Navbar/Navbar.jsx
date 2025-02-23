// Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // Import Navbar styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/authors">Authors</Link>
        </li>
        <li>
          <Link to="/publishers">Publishers</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/borrowing">Borrowing</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
