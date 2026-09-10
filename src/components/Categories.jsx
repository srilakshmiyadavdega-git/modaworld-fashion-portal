import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/categories.css"

const Categories = () => {
    const categories = [
    {
      name: "Women",
      icon: "👗",
      link: "/women"
    },
    {
      name: "Men",
      icon: "👔",
      link: "/men"
    },
    {
      name: "Kids",
      icon: "🧒",
      link: "/kids"
    },
    {
      name: "New Arrivals",
      icon: "✨",
      link: "/new-arrivals"
    },
    {
      name: "Sale",
      icon: "🔥",
      link: "/sale"
    }
    

    ]
  return (
   <section className="categories">

      <h2>
        Shop By Category
      </h2>

      <div className="category-grid">

        {categories.map(
          (category) => (

            <Link to={category.link}
              key={category.name}
              className="category-card" >

              <span> {category.icon}</span>

              <h3>{category.name}</h3>

            </Link>

          )
        )}

      </div>

    </section>

  )
}

export default Categories
