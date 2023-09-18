import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import { Button, Form } from 'react-bootstrap';
import { productsContext } from '../../contexts/productContext';

const CreateProduct = () => {
  const {
    getCategories,
    categories,
    createProduct 
  } = useContext(productsContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    getCategories();
  },[])

  const handleSubmit = async () => {
    const product = {
      name,
      description,
      price,
      image,
      category: selectedCategory
    }

    await createProduct(product);
    
    setName('');
    setDescription('');
    setPrice('');
    setImage('');
    setSelectedCategory('');
  }

  return (
    <div className='form-wrapper'>
      <h3>Create Product</h3>
      <Form>
        <Form.Control 
          type='text'
          placeholder='Ввеедите название'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Form.Control 
          type='text'
          placeholder='Введите описание'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Form.Control 
          type='text'
          placeholder='Цена'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Form.Control 
          type='text'
          placeholder='Вставьте ссылку'
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Form.Select
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option>Choose category</option>
          {categories && categories.map(item => (
            <option value={item.id} key={item.id}>{item.name}</option>
          ))}
        </Form.Select>
        <Button onClick={handleSubmit} className="outline-success">Submit</Button>
      </Form>
    </div>
  );
};

export default CreateProduct;