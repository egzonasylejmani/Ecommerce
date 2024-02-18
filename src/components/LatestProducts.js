import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import ProductCard from "./ProductCard";

function LatestProducts() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("jewelery"); // Default category

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/category/${selectedCategory}`)
      .then((response) => {
        setLatestProducts(response.data);
      });
  }, [selectedCategory]); // Add selectedCategory as a dependency
  return (
    <div>
      <Container className="my-5">
        <select
          class="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="jewelery">Jewelry</option>
          <option value="electronics">Electronics</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
        <div className="row my-5">
          <section className="product-section">
            <div className="product-grid">
              {latestProducts &&
                latestProducts.map((product) => <ProductCard data={product} />)}
            </div>
          </section>
        </div>
        <div className="d-flex justify-content-center">
          <Link to="/shop" className="btn btn-sm btn-outline-primary">
            Explore more <i className="bi bi-arrow-right"></i>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default LatestProducts;
