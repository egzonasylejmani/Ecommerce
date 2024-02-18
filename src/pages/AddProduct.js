import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import axios from "axios";
import React, { useState } from 'react';


function AddProduct() {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        category: ''
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('https://fakestoreapi.com/products', formData);
          console.log(response.data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
  return (
    <div>
      <Container className="my-5">
        <div className="card w-50 p-4 mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" placeholder="Price" />
            </Form.Group>
        
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="description" 
              name="price"
              value={formData.price}
              onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control 
              type="text" 
              placeholder="Image" 
              name="description"
              value={formData.description}
              onChange={handleChange}
              />
            </Form.Group>
        
            <Form.Group className="mb-3" controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text" 
                placeholder="Category" 
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>
        
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default AddProduct;
