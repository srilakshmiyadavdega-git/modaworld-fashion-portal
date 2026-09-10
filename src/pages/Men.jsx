import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import Footer from "../components/Footer"
import { getProducts } from '../services/api'
import "../styles/category.css"

const Men = () => {
    const [products, setProducts] =
    useState([]);

  useEffect(() => {

    getProducts()
      .then((res) =>
        setProducts(
          res.data.filter(
            (item) =>
              item.category === "Men"
          )
        )
      );

  }, []);

  return (
    <>
      {/* <Navbar /> */}

      <section className="category-page">

        <div className="category-banner men-banner">

          <h1>
            Men's Fashion
          </h1>

          <p>
            Smart styles for every occasion
          </p>

        </div>

        <div className="products-grid">

          {products.map(
            (product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            )
          )}

        </div>

      </section>

      {/* <Footer /> */}
    </>
  )
}

export default Men
