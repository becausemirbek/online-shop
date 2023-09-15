import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { productsContext } from '../../contexts/productContext';

const SearchComponent = () => {
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const { getCategories, categories } = useContext(productsContext);

  const onChange = (e) => {
    setSearch(e.target.value);
    setSearchParams({ search: e.target.value })
  }

  useEffect(() => {
    getCategories();
  }, [])

  return (
    <Form className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={search}
        onChange={onChange}
      />
      <Form.Select 
        style={{ width: '100px' }}
        onChange={(e) => {
          searchParams.set('category', e.target.value)
          setSearchParams(searchParams)
        }}
      >
        <option>Choose category...</option>
        {categories && categories.map(item => (
          <option value={item.id}>{item.name}</option>
        ))}
      </Form.Select>
    </Form>
  );
};

export default SearchComponent;