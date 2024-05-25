import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";

const theme = createTheme({
  palette: {
    customcolor: {
      main: "#ff5722", // Custom primary color
      light: "#ff8a50",
      dark: "#c41c00",
      contrastText: "#ffffff",
    },
  },
});

function Registration() {
  const [step, setStep] = useState(3);
  const totalSteps = 4;
  const [formdata, setFormdata] = useState({
    usn: "",
    email: "",
    fullname: null,
    dob: null,
    gender: null,
    pphno: null,
    sphno: null,
    presentaddr: null,
    permanentaddr: null,
    bepassingyear: null,
    ccgpa: null,
    branch: null,
    syear: null,
    ssem: null,
    section: null,
    etype : null,
    twelfthpyear : null,
    twelfthper : null,
    diplomapyear : null,
    diplomaper : null,
    tenthpyear : null,
    tenthper : null,
    backlog : null,
    cpassword : null
  });

  const [password,setPassword] = useState('');

  const [errors,setErrors] = useState({
    usn : "",
    emial : "",
    dob : ""
  });

  const [haveerrors,setHaveerrors] = useState(false);

  const nextStep = () => {
    if(step === 1){
      // console.log(!!!errors.usn && !!!errors.email);
      if(!!!errors.usn && !!!errors.email){
        setHaveerrors(false);
       setStep((prevStep) => prevStep + 1);
      }
      else{
        setHaveerrors(true);
      }
    }
    if(step===2){
      if(!!!errors.dob && !!!errors.pphno && !!!errors.sphno){
        setHaveerrors(false);
       setStep((prevStep) => prevStep + 1);
      }
      else{
        setHaveerrors(true);
      }
    }
    if(step===3){
      if(!!!errors.bepassingyear && !!!errors.ccgpa && !!!errors.twelfthper && !!!errors.twelfthpyear && !!!errors.diplomaper && !!!errors.diplomapyear && !!!errors.tenthper && !!!errors.tenthpyear ){
        setHaveerrors(false);
       setStep((prevStep) => prevStep + 1);
      }
      else{
        setHaveerrors(true);
      }
    }
    if(step===4){
      if(!!!errors.cpassword){
        setHaveerrors(false);
        alert("Submitted")
      }
      else{
        setHaveerrors(true);
      }
    }
  };
  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handelstep1submit = (e) => {
    e.preventDefault();
    nextStep();
  };
  const handelstep2submit = (e) => {
    e.preventDefault();
    nextStep();
  };
  const handelstep3submit = (e) => {
    e.preventDefault();
    nextStep();
  };
  const handelstep4submit = (e) => {
    e.preventDefault();
    nextStep();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(name,value);
    setFormdata({ ...formdata, [name]: value });
    setHaveerrors(false);
    // console.table(errors)

    if(name === 'usn'){
        const pattern = /^[4][N][I][2][1-4][A-Z]{2}[0-9]{3}$/;
        if(!pattern.test(value)){
        setErrors({...errors,usn:"Invalid USN"});
        }
        else{
        setErrors({...errors,usn:""});
        }
    }
    if(name === 'email'){
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(!pattern.test(value)){
      setErrors({...errors,[name]:"Invalid Email"});
      }
      else{
      setErrors({...errors,[name]:""});
      }
    }
    if(name === "pphno"){
      const phpattern = /^[0-9]{10}$/
      if(!phpattern.test(value)){
        setErrors({...errors,[name]:"Invalid Primary Phone no."});
      }
      else{
      setErrors({...errors,[name]:""});
      }
    }
    if(name === "sphno"){
      const sphpattern = /^[0-9]{10}$/
      if(value.length>0 && !sphpattern.test(value)){
        setErrors({...errors,[name]:"Invalid Secondary Phone no."});
      }
      else{
      setErrors({...errors,[name]:""});
      }
    }
    if(name === "bepassingyear"){
      const yearpattern = /^[2][0][2][4-7]$/
      if(!yearpattern.test(value)){
        setErrors({...errors,[name]:"Only [2024 - 2027] is valid"});
        }
        else{
          setErrors({...errors,[name]:""});
        }
    }
    if(name === "ccgpa"){
      const ccgpapattern = /[^0-9,.]/g;
        if(value < 0 || value >10.0){
          setErrors({...errors,[name]:"Invalid B.E CGPA"});
        }
        else if(ccgpapattern.test(value)){
          setErrors({...errors,[name]:"Invalid B.E CGPA"});
        }
        else{
          setErrors({...errors,[name]:""});
      }
    }
    if(name === "syear"){
      setFormdata({...formdata,syear: value, ssem : ''});
    }
    if(name === "etype"){
      setFormdata({...formdata,etype: value, twelfthpyear : '', twelfthper:'',diplomapyear:'',diplomaper:''});
    }
    if(name === "twelfthpyear" || name === "diplomapyear" || name === "tenthpyear"){
      const yearpattern = /^\d{4}$/;
      if(!yearpattern.test(value)){
        setErrors({...errors,[name]:"Please enter proper year"});
      }
      else{
        setErrors({...errors,[name]:""});
      }
    }
    if(name === "twelfthper" || name === "diplomaper" || name === "tenthper" ){
      const perpattern = /[^0-9,.]/g;
      if(value<=10 || value >100){
        setErrors({...errors,[name]:"Please enter in percentage"});
      }
      else if(perpattern.test(value)){
        setErrors({...errors,[name]:"Special characters and alphabets are not allowed in percentage"});
      }
      else{
        setErrors({...errors,[name]:""});
      }
    }
    // console.table(errors)
  };

  const handleDateChange = (date) => {
    setHaveerrors(false);
    // console.log(date);
    // const year = date["$y"];
    // const month = date["$M"] + 1; // Convert to human-readable month (0-indexed)
    // const day = date["$D"];
    // console.log(year+"-"+month+"-"+day)
    setFormdata({ ...formdata, dob: date });
    // console.log(date["$d"]);
    if(date["$d"] == "Invalid Date"){
      setErrors({...errors,dob:"Invalid Date of birth"});
    }
    else{
      setErrors({...errors,dob:""});
    }
    // console.table(errors);
  };

  const handlepasswordChange = (e)=>{
    setHaveerrors(false);
    if(e.target.name === "password"){
      setPassword(e.target.value);
      setFormdata({...formdata, cpassword:''});
    }
    if(e.target.name === "cpassword"){
      setFormdata({...formdata, cpassword:e.target.value});
      if(password === e.target.value){
        setErrors({...errors,cpassword:""});
      }
      else{
        setErrors({...errors,cpassword:"Password not matching"});
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="container-fluid">
        <div className="row  d-flex align-items-center justify-content-center">
          <div className="col-12 col-xs-4 col-sm-6 col-md-6 col-lg-4">
            <div className="card m-1">
              <div className="card-header d-flex justify-content-center align-items-center fs-5 fw-bold">
                Registration
              </div>
              <div className="card-body p-0">
                <div className="d-flex justify-content-center align-items-center fw-bold mt-1">
                  Step {step} of {totalSteps}
                </div>
                {step === 1 && (
                  <form
                    className="container-fluid"
                    onSubmit={handelstep1submit}
                  >
                    {haveerrors && <Alert severity="error">
                        <div>{errors.usn}</div>
                        <div>{errors.email}</div>
                       </Alert>}
                    <div className="row mx-1 mt-3">
                      <TextField
                        className="col"
                        label="USN"
                        variant="outlined"
                        name="usn"
                        error={!!errors.usn}
                        helperText={errors.usn}
                        value={formdata.usn}
                        // required
                        onChange={handleInputChange}                        
                      />
                    </div>
                    <div className="row mx-1 mt-3">
                      <TextField
                        className="col"
                        label="Email"
                        variant="outlined"
                        name="email"
                        error={!!errors.email}
                        helperText={errors.email}
                        value={formdata.email}
                        // required
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="row mt-2 justify-content-end">
                      <Button
                        className="col-3 m-3"
                        variant="contained"
                        type="submit"
                        // disabled
                      >
                        Next
                      </Button>
                    </div>
                  </form>
                )}
                {step === 2 && (
                  <form
                    className="container-fluid"
                    onSubmit={handelstep2submit}
                  >{haveerrors && <Alert severity="error">
                  <div>{errors.dob}</div>
                  <div>{errors.pphno}</div>
                  <div>{errors.sphno}</div>
                 </Alert>}
                    <div className="row mx-1 mt-2">
                      <TextField
                        className="col"
                        label="Full Name"
                        variant="outlined"
                        name="fullname"
                        value={formdata.fullname}
                        onChange={handleInputChange}
                        // required
                      />
                    </div>
                    <div className="row mt-2" style={{ padding: "5px" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DateField"]}>
                          <DateField
                            label="Date of birth"
                            format="DD/MM/YYYY"
                            name="dob"
                            value={formdata.dob}
                            onChange={handleDateChange}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                    <div className="row mx-1 mt-3">
                      <FormControl fullWidth>
                        <InputLabel id="gender-select">Gender</InputLabel>
                        <Select
                          labelId="gender-select"
                          value={formdata.gender}
                          name="gender"
                          label="Gender"
                          // required
                          onChange={handleInputChange}
                        >
                          <MenuItem value={"M"}>Male</MenuItem>
                          <MenuItem value={"F"}>Female</MenuItem>
                          <MenuItem value={"O"}>Others</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="row mx-1 mt-3">
                      <TextField
                        className="col"
                        label="Primary phone no."
                        variant="outlined"
                        name="pphno"
                        value={formdata.pphno}
                        error={!!errors.pphno}
                        helperText={errors.pphno}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="row mx-1 mt-3">
                      <TextField
                        className="col"
                        label="Secondary phone no. (optional)"
                        name="sphno"
                        value={formdata.sphno}
                        error={!!errors.sphno}
                        helperText={errors.sphno}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </div>
                    <div className="row mx-1 mt-3">
                      <TextField
                        className="col"
                        label="Present address"
                        name="presentaddr"
                        multiline
                        maxRows={4}
                        value={formdata.presentaddr}
                        error={!!errors.presentaddr}
                        helperText={errors.presentaddr}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </div>
                    <div className="row mx-1 mt-3">
                      <TextField
                        className="col"
                        label="Permanent address"
                        name="permanentaddr"
                        multiline
                        maxRows={4}
                        value={formdata.permanentaddr}
                        error={!!errors.permanentaddr}
                        helperText={errors.permanentaddr}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </div>
                    <div className="row m-1 my-3 justify-content-between">
                      <Button
                        className="col-3"
                        variant="outlined"
                        color="warning"
                        onClick={prevStep}
                      >
                        back
                      </Button>
                      <Button
                        className="col-3"
                        variant="contained"
                        type="submit"
                      >
                        Next
                      </Button>
                    </div>
                  </form>
                )}
                {step === 3 && (
                  <form
                    className="container-fluid"
                    onSubmit={handelstep3submit}
                  >
                    {haveerrors && <Alert severity="error">
                  <div>{errors.bepassingyear}</div>
                  <div>{errors.ccgpa}</div>
                  <div>{errors.twelfthper}</div>
                  <div>{errors.twelfthpyear}</div>
                  <div>{errors.diplomaper}</div>
                  <div>{errors.diplomapyear}</div>
                  <div>{errors.tenthper}</div>
                  <div>{errors.tenthpyear}</div>
                 </Alert>}
                    <div className="row mx-1 mt-3">
                      <TextField
                        className="col"
                        label="B.E passing year"
                        value={formdata.bepassingyear}
                        name="bepassingyear"
                        error={!!errors.bepassingyear}
                        helperText={errors.bepassingyear}
                        onChange={handleInputChange}
                        variant="outlined"
                      />
                    </div>
                    <div className="row mx-1 mt-3">
                      <TextField
                        className="col"
                        label="Current CGPA (eg: 8.85)"
                        type="float"
                        name="ccgpa"
                        error={!!errors.ccgpa}
                        helperText={errors.ccgpa}
                        value={formdata.ccgpa}
                        // required
                        onChange={handleInputChange}   
                        variant="outlined"
                      />
                    </div>
                    <div className="row mx-1 mt-3">
                      <FormControl fullWidth>
                        <InputLabel id="branch-select">Branch</InputLabel>
                        <Select
                          labelId="branch-select" 
                          value={formdata.branch}
                          name="branch"
                          onChange={handleInputChange}
                          label="Branch"
                          required
                        >
                          <MenuItem value={"AIML"}>AIML</MenuItem>
                          <MenuItem value={"CSE"}>CSE</MenuItem>
                          <MenuItem value={"ISE"}>ISE</MenuItem>
                          <MenuItem value={"ECE"}>ECE</MenuItem>
                          <MenuItem value={"EEE"}>EEE</MenuItem>
                          <MenuItem value={"ME"}>ME</MenuItem>
                          <MenuItem value={"CV"}>CV</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="row mx-1 mt-3">
                      <FormControl fullWidth>
                        <InputLabel id="syear-select">Studying year</InputLabel>
                        <Select
                          labelId="syear-select"
                          label="Studying year"
                          required
                          value={formdata.syear}
                          name="syear"
                          onChange={handleInputChange}
                        >
                          <MenuItem value={"1"}>1</MenuItem>
                          <MenuItem value={"2"}>2</MenuItem>
                          <MenuItem value={"3"}>3</MenuItem>
                          <MenuItem value={"4"}>4</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="row mx-1 mt-3">
                      <FormControl fullWidth>
                        <InputLabel id="ssem-select">
                          Studying semester
                        </InputLabel>
                        <Select
                          labelId="ssem-select" 
                          value={formdata.ssem}
                          label="Studying semester"
                          name="ssem"
                          required
                          onChange={handleInputChange}
                        >
                        {formdata.syear === "1" && (<MenuItem value={"1"}>1</MenuItem>) }
                        {formdata.syear === "1" && (<MenuItem value={"2"}>2</MenuItem>) }
                        {formdata.syear === "2" && (<MenuItem value={"3"}>3</MenuItem>) }
                        {formdata.syear === "2" && (<MenuItem value={"4"}>4</MenuItem>) }
                        {formdata.syear === "3" && (<MenuItem value={"5"}>5</MenuItem>) }
                        {formdata.syear === "3" && (<MenuItem value={"6"}>6</MenuItem>) }
                        {formdata.syear === "4" && (<MenuItem value={"7"}>7</MenuItem>) }
                        {formdata.syear === "4" && (<MenuItem value={"8"}>8</MenuItem>) }
                        </Select>
                      </FormControl>
                    </div>
                    <div className="row mx-1 mt-3">
                      <FormControl fullWidth>
                        <InputLabel id="section-select">Section</InputLabel>
                        <Select
                          labelId="section-select"
                          label="Section"
                          required
                          value={formdata.section}
                          name="section"
                          onChange={handleInputChange}
                        >
                          <MenuItem value={"A"}>A</MenuItem>
                          <MenuItem value={"B"}>B</MenuItem>
                          <MenuItem value={"C"}>C</MenuItem>
                          <MenuItem value={"D"}>D</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="row mx-1 mt-3">
                      <FormControl fullWidth>
                        <InputLabel id="etype-select">Entry Type</InputLabel>
                        <Select
                          labelId="etype-select"
                          label="Entry Type"
                          required
                          value={formdata.etype}
                          name="etype"
                          onChange={handleInputChange}
                        >
                          <MenuItem value={"regular"}>Regular (12th)</MenuItem>
                          <MenuItem value={"lateral"}>Lateral (Diploma)</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    {formdata.etype === "regular" && <>
                      <div className="row mx-1 mt-3">
                      <TextField
                        className="col"
                        label="12th passing year"
                        variant="outlined"
                        name="twelfthpyear"
                        onChange={handleInputChange}
                        value={formdata.twelfthpyear}
                        error={!!errors.twelfthpyear}
                        helperText={errors.twelfthpyear}
                      />
                    </div>
                    <div className="row mx-1 mt-3">
                      <TextField
                        className="col"
                        label="12th Percentage"
                        variant="outlined"
                        name="twelfthper"
                        onChange={handleInputChange}
                        value={formdata.twelfthper}
                        error={!!errors.twelfthper}
                        helperText={errors.twelfthper}
                      />
                    </div>
                    </>}
                    {formdata.etype === "lateral" && <>
                    <div className="row mx-1 mt-3">
                      <TextField
                        className="col"
                        label="Diploma passing year"
                        variant="outlined"
                        name="diplomapyear"
                        onChange={handleInputChange}
                        value={formdata.diplomapyear}
                        error={!!errors.diplomapyear}
                        helperText={errors.diplomapyear}
                      />
                    </div>
                    <div className="row mx-1 mt-3">
                      <TextField
                        className="col"
                        label="Diploma Percentage"
                        variant="outlined"
                        name="diplomaper"
                        onChange={handleInputChange}
                        value={formdata.diplomaper}
                        error={!!errors.diplomaper}
                        helperText={errors.diplomaper}
                      />
                    </div>
                    </>}
                    <div className="row mx-1 mt-3">
                      <TextField
                        className="col"
                        label="10th passing year"
                        variant="outlined"
                        name="tenthpyear"
                        onChange={handleInputChange}
                        value={formdata.tenthpyear}
                        error={!!errors.tenthpyear}
                        helperText={errors.tenthpyear}
                      />
                    </div>
                    <div className="row mx-1 mt-3">
                      <TextField
                        className="col"
                        label="10th Percentage"
                        variant="outlined"
                        name="tenthper"
                        onChange={handleInputChange}
                        value={formdata.tenthper}
                        error={!!errors.tenthper}
                        helperText={errors.tenthper}
                      />
                    </div>
                    <div className="row mx-1 mt-3">
                    <FormControl fullWidth>
                        <InputLabel id="backlog-select">Do you have any backlog</InputLabel>
                        <Select
                          labelId="backlog-select"
                          label="Do you have any backlog"
                          required
                          value={formdata.backlog}
                          name="backlog"
                          onChange={handleInputChange}
                        >
                          <MenuItem value={"true"}>Yes</MenuItem>
                          <MenuItem value={"false"}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                    <div className="row mx-1 my-2 justify-content-between">
                      <Button
                        className="col-3"
                        variant="outlined"
                        color="warning"
                        onClick={prevStep}
                      >
                        back
                      </Button>
                      <Button
                        className="col-3"
                        variant="contained"
                        type="submit"
                      >
                        next
                      </Button>
                    </div>
                  </form>
                )}
                {step === 4 && (
                  <form
                    className="container-fluid"
                    onSubmit={handelstep4submit}
                  >
                    {haveerrors && <Alert severity="error">
                        <div>{errors.cpassword}</div>
                       </Alert>}
                    <div className="row mx-1 mt-3">
                      <TextField
                        className="col"
                        label="Password"
                        variant="outlined"
                        name="password"
                        type="password"
                        // error={!!errors.usn}
                        // helperText={errors.usn}
                        value={password}
                        // required
                        onChange={handlepasswordChange}                        
                      />
                      </div>
                      <div className="row mx-1 mt-3">
                      <TextField
                        className="col"
                        label="Confirm password"
                        variant="outlined"
                        name="cpassword"
                        type="password"
                        error={!!errors.cpassword}
                        helperText={errors.cpassword}
                        value={formdata.cpassword}
                        // required
                        onChange={handlepasswordChange}                        
                      />
                      </div>
                    <div className="row mt-2 justify-content-between">
                    <Button
                        className="col-3 m-3"
                        variant="outlined"
                        color="warning"
                        onClick={prevStep}
                      >
                        back
                      </Button>
                      <Button
                        className="col-3 m-3"
                        variant="contained"
                        type="submit"
                        // disabled
                      >
                        Submit
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
          {formdata.dob && formdata.dob["%d"]}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Registration;
