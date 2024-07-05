import React, { useState } from 'react';
import './Alert.css';
import Button from "@mui/material/Button";
import { Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Customalert = ({message,severity,setAlert}) => {
  const [showAlert, setShowAlert] = useState(true);
  const toggleAlert = () => {
    setShowAlert(!showAlert);
  };

  if(message === ""){
    return <></>
  }

  return (
    <div>
      {showAlert && (
        <div className="alertback">
          <div className="alertbox m-3" onClick={(e) => e.stopPropagation()}>
            <Alert severity={severity} ><div className='d-flex'><span className='align-items-center px-2'>{message}</span><CloseIcon onClick={toggleAlert}/></div></Alert>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customalert;