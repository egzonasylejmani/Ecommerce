import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

function Jewelry() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [query, setQuery] = useState('')
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/category/jewelery`)
      .then((response) => {
        setLatestProducts(response.data);
      });
  },); // Add selectedCategory as a dependency
  useEffect(() => {
    const lowercaseQuery = query.toLowerCase().trim();
    const filtered = latestProducts.filter(order => order.title.toLowerCase().includes(lowercaseQuery));
    setFilteredOrders(filtered);
  }, [query, latestProducts]);

  // This function handles the search input
  const handleSearch = e => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <Container className="my-5">
        <div className="container" style={{width: '35%'}}>
          <input type="text" placeholder='Search by title...' onKeyUp={handleSearch} className="form-control" />
        </div>
        <div className="row my-5">
          <section className="product-section">
            <div className="product-grid">
              {filteredOrders &&
                filteredOrders.map((product) => <ProductCard data={product} />)}
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

export default Jewelry;
