import axios from 'axios';
import React, { useReducer } from 'react';

export const productsContext = React.createContext();
const API = 'http://localhost:8000'

const INIT_STATE = {
  products: [],
  pages: 0,
  categories: [],
  category: null,
  oneProduct: null,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return {
        ...state,
        categories: action.payload
      }
      case 'GET_CATEGORY': 
      return {
        ...state,
        category: action.payload
      }
    default:
      return state;
  }
}

const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const createCategory = async (category) => {
    try {
      await axios.post(`${API}/categories`, category)
      alert('category created');
    } catch (error) {
      console.log(error);
    }
  }

  const getCategories = async () => {
    try {
      const { data } = await axios(`${API}/categories`);
      dispatch({
        type: 'GET_CATEGORIES',
        payload: data,
      })
    } catch (error) {
      console.log(error);
    }
  }

  const getCategoryById = async (id) => {
    try {
      const { data } = await axios(`${API}/categories/${id}`);
      dispatch({
        type: 'GET_CATEGORY',
        payload: data,
      })
    } catch (error) {
      console.log(error);
    }
  }

  const handleEditCategory = async (id, data) => {
    await axios.patch(`${API}/categories/${id}`, data)
  }

  return (
    <productsContext.Provider
      value={{
        products: state.products,
        pages: state.pages,
        categories: state.categories,
        oneProduct: state.oneProduct,
        category: state.category,
        createCategory,
        getCategories,
        getCategoryById,
        handleEditCategory
      }}
    >
      {children}
    </productsContext.Provider>
  );
};
export default ProductsContextProvider;
//CORS