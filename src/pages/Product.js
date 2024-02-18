import { useLocalStorage } from "@uidotdev/usehooks";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [favourites, setFavourites] = useLocalStorage("favourites");
  const [cart, setCart] = useLocalStorage("cart");
  const [qty, setQty] = useState(1);
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [setProduct]);

  const handleAddToCart = (e) => {
    if (cart === undefined) {
      setCart([{ ...product, qty: qty }]);
    } else {
      if (cart.filter((item) => item.id == product.id).length) {
        setCart(
          cart.map((item) => {
            if (item.id == product.id) return { ...item, qty: item.qty + qty };
          })
        );
      } else {
        setCart([...cart, { ...product, qty: qty }]);
      }
    }
    alert(`${product.title} was added to cart`);
    setQty(1);
  };
  const handleAddToFavourites = (e) => {
    if (favourites === undefined) setFavourites([product]);
    else {
      if (favourites.filter((fm) => fm.id == id).length > 0)
        alert(`${product.title} is already in your favourites!`);
      else setFavourites([...favourites, product]);
      alert(`${product.title} was added to your favourites!`);
    }
  };

  return (
    <>
      <div className="container my-5">
        {product && (
          <div className="row">
            <div className="col-md-5">
              <div className="main-img">
                <img className="img-fluid" src={product.image} alt="ProductS" />
              </div>
            </div>
            <div className="col-md-7">
              <div className="main-description px-2">
                <div className="category text-bold">{product.category}</div>
                <div className="product-title text-bold my-3">
                  {product.title}
                </div>

                <div className="price-area my-4">
                  <p className="old-price mb-1">
                    <del>{product.price}</del>{" "}
                    <span className="old-price-discount text-danger">
                      (20% off)
                    </span>
                  </p>
                  <p className="new-price text-bold mb-1">{product.price}</p>
                </div>

                <div className="buttons d-flex my-5">
                  <div className="block">
                    <button
                      onClick={handleAddToFavourites}
                      className="shadow btn custom-btn "
                    >
                      Wishlist
                    </button>
                  </div>
                  <div className="block">
                    <button
                      onClick={handleAddToCart}
                      className="shadow btn custom-btn"
                    >
                      Add to cart
                    </button>
                  </div>

                  <div className="block quantity">
                    <input
                      value={qty} onChange={(e) => setQty(parseInt(e.target.value))}
                      type="number"
                      className="form-control"
                      id="cart_quantity"
                      min="0"
                      max="5"
                      name="cart_quantity"
                    />
                  </div>
                </div>
              </div>

              <div className="product-details my-4">
                <p className="details-title text-color mb-1">Product Details</p>
                <p className="description">{product.description}</p>
              </div>

              <div className="delivery my-4">
                <p className="font-weight-bold mb-0">
                  <span>
                    <i className="fa-solid fa-truck"></i>
                  </span>{" "}
                  <b>Delivery done in 3 days from date of purchase</b>{" "}
                </p>
                <p className="text-secondary">
                  Order now to get this product delivery
                </p>
              </div>
              <div className="delivery-options my-4">
                <p className="font-weight-bold mb-0">
                  <span>
                    <i className="fa-solid fa-filter"></i>
                  </span>{" "}
                  <b>Delivery options</b>{" "}
                </p>
                <p className="text-secondary">View delivery options here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Product;
