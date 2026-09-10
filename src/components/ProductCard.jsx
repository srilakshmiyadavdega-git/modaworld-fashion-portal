import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";

import "../styles/productcard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Get wishlist items from Redux
  const wishlist = useSelector(
    (state) => state.wishlist.items
  );

  // Check whether current product is in wishlist
  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  // Calculate discount percentage
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(
          ((product.oldPrice - product.price) /
            product.oldPrice) *
            100
        )
      : 0;

  // Add product to cart
  const handleCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-card">

      {/* Product Image */}
      <div className="product-image">

        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
          />
        </Link>

        {/* Discount */}
        {discount > 0 && (
          <span className="discount">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          className={
            isWishlisted
              ? "heart active"
              : "heart"
          }
          onClick={() =>
            dispatch(toggleWishlist(product))
          }
          aria-label="Toggle wishlist"
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

      </div>

      {/* Product Information */}
      <div className="product-info">

        {/* Category */}
        <small>
          {product.category}
        </small>

        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3>
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="rating">
          ⭐ {product.rating}
        </div>

        {/* Price */}
        <div className="price">

          <strong>
            ₹{product.price}
          </strong>

          {product.oldPrice && (
            <del>
              ₹{product.oldPrice}
            </del>
          )}

        </div>

        {/* Add To Cart */}
        <button
          type="button"
          className="add-button"
          onClick={handleCart}
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
};

export default ProductCard;

