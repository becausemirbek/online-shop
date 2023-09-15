import React, { useContext, useEffect } from 'react';
import { productsContext } from '../../contexts/productContext';
import { Button, Card } from 'react-bootstrap';
import './style.css';
import CustomCard from '../../components/Card';
import { useSearchParams } from 'react-router-dom';

const Products = () => {
  const { products, getProducts } = useContext(productsContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getProducts(searchParams.get('search'));
  }, [searchParams])

  return (
    <div className='products'>
      <h3>Products</h3>
      <div className='product-list'>
        {products ? products.map(item => (
          <CustomCard product={item} />
        )) : 'Empty'}
      </div>
    </div>
  );
};

export default Products;