import React, { useContext, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import { productsContext } from '../../contexts/productContext';
import { getPageCount } from './helper';

const CustomPagination = () => {
  const { pages } = useContext(productsContext);

  useEffect(() => {
    getPageCount(pages);
  }, [])

  return (
    <Pagination>
      <Pagination.Prev onClick={() => console.log('prev')} />
      {getPageCount(pages).map(item => (
        <Pagination.Item>{item}</Pagination.Item>
      ))}
      <Pagination.Next onClick={() => console.log('next')} />
    </Pagination>
  );
};

export default CustomPagination;