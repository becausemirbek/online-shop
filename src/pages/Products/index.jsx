import React, { useContext, useEffect } from 'react';
import { productsContext } from '../../contexts/productContext';
import { Button, Card } from 'react-bootstrap';
import './style.css';

const Products = () => {
  const { products, getProducts } = useContext(productsContext);

  useEffect(() => {
    getProducts();
  }, [])

  console.log(products, 'prod')

  return (
    <div className='products'>
      <h3>Products</h3>
      <div className='product-list'>
        {products ? products.map(item => (
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                Category: {item.category}
              </Card.Text>
              <Card.Text>
                Price: ${item.price}
              </Card.Text>
              <Button variant="primary">Details</Button>
            </Card.Body>
          </Card>
        )) : 'Empty'}
      </div>
    </div>
  );
};

export default Products;