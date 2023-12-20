
import React, { useState } from 'react'
import './LoginSignup.css'
import email_icon from '../../assets/login_email.png'
import password_icon from '../../assets/login_password.png'
import { useNavigate } from 'react-router-dom';


export const LoginSignup = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();


  const handleLogin = async () => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Token:', data.token);
      setMessage({ type: 'success', text: 'Login successful!' });
      const authToken = data.token;
      localStorage.setItem('authToken', authToken);
      navigate('/dashboard');
    } else {
      const error = await response.json();
      console.log('Login failed:', error);
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className='container'>
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required onKeyDown={handleKeyDown}/>
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required onKeyDown={handleKeyDown}/>
        </div>
        <div className="forgot-password">Forgot Password <span>Click here!</span></div>
        <div className="submit-container">
          <div className="submit" onClick={ handleLogin} >
            Log In
          </div>
        </div>
        {message && (
            <p style={{ color: message.type === 'success' ? 'green' : 'red' }}>{message.text}</p>
          )}
      </div>
    </div>
  )
}