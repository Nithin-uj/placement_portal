import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    customcolor: {
      main: '#ff5722', // Custom primary color
      light: '#ff8a50',
      dark: '#c41c00',
      contrastText: '#ffffff',
    }
  }
});

function Registration() {
  const [step,setStep] = useState(1);
  const totalSteps = 3;

  const Render = ()=>{
    switch (step){
      case 1:
        return <Step1/>;
      case 2:
        return <Step2/>;
      case 3:
        return <Step3/>;
      default:
        return <Step1/>;
    }
  }
  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };
  const prevStep = () => {
    setStep(prev => prev - 1);
  };


  const Step1 = ()=>{
    const handelstep1submit = (e) => {
      e.preventDefault();
        nextStep();
    };
    return (
    <form className='container-fluid' onSubmit={handelstep1submit}>
      <div className="row mt-3">
        <TextField className="col" label="USN" variant="outlined"/>
      </div>
      <div className="row mt-3">
        <TextField className="col" label="Email" variant="outlined"/>
      </div>
      <div className="row mt-2 justify-content-end">
        <Button className="col-3" variant="contained" type='submit'>Next</Button>
      </div>
    </form>
    );
  }

  const Step2 = ()=>{
    const handelstep1submit = (e) => {
      e.preventDefault();
        nextStep();
    };
    return (
    <form className='container-fluid' onSubmit={handelstep1submit}>
      <div className="row mt-3">
        <TextField className="col" label="123" variant="outlined"/>
      </div>
      <div className="row mt-3">
        <TextField className="col" label="456" variant="outlined"/>
      </div>
      <div className="row mt-2 justify-content-between">
        <Button className="col-3" variant="outlined" color="warning" onClick={prevStep}>back</Button>
        <Button className="col-3" variant="contained" type='submit'>Next</Button>
      </div>
    </form>
    );
  }

  const Step3 = ()=>{
    const handelstep1submit = (e) => {
      e.preventDefault();
      console.log("Submitted")
    };
    return (
    <form className='container-fluid' onSubmit={handelstep1submit}>
      <div className="row mt-3">
        <TextField className="col" label="pass" variant="outlined"/>
      </div>
      <div className="row mt-3">
        <TextField className="col" label="pass" variant="outlined"/>
      </div>
      <div className="row mt-2 justify-content-between">
        <Button className="col-3" variant="outlined" color="warning" onClick={prevStep}>back</Button>
        <Button className="col-3" variant="contained" type='submit'>Submit</Button>
      </div>
    </form>
    );
  }

  return (
    <ThemeProvider theme={theme}>
    <div className='container-fluid'>
      <div className="row  d-flex align-items-center justify-content-center">
        <div className="col-12 col-xs-4 col-sm-6 col-md-6 col-lg-4">
          <div className="card m-1">
            <div className="card-header d-flex justify-content-center align-items-center fs-5 fw-bold">Registration</div>
            <div className="card-body">
              <div className='d-flex justify-content-center align-items-center fw-bold'>Step {step} of {totalSteps}</div>
              <Render/>
            </div>
        </div>
        </div>
      </div>
    </div>
    </ThemeProvider>
  )
}

export default Registration