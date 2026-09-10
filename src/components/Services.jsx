import React from 'react'
import "../styles/services.css"

const Services = () => {
 const services = [
    {
      icon: "🚚",
      title: "Free Delivery",
      text: "On orders above ₹499"
    },
    {
      icon: "🔄",
      title: "Easy Returns",
      text: "15 days return policy"
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      text: "100% secure checkout"
    },
    {
      icon: "💎",
      title: "Original Products",
      text: "100% genuine products"
    }
  ];

  return (
    <section className="services">

      {services.map(
        (service) => (

          <div
            className="service"
            key={service.title}
          >

            <span>
              {service.icon}
            </span>

            <div>

              <h4>
                {service.title}
              </h4>

              <p>
                {service.text}
              </p>

            </div>

          </div>

        )
      )}

    </section>
  );

}

export default Services
