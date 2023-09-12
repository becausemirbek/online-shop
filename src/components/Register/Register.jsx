import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate();

  const { loading, error, handleRegister } = useContext(authContext)
 
  const handleSubmit = () => {
    if(!email.trim() || !password.trim() || !confirmPassword.trim()) {
      alert("Заполните поля!");
    } else {
      const user = {
        email,
        password,
        password_confirm: confirmPassword
      }
  
      handleRegister(user, navigate);
    };
  };

  return (
    <div>
      <h1>Register</h1>
      <div>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <input
          type="password" onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Sign up</button>
      </div>
    </div>
  )
};

export default Register;