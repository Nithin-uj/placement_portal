import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home'
import Studetlogin from './Components/Studentlogin'
import Adminlogin from './Components/Adminlogin'
import Register from './Components/Register.jsx'
import Admin from './Admincomponents/Admin.jsx';
import Main from './Components/Main';
import Student from './Studentcomponents/Student.jsx'
import Company from './Companycomponents/Company.jsx';
import Notfound from './Notfound.jsx'
import './custom.scss'; 
function App() {

  return (
    <BrowserRouter>
      <Routes>Student R
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/student-login" element={<Studetlogin/>}></Route>
        <Route path="/admin-login" element={<Adminlogin/>}></Route>
        <Route path="/student" element={<Student/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/company" element={<Company/>}></Route>
        <Route path="/main" element={<Main/>}></Route>
        <Route path="*" element={<Notfound/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
