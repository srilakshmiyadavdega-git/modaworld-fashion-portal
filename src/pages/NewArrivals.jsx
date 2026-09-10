import React from 'react'
import { useEffect, useState } from 'react'
import Navbar from "../components/Navbar"
import ProductCard from  "../components/ProductCard"
import Footer from "../components/Footer"
import { getProducts } from '../services/api'
import "../styles/category.css"

const NewArrivals = () => {
    const [products, setProducts] =
    useState([]);

  useEffect(() => {

    getProducts()
      .then((res) =>
        setProducts(
          res.data.slice(-6)
        )
      );

  }, []);

  return (
    <>
      {/* <Navbar /> */}

      <section className="category-page">

        <div className="category-banner women-banner">

          <h1>
            New Arrivals ✨
          </h1>

          <p>
            Fresh styles just landed
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
  );
}

export default NewArrivals
   
      
