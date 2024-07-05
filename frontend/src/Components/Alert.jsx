import React, { useState } from 'react';
import './Alert.css';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

const Alert = ({ title, content,path,setAlert }) => {
  const [showAlert, setShowAlert] = useState(true);
const navigate = useNavigate()
  const toggleAlert = () => {
    setShowAlert(!showAlert);
    setAlert(false);
    navigate(`${path}`)
  };

  return (
    <div>
      {/* <button onClick={toggleAlert}>Show Alert</button> */}
      {showAlert && (
        <div className="backdrop" onClick={toggleAlert}>
          <div className="alert-box" onClick={(e) => e.stopPropagation()}>
            <h2>{title}</h2>
            <p>{content}</p>
            {/* <button onClick={toggleAlert} className='btn btn-primary'>Close</button> */}
            <Button onClick={toggleAlert} variant='contained'>close</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;