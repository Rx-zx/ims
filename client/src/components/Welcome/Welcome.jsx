import React from 'react';
import {Header } from '../Header/Header'
import './Welcome.css'
import email_icon from '../../assets/header.jpeg'
import { useNavigate } from 'react-router-dom';

export const Welcome = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    navigate('/login');
  }
  return (
  <div className='home'>

    <div className="link-section">
      <ul>
        <li><h1 className="header-name">IMS</h1></li>
        <li><button className="ghost-button-size-transition" onClick={handleLogin}>Log In</button></li>
      </ul>
    </div>

    <div className="image-section">
      <img src={email_icon} alt=''/>
    </div>

    <div id="section1" className="image-section">
      <img src={email_icon} alt=''/>
    </div>

    <div id="section2" className="image-section">
      <img src={email_icon} alt=''/>
    </div>

    <div id="section3" className="image-section">
      <img src={email_icon} alt=''/>
    </div>
  </div>
  );
};

