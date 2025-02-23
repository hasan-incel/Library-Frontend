import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Author from "./Components/Author/Author";
import Publisher from "./Components/Publisher/Publisher";
import Book from "./Components/Book/Book";
import Home from "./Components/Home/Home";
import Category from "./Components/Category/Category";
import Navbar from "./Components/Navbar/Navbar";
import Borrowing from "./Components/Borrowing/Borrowing";

const App = () => {
  return (
    <Router>
      <div className="app-wrapper">
        {/* Include the Navbar */}
        <Navbar />
        <div className="content">
          <Routes>
            {/* Home route */}
            <Route path="/" element={<Home />} />
            {/* Other routes */}
            <Route path="/authors" element={<Author />} />
            <Route path="/publishers" element={<Publisher />} />
            <Route path="/books" element={<Book />} />
            <Route path="/categories" element={<Category />} />{" "}
            <Route path="/borrowing" element={<Borrowing />} />
            {/* Add the category route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
