import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {useAuth}  from '../../services/authContex';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const { isAuthenticated,logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    console.log(isAuthenticated);
    if (!isAuthenticated) {
      navigate('/login');
    }
    
    const fetchData = async () => {
      try {
        const response = await api.get('/api/user/all');
        if (response.status === 200) {
          
          const result = await response.data;
          setData(result.data);
        } else {
          setData([]);
          console.error('Failed to fetch data');
        }
      } catch (error) {
        setData([]);
        console.error('Error during data fetch:', error);
      }


    };

    fetchData();
  }, []);

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h2>Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.username}</td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
};
