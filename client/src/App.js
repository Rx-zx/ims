import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import { LoginSignup } from "./components/LoginSignup/LoginSignup";
import { Dashboard } from './components/Dashboard/Dashbaord';
// import { NavigationBar} from './components/Dashboard/NavigationBar';


function App() {
return (
  <Router>
    <Routes>
    <Route path="/login" element={<LoginSignup />} />
    <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);
}

export default App