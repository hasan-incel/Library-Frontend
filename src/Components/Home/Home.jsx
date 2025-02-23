import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our Library</h1>
          <p>
            Discover a world of knowledge, explore our vast collection of books,
            and manage your borrowings with ease.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📚 Extensive Collection</h3>
            <p>
              Access thousands of books across various genres, from fiction to
              academic resources.
            </p>
          </div>
          <div className="feature-card">
            <h3>⏱️ Easy Borrowing</h3>
            <p>
              Borrow and return books seamlessly with our user-friendly
              management system.
            </p>
          </div>
          <div className="feature-card">
            <h3>🌟 Expert Guidance</h3>
            <p>
              Get recommendations and assistance from our knowledgeable staff.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
