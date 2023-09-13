import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
// user
import Loader from './components/Loader/Loader';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import RegisterSuccess from './components/RegisterSuccess/RegisterSuccess';
// product
import CreateCategory from './pages/CreateCategory';
import CreateProduct from './pages/CreateProduct';
import Products from './pages/Products';

const PrivateRoutes = () => {
  const user = localStorage.getItem('email')

  return user ? <Outlet /> : <Navigate to='/login' />
}

const Routing = () => {
  return (
    <Routes>
        {/* users routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* products routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="*" element={<Loader />} />
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path='/create-product' element={<CreateProduct />} />
          <Route path='/products' element={<Products />} />
        </Route>
    </Routes>
  )
}

export default Routing