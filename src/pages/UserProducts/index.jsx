import React, { useContext, useEffect } from 'react';
import { productsContext } from '../../contexts/productContext';
import CustomCard from '../../components/Card';
import './style.css'

const UserProducts = () => {
  const { products, getProducts, deleteProduct } = useContext(productsContext)

  const onDelete = async (id) => {
    await deleteProduct(id);
    await getProducts();
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className='products'>
      <h3>My Products</h3>
      <div className='product-list'>
        {products ? products.map(item => (
          <CustomCard product={item} isUserProducts onDelete={onDelete} />
        )) : 'Empty'}
      </div>
    </div>
  );
};

export default UserProducts;