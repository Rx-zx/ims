import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import './Header.scss';
import logo_icon from '../../assets/logo.png'



export const Header = ({type ,action}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const link = type === "welcome" ? "/" : "/dashboard";

  return (
    <header className="fixed-header">
      <div className="logo">
        <Link to={link}>
          <img src={logo_icon} alt="Logo" />
        </Link> 
      </div>
      { (
        <div className="logout-btn">
          <button className="btn btn-primary btn-ghost btn" onClick={handleLogout}>{action}</button>
        </div>
      )}
    </header>
  );
};


