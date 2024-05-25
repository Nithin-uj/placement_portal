import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home'
import Studetlogin from './Studentlogin'
import Adminlogin from './Adminlogin'
import Register from './Register.jsx'
import Main from './Main';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/student-login" element={<Studetlogin/>}></Route>
        <Route path="/admin-login" element={<Adminlogin/>}></Route>
        <Route path="/main" element={<Main/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
