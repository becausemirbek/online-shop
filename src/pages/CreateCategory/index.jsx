import React, { useContext, useEffect, useState } from 'react';
import { productsContext } from '../../contexts/productContext';
import './style.css'
import { Button, Modal } from 'react-bootstrap';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [editCategoryName, setEditCategoryName] = useState('');
  const {
    createCategory,
    getCategories,
    categories,
    category,
    getCategoryById,
    handleEditCategory,
    deleteCategory
  } = useContext(productsContext);

  const [show, setShow] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const handleClose = () => {
    setShow(false);
  }

  const handleEdit = (id) => {
    setEditCategory(id);
    setShow(true)
  }

  const handleDelete = async (id) => {
    await deleteCategory(id);
    await getCategories();
  }

  const handleCreate = async () => {
    await createCategory({ name: categoryName })
    await getCategories();
  }

  const handleSubmit = async () => {
    await handleEditCategory(editCategory, { name: editCategoryName });
    await getCategories();
    handleClose();
  }

  useEffect(() => {
    if(category) {
      setEditCategoryName(category.name)
    }
  }, [category])

  useEffect(() => {
    if(editCategory) {
      getCategoryById(editCategory)
    }
  }, [editCategory])

  useEffect(() => {
    getCategories();
  }, [])

  return (
    <>
      <div className='categories'>
        <div>
          <h3>Create Category</h3>
          <input 
            placeholder='Category name'
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button onClick={handleCreate}>Create</button>
        </div>
        <div>
          <h3>All categories</h3>
          {categories ? categories.map(({ name, id }) => (
            <div key={id}>
              {name}
              <Button variant='danger' onClick={() => handleDelete(id)}>Delete</Button>
              <Button variant='warning' onClick={() => handleEdit(id)}>Edit</Button>
            </div>
          )) : 'Empty' }
        </div>
      </div>
        <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input 
              style={{ width: '100%' }}
              type='text' onChange={(e) => setEditCategoryName(e.target.value)} 
              value={editCategoryName}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default CreateCategory;