import React from 'react';
import './Message.css';

export const Message = ({ type, text, onClose }) => {
  return (
    <div className={`message ${type}`}>
      <button className="close-btn" onClick={onClose}>&times;</button>
      <p>{text}</p>
    </div>
  );
};

