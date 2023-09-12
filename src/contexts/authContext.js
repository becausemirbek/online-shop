import axios from 'axios';
import React, { useState } from 'react';

export const authContext = React.createContext();
const API = 'http://34.173.115.25/api/v1';

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleRegister = async (user, navigate) => {
    setLoading(true);
    try {
      await axios.post(`${API}/account/register/`, user)
      navigate('/login')
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (user, navigate) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/account/login/`, user);
      localStorage.setItem('tokens', JSON.stringify(data));
      localStorage.setItem('email', user.email);
      navigate('/')
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = (navigate) => {
    localStorage.removeItem('tokens');
    localStorage.removeItem('email');
    navigate('/login');
  }

  return (
    <authContext.Provider
      value={{
        handleRegister,
        loading,
        error,
        handleLogin,
        handleLogout
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export default AuthContextProvider;
