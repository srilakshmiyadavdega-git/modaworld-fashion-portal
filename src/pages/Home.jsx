import React from 'react'
import "../styles/home.css"
import { useEffect,useMemo,useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Categories from '../components/Categories.jsx'
import ProductCard from '../components/ProductCard.jsx'
import Footer from '../components/Footer.jsx'
import { getProducts } from '../services/api.js'


const Home = () => {
  const [products, setProducts] =
    useState([]);

  const [searchParams] =
    useSearchParams();

  const [category, setCategory] =
    useState("All");

  const [sort, setSort] =
    useState("default");

  const search =
    searchParams.get("search") || "";

  useEffect(() => {

    getProducts()
      .then((response) => {

        setProducts(
          response.data
        );

      })
      .catch(() => {

        console.log(
          "API server is not running"
        );

      });

  }, []);

  const filteredProducts =
    useMemo(() => {

      let result =
        products.filter(
          (product) => {

            const searchMatch =
              product.name
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                );

            const categoryMatch =
              category === "All" ||
              product.category ===
                category;

            return (
              searchMatch &&
              categoryMatch
            );
          }
        );

      if (sort === "low") {

        result.sort(
          (a, b) =>
            a.price - b.price
        );

      }

      if (sort === "high") {

        result.sort(
          (a, b) =>
            b.price - a.price
        );

      }

      return result;

    }, [
      products,
      search,
      category,
      sort
    ]);

  return (
    <>
      {/* <Navbar /> */}

      <Hero />

      <Categories />

      <section className="home-products">

        <div className="section-heading">

          <div>

            <h2>
              Explore Fashion
            </h2>

            <p>
              Latest styles just for you
            </p>

          </div>

          <div className="filters">

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
            >

              <option value="All">
                All Categories
              </option>

              <option value="Women">
                Women
              </option>

              <option value="Men">
                Men
              </option>

              <option value="Kids">
                Kids
              </option>

            </select>

            <select
              value={sort}
              onChange={(e) =>
                setSort(
                  e.target.value
                )
              }
            >

              <option value="default">
                Sort By
              </option>

              <option value="low">
                Price Low → High
              </option>

              <option value="high">
                Price High → Low
              </option>

            </select>

          </div>

        </div>

        {filteredProducts.length > 0 ? (

          <div className="products-grid">

            {filteredProducts.map(
              (product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              )
            )}

          </div>

        ) : (

          <div className="empty-results">

            <h2>
              No Products Found 😔
            </h2>

            <p>
              Try another search.
            </p>

          </div>

        )}

      </section>

      {/* <Footer /> */}

    </>
  );
}

export default Home
