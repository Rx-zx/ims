import React, { useState } from 'react'
import './LoginSignup.css'
import user_icon from '../../assets/signup_username.png'
import email_icon from '../../assets/login_email.png'
import password_icon from '../../assets/login_password.png'


export const LoginSignup = () => {

  const [action, setAction] = useState("Login");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleLogin = async () => {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Token:', data.token);
      setMessage({ type: 'success', text: 'Login successful!' });
    } else {
      const error = await response.json();
      console.log('Login failed:', error);
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleSignUp = async () => {
    const response = await fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username,email, password })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Token:', data.token);
      setMessage({ type: 'success', text: 'Sign Up successful!' });
    } else {
      const error = await response.json();
      console.log('Login failed:', error);
      setMessage({ type: 'error', text: error.message });
    }
  }

  return (
    <div className='container'>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? <div></div> : <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)}/>
        </div>}
        
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
        </div>
        {action === "Login" ? <div className="forgot-password">Forgot Password <span>Click here!</span></div> : <div></div>}

        <div className="submit-container">
          {action === "Login" ? (
            <div className="submit gray" onClick={handleLogin}>
              Log in
            </div>
          ) : (
            <div className="submit" onClick={() => setAction("Login")}>
              Log in
            </div>
          )}

          <div className={action === "Login" ? "submit gray" : "submit"} onClick={action === "Login" ? () => setAction("SignUp") : handleSignUp}>
            Sign Up
          </div>
        </div>
        {message && (
            <p style={{ color: message.type === 'success' ? 'green' : 'red' }}>{message.text}</p>
          )}
      </div>
    </div>
  )
}
