import React from 'react'
import "../styles/productdetails.css"
import { useEffect,useState } from 'react'  
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from "../components/Navbar"
import { getProduct } from '../services/api'
import { addToCart } from "../redux/slices/cartSlice"



const ProductDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [product, setProduct] =
    useState(null);

  const [size, setSize] =
    useState("M");

  const wishlist =
    useSelector(
      (state) =>
        state.wishlist.items
    );

  const isWishlisted =
    wishlist.some(
      (item) =>
        item.id === Number(id)
    );

  useEffect(() => {

    getProduct(id)
      .then((res) =>
        setProduct(
          res.data
        )
      )
      .catch(() =>
        setProduct(null)
      );

  }, [id]);

  if (!product) {

    return (
      <>
        {/* <Navbar /> */}

        <div className="not-found">

          <h2>
            Product Not Found
          </h2>

        </div>
      </>
    );
  }

  const addProduct = () => {

    dispatch(
      addToCart({
        ...product,
        size
      })
    );

    navigate("/cart");
  };

  return (
    <>
      {/* <Navbar /> */}

      <section className="details-page">

        <div className="details-image">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>

        <div className="details-content">

          <p className="details-category">
            {product.category}
          </p>

          <h1>
            {product.name}
          </h1>

          <div className="details-rating">
            ⭐ {product.rating} / 5
          </div>

          <div className="details-price">

            ₹{product.price}

            <del>
              ₹{product.oldPrice}
            </del>

          </div>

          <p className="description">
            {product.description}
          </p>

          <h4>
            Select Size
          </h4>

          <div className="sizes">

            {["S", "M", "L", "XL"].map(
              (item) => (

                <button
                  key={item}
                  className={
                    size === item
                      ? "selected"
                      : ""
                  }
                  onClick={() =>
                    setSize(item)
                  }
                >
                  {item}
                </button>

              )
            )}

          </div>

          <div className="details-buttons">

            <button
              className="add-cart"
              onClick={addProduct}
            >
              🛒 Add To Cart
            </button>

            <button
              className="wishlist-detail"
              onClick={() =>
                dispatch(
                  toggleWishlist(product)
                )
              }
            >
              {isWishlisted
                ? "♥ Saved"
                : "♡ Wishlist"}
            </button>

          </div>

          <div className="features">

            <div>
              🚚
              <span>
                Free Delivery
              </span>
            </div>

            <div>
              🔄
              <span>
                Easy Returns
              </span>
            </div>

            <div>
              🔒
              <span>
                Secure Payment
              </span>
            </div>

          </div>

        </div>

      </section>
    </>
  );
}

export default ProductDetails
