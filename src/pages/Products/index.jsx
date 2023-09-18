import React, { useContext, useEffect } from 'react';
import { productsContext } from '../../contexts/productContext';
import CustomCard from '../../components/Card';
import { useSearchParams } from 'react-router-dom';
import './style.css';
import CustomPagination from '../../components/CustomPagination';

const Products = () => {
  const { products, getProducts } = useContext(productsContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getProducts(searchParams.get('search'), searchParams.get('category'));
  }, [searchParams])

  return (
    <div className='products'>
      <h3>Products</h3>
      <div className='product-list'>
        {products ? products.map(item => (
          <CustomCard product={item} />
        )) : 'Empty'}
      </div>
      <CustomPagination />
    </div>
  );
};

export default Products;