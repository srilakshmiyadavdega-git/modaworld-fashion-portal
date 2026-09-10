import React from 'react'
import "../styles/checkout.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { placeOrder } from "../redux/slices/orderSlice"
import { clearCart } from "../redux/slices/cartSlice"

const Checkout = () => {
   const dispatch = useDispatch();

  const navigate = useNavigate();

  const cart =
    useSelector(
      (state) =>
        state.cart.items
    );

  const user =
    useSelector(
      (state) =>
        state.auth.user
    );

  const loading =
    useSelector(
      (state) =>
        state.order.loading
    );

  const [address, setAddress] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [payment, setPayment] =
    useState("Cash on Delivery");

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.price *
        item.quantity,
      0
    );

  const place = async (e) => {

    e.preventDefault();

    if (cart.length === 0) {

      alert(
        "Your cart is empty"
      );

      return;
    }

    const order = {

      customer:
        user?.name ||
        "Guest User",

      email:
        user?.email || "",

      phone,

      address,

      items: cart,

      total,

      paymentMethod:
        payment,

      status:
        "Order Placed",

      date:
        new Date()
          .toISOString()
    };

    const result =
      await dispatch(
        placeOrder(order)
      );

    if (
      placeOrder.fulfilled.match(
        result
      )
    ) {

      dispatch(clearCart());

      alert(
        "🎉 Order placed successfully!"
      );

      navigate("/tracking");

    }

  };

  return (
    <>
      {/* <Navbar /> */}

      <section className="checkout-page">

        <form
          className="checkout-form"
          onSubmit={place}
        >

          <h1>
            Checkout
          </h1>

          <h3>
            Delivery Address
          </h3>

          <input
            type="text"
            placeholder="Full Name"
            value={
              user?.name || ""
            }
            readOnly
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            required
          />

          <textarea
            placeholder="Complete Delivery Address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            required
          />

          <h3>
            Payment Method
          </h3>

          <label className="payment-option">

            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              checked={
                payment ===
                "Cash on Delivery"
              }
              onChange={(e) =>
                setPayment(
                  e.target.value
                )
              }
            />

            Cash on Delivery

          </label>

          <label className="payment-option">

            <input
              type="radio"
              name="payment"
              value="UPI"
              onChange={(e) =>
                setPayment(
                  e.target.value
                )
              }
            />

            UPI

          </label>

          <label className="payment-option">

            <input
              type="radio"
              name="payment"
              value="Card"
              onChange={(e) =>
                setPayment(
                  e.target.value
                )
              }
            />

            Credit / Debit Card

          </label>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Placing Order..."
              : "Place Order"}
          </button>

        </form>

        <div className="checkout-summary">

          <h2>
            Order Summary
          </h2>

          {cart.map(
            (item) => (

              <div
                className="checkout-item"
                key={`${item.id}-${item.size}`}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>

                  <h4>
                    {item.name}
                  </h4>

                  <p>
                    Qty:
                    {" "}
                    {item.quantity}
                  </p>

                </div>

                <strong>
                  ₹
                  {item.price *
                    item.quantity}
                </strong>

              </div>

            )
          )}

          <hr />

          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ₹{total}
            </strong>

          </div>

        </div>

      </section>

      {/* <Footer /> */}
    </>
  );
}

export default Checkout
