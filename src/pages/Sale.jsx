import React from 'react'
import { useEffect,useState } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import { getProducts } from '../services/api'
import "../styles/category.css"

const Sale = () => {
    const [products, setProducts] =
    useState([]);

  useEffect(() => {

    getProducts()
      .then((res) =>
        setProducts(
          res.data.filter(
            (item) =>
              item.oldPrice >
              item.price
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
            Mega Sale 🔥
          </h1>

          <p>
            Grab your favourite styles
            before they're gone!
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

export default Sale
