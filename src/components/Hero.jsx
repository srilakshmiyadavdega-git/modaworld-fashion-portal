import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/hero.css"

const Hero = () => {
  return (
   <section className="hero">

      <div className="hero-content">

        <p className="hero-small">
          ✨ MODAWORLD EXCLUSIVE
        </p>

        <h1>
          Your Style.
          <br />
          Your World.
        </h1>

        <p className="hero-text">
          Discover the latest fashion
          for Women, Men & Kids.
        </p>

        <div className="hero-buttons">

          <Link to="/women" className="hero-primary">
            Shop Women
          </Link>

          <Link to="/men" className="hero-secondary">
            Shop Men
          </Link>

        </div>

      </div>

      <div className="hero-image">

        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85"
          alt="ModaWorld fashion collection"
        />

        <div className="floating-card">
          <strong>50–70% OFF</strong>
          <span>Fashion Sale</span>
        </div>

      </div>

    </section>

  )
}

export default Hero
