import React, { useContext, useEffect, useState } from 'react';
import { productsContext } from '../../contexts/productContext';
import './style.css';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const { 
    getCategories,
    categories,
    getProductById,
    oneProduct,
    editProduct,
  } = useContext(productsContext)
  const { id } = useParams()

  useEffect(() => {
    getCategories();
    getProductById(id);
  },[])

  useEffect(() => {
    if(oneProduct) {
      setName(oneProduct.name);
      setDescription(oneProduct.description);
      setImage(oneProduct.image);
      setPrice(oneProduct.price);
      setSelectedCategory(oneProduct.category);
    }
  }, [oneProduct])

  const handleSubmit = async () => {
    const product = {
      name,
      description,
      price,
      image,
      category: selectedCategory
    }

    await editProduct(product, id);
    navigate('/user-products');

    setName('');
    setDescription('');
    setPrice('');
    setSelectedCategory('');
  }

  return (
    <div className='form-wrapper'>
      <h3>Edit Product</h3>
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
          value={selectedCategory}
        >
          <option>Choose category</option>
          {categories && categories.map(item => (
            <option value={item.name} key={item.id}>{item.name}</option>
          ))}
        </Form.Select>
        <Button onClick={handleSubmit} className="outline-success">Submit</Button>
      </Form>
    </div>
  );
};

export default EditProduct;