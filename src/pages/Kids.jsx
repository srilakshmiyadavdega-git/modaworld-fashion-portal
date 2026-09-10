import React from 'react'
import { useEffect,useState } from 'react'
import Navbar from  "../components/Navbar"
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import { getProducts } from '../services/api'
import "../styles/category.css"

const Kids = () => {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {

    getProducts()
      .then((res) =>
        setProducts(
          res.data.filter(
            (item) =>
              item.category ===
              "Kids"
          )
        )
      );

  }, []);

  return (
    <>
      {/* <Navbar /> */}

      <section className="category-page">

        <div className="category-banner kids-banner">

          <h1>
            Kids Fashion
          </h1>

          <p>
            Cute, colorful & comfortable
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

export default Kids
