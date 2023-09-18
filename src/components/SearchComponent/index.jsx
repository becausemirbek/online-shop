import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { productsContext } from '../../contexts/productContext';

const SearchComponent = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const { getCategories, categories } = useContext(productsContext);

  const onChange = (e) => {
    setSearch(e.target.value);
    searchParams.set('search', e.target.value);
    setSearchParams(searchParams)
  }

  useEffect(() => {
    getCategories();
    if(searchParams.get('search')) {
      setSearch(searchParams.get('search'));
    } else if(searchParams.get('category')){
      setSelectedCategory(searchParams.get('category'))
    }
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
          setSelectedCategory(e.target.value)
        }}
        value={selectedCategory}
      >
        <option value=''>Choose category...</option>
        {categories && categories.map(item => (
          <option value={item.name}>{item.name}</option>
        ))}
      </Form.Select>
    </Form>
  );
};

export default SearchComponent;