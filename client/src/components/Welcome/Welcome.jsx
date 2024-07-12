import React from 'react';
import './Welcome.css'
import { useNavigate } from 'react-router-dom';
import Image from '../../assets/home-bg.jpg';

export const Welcome = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    navigate('/login');
  }
  return (
  <div className='home' style={{ backgroundImage: 'url(' + Image + ')', backgroundSize: 'auto' }}>

    <div className="link-section">
      <ul>
        <li><h1 className="header-name">IMS</h1></li>
        <li><button className="ghost-button-size-transition" onClick={handleLogin}>Log In</button></li>
      </ul>
    </div>
  </div>
  );
};

