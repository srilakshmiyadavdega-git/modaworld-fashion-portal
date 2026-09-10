import React from 'react'
import "../styles/cart.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { increaseQuantity, decreaseQuantity, removeFromCart } from "../redux/slices/cartSlice"


const Cart = () => {
   const dispatch = useDispatch();

  const items =
    useSelector(
      (state) =>
        state.cart.items
    );

  const total =
    items.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.quantity,
      0
    );

  const discount =
    Math.round(total * 0.10);

  const finalTotal =
    total - discount;

  return (
    <>
      {/* <Navbar /> */}

      <section className="cart-page">

        <h1>
          My Shopping Bag
        </h1>

        {items.length === 0 ? (

          <div className="empty-cart">

            <div>
              🛒
            </div>

            <h2>
              Your Bag is Empty
            </h2>

            <p>
              Add products to continue
              shopping.
            </p>

            <Link
              to="/"
              className="continue-button"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div className="cart-layout">

            <div className="cart-items">

              {items.map(
                (item) => (

                  <div
                    className="cart-item"
                    key={`${item.id}-${item.size}`}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="cart-info">

                      <small>
                        {item.category}
                      </small>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        Size: {item.size}
                      </p>

                      <strong>
                        ₹{item.price}
                      </strong>

                      <div className="quantity">

                        <button
                          onClick={() =>
                            dispatch(
                              decreaseQuantity(
                                item
                              )
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            dispatch(
                              increaseQuantity(
                                item
                              )
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                    </div>

                    <button
                      className="delete"
                      onClick={() =>
                        dispatch(
                          removeFromCart(
                            item
                          )
                        )
                      }
                    >
                      🗑
                    </button>

                  </div>

                )
              )}

            </div>

            <div className="summary">

              <h2>
                Price Details
              </h2>

              <div>
                <span>
                  Total MRP
                </span>

                <span>
                  ₹{total}
                </span>
              </div>

              <div>
                <span>
                  Discount
                </span>

                <span className="green">
                  -₹{discount}
                </span>
              </div>

              <div>
                <span>
                  Delivery
                </span>

                <span className="green">
                  FREE
                </span>
              </div>

              <hr />

              <div className="grand-total">

                <strong>
                  Total Amount
                </strong>

                <strong>
                  ₹{finalTotal}
                </strong>

              </div>

              <Link
                to="/checkout"
                className="checkout-button"
              >
                Proceed To Checkout
              </Link>

            </div>

          </div>

        )}

      </section>

      {/* <Footer /> */}
    </>
  );
}



export default Cart
