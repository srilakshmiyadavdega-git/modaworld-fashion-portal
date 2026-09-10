import React from 'react'
import "../styles/wishlist.css"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useSelector } from 'react-redux'


const Whishlist = () => {
   const items =
    useSelector(
      (state) =>
        state.wishlist.items
    );

  return (
    <>
      {/* <Navbar /> */}

      <section className="wishlist-page">

        <div className="page-title">

          <h1>
            My Wishlist ❤️
          </h1>

          <p>
            {items.length} saved items
          </p>

        </div>

        {items.length === 0 ? (

          <div className="empty-wishlist">

            <span>
              ♡
            </span>

            <h2>
              Your Wishlist is Empty
            </h2>

            <p>
              Save your favourite
              products here.
            </p>

          </div>

        ) : (

          <div className="products-grid">

            {items.map(
              (product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              )
            )}

          </div>

        )}

      </section>

      {/* <Footer /> */}
    </>
  );

}

export default Whishlist
