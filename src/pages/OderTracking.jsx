import React from 'react'
import "../styles/odertracking.css"
import { useSelector } from 'react-redux'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const OderTracking = () => {
  const order =
    useSelector(
      (state) =>
        state.order.latestOrder
    );

  if (!order) {

    return (
      <>
        {/* <Navbar /> */}

        <section className="tracking-page">

          <div className="no-order">

            <h1>
              No Recent Order
            </h1>

            <p>
              Place an order to track it here.
            </p>

          </div>

        </section>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="tracking-page">

        <div className="tracking-header">

          <div>

            <h1>
              Order Tracking
            </h1>

            <p>
              Order ID: #{order.id}
            </p>

          </div>

          <strong>
            ₹{order.total}
          </strong>

        </div>

        <div className="timeline">

          <div className="track-step active">

            <span>
              ✓
            </span>

            <div>
              <strong>
                Order Placed
              </strong>

              <small>
                Your order has been placed
              </small>
            </div>

          </div>

          <div className="track-step">

            <span>
              2
            </span>

            <div>
              <strong>
                Confirmed
              </strong>

              <small>
                Order confirmation
              </small>
            </div>

          </div>

          <div className="track-step">

            <span>
              3
            </span>

            <div>
              <strong>
                Shipped
              </strong>

              <small>
                Your package is on the way
              </small>
            </div>

          </div>

          <div className="track-step">

            <span>
              4
            </span>

            <div>
              <strong>
                Delivered
              </strong>

              <small>
                Estimated delivery
              </small>
            </div>

          </div>

        </div>

        <div className="order-box">

          <h2>
            Your Order
          </h2>

          {order.items.map(
            (item) => (

              <div
                className="order-item"
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
                    Quantity:
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

        </div>

        <div className="delivery-box">

          <h2>
            Delivery Address
          </h2>

          <p>
            {order.customer}
          </p>

          <p>
            {order.phone}
          </p>

          <p>
            {order.address}
          </p>

        </div>

      </section>

      {/* <Footer /> */}
    </>
  );
}

export default OderTracking
