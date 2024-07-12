import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {useAuth}  from '../../services/authContex';
import { useNavigate } from 'react-router-dom';
import {Header } from '../Header/Header'
import './Report.css';
import {Navbar} from '../Navbar/Navbar';
import {SectionHeader} from '../SectionHeader/SectionHeader';

export const Report = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    navigate('/login');
  }
  return (
    <div>
      <Header type={'dashboard'} action = {"Logout"}/>
      <Navbar /> 
      <div className='main'>
        <SectionHeader section={'Report'} />
        <p>report page comes here, hii</p>
      </div>
    </div>
  );
};

