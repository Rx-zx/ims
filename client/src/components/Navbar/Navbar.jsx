import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="vertical-navbar">
      <ul>
        <li>
        <NavLink to="/dashboard">
            Dashboard
          </NavLink>
        </li>
        <li>
        <NavLink to="/timetable">
            Time Table
          </NavLink>
        </li>
        <li>
        <NavLink to="/student">
            Student
          </NavLink>
        </li>
        <li>
        <NavLink to="/tutor">
            Tutor
          </NavLink>
        </li>
        <li>
        <NavLink to="/staff">
            Staff
          </NavLink>
        </li>
        <li>
        <NavLink to="/report">
            Reports
          </NavLink>
        </li>
        <li>
        <NavLink to="/news">
            News & Updates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

