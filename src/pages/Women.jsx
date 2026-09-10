import React from 'react'
import "../styles/category.css"
import { useEffect,useState } from 'react'
// import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
// import Footer from '../components/Footer'
import { getProducts } from '../services/api'
import "../styles/category.css"

const Women = () => {
 const [products, setProducts] =
    useState([]);

  useEffect(() => {

    getProducts()
      .then((res) =>
        setProducts(
          res.data.filter(
            (item) =>
              item.category ===
              "Women"
          )
        )
      );

  }, []);

  return (
    <>
      {/* <Navbar /> */}

      <section className="category-page">

        <div className="category-banner women-banner">

          <h1>
            Women's Fashion
          </h1>

          <p>
            Discover your perfect style
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

export default Women

