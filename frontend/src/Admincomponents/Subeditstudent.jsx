import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { address } from '../Address'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, CircularProgress} from '@mui/material';
import { Stepper,Step,StepButton } from '@mui/material'
import Flatpickr from "react-flatpickr";

export default function Subeditstudent({usn,setSelectedOption}) {
    const [studentdetails,setStudentdetails] = useState({});
    const [studentdob,setStudentdob] = useState(null);
    const [errors,setErrors] = useState({});
    const [step,setStep] = useState(1);
    useEffect(()=>{
        const getdetails = async ()=>{
        try{
            setStep(1);
            const response = await axios.post(address+'/getstudentdetails',{usn:usn});
            setStudentdetails(response.data[0]);
            setStudentdob(new Date(response.data[0].dob));
        }
        catch(error){
            setStudentdetails(false);
        }
        }
        setStudentdetails({});
        getdetails();
    },[usn])

      const convertdate = (olddate) => {
        const date = new Date(olddate);
        // console.log(olddate);
        // const newdate = String(date.getUTCDate()+1).padStart(2, '0')+"-"+String(date.getUTCMonth()+1).padStart(2, '0')+"-"+date.getUTCFullYear();
        const newdate = date.getUTCFullYear()+"-"+String(date.getUTCMonth()+1).padStart(2, '0')+"-"+String(date.getUTCDate()+1).padStart(2, '0');
        // console.log(newdate);
        return newdate;
      };

    if(!studentdetails){
        return <div>Loading...</div>
    }
    const handelchange = (e)=>{
        const {name,value} = e.target;
        console.log(name+" : "+value);
        setStudentdetails({...studentdetails,[name]:value});
        if(step === 1){
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
        }
        if(step === 2){
            // console.log("lalala")
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
                setStudentdetails({...studentdetails,syear: value, ssem : ''});
                }
            if(name === "etype"){
                setStudentdetails({...studentdetails,etype: value, twelfthpyear : '', twelfthper:'',diplomapyear:'',diplomaper:''});
                setErrors({...errors,twelfthpyear:"",twelfthper:"",diplomapyear:"",diplomaper:""});
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
        }
    }
    const submitstep1 = (e)=>{
        e.preventDefault();
        if(!!!errors.email && !!!errors.dob && !!!errors.pphno && !!!errors.sphno){
            // console.table(studentdetails)
            setStep(2);
            setStudentdetails({...studentdetails,dob:convertdate(studentdob)});
        }
        else{
            console.log("Error in form");
        }
    }

    const submitstep2 = async (e)=>{
        e.preventDefault();
        // setStudentdob(objecttodate(new Date(studentdetails.dob)));
        // setStudentdetails({...studentdetails,dob:convertdate(studentdob)});
        if(!!!errors.bepassingyear && !!!errors.ccgpa && !!!errors.branch && !!!errors.syear && !!!errors.ssem && !!!errors.section && !!!errors.etype 
            && !!!errors.twelfthpyear && !!!errors.twelfthper && !!!errors.diplomapyear && !!!errors.diplomaper && !!!errors.tenthpyear && !!!errors.tenthper){
            // console.table(studentdetails)
            // setStudentdetails({...studentdetails,dob:convertdate(studentdob)});
            // objecttodate
            updatestudent();
        }
        else{
            console.log("Hii");
        }
    }

    const updatestudent = async ()=>{
        // console.table(studentdetails);
        // console.log(studentdob);
        try{
            const response = await axios.post(address+'/editstudent',{sd:studentdetails});
            // console.log(response.data);
            window.alert("Student details updated")
            setSelectedOption("");
        }
        catch(error){
            console.log("Error while updating");
            console.log(error);
        }
    }

  return (
        <div className='d-flex justify-content-center'>
        <div className="card m-3">
            <div className="card-header d-flex justify-content-center p-1"><b>Edit Student - USN :&nbsp;</b><span>{studentdetails.usn}</span>
            </div>
            <div className="card-body overflow-scroll">
            <b className='d-flex justify-content-center'>Step {step} of 2</b>
            <Stepper nonLinear activeStep={step-1} className="w-100 mb-4">
                <Step>
                    <StepButton color="primary">
                    {"Personal details"}
                    </StepButton>
                </Step>
                <Step>
                    <StepButton color="primary">
                    {"Academic details"}
                    </StepButton>
                </Step>
                {/* <Step>
                    <StepButton color="inherit">
                    {"label"}
                    </StepButton>
                </Step> */}
            </Stepper>
            {!!!studentdetails.usn && <div>
            <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "25vh" }}
            >
                <CircularProgress></CircularProgress>
            </div>
            </div>}
            {!!studentdetails.usn && <div>
            {step === 1 && <form onSubmit={submitstep1}>
                <TextField
                    fullWidth
                    label={"Full name"}
                    name='fullname'
                    value={studentdetails.fullname}
                    onChange={handelchange}
                    // required
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    fullWidth
                    label={"E-mail"}
                    name='email'
                    className='mt-3'
                    error={!!errors.email}
                    helperText={errors.email}
                    value={studentdetails.email}
                    onChange={handelchange}
                    // required
                    InputLabelProps={{ shrink: true }}
                />
                <div className='mt-1'><label htmlFor='studentbod'>Date of birth : </label></div>
                <div><Flatpickr
                      data-enable-time
                      id='studentdob'
                      value={studentdob}
                      name='dob'
                      error='1'
                      className="w-100 mt-0 p-1 rounded border"
                      onChange={(date)=>{
                        // setStudentdetails({...studentdetails,dob:date});
                        setStudentdob(new Date(date));
                        if(date.length<=0){
                            // console.log("No dob")
                            setErrors({...errors,dob:"Please enter Date of birth"})
                            // setStudentdetails({...studentdetails,dob:convertdate(date)});
                        }
                        else{
                            // console.log("dob")
                            setErrors({...errors,dob:""})
                        }
                        }}
                      options={{
                          dateFormat: "d-m-Y",
                          enableTime:false
                      }}
                />
                {!!errors.dob && <div id="emailHelp" class="form-text text-danger">{errors.dob}</div>}
                </div>
                <FormControl fullWidth className='mt-3'>
                        <InputLabel id="gender-select">Gender</InputLabel>
                        <Select
                          labelId="gender-select"
                          value={studentdetails.gender}
                          name="gender"
                          label="Gender"
                          required
                          onChange={handelchange}
                        >
                          <MenuItem value={"M"}>Male</MenuItem>
                          <MenuItem value={"F"}>Female</MenuItem>
                          <MenuItem value={"O"}>Others</MenuItem>
                        </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label={"Primary phone no."}
                    name='pphno'
                    className='mt-3'
                    value={studentdetails.pphno}
                    onChange={handelchange}
                    error={!!errors.pphno}
                    helperText={errors.pphno}
                    // required
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    fullWidth
                    label={"Secondary phone no."}
                    name='sphno'
                    className='mt-3'
                    value={studentdetails.sphno}
                    onChange={handelchange}
                    error={!!errors.sphno}
                    helperText={errors.sphno}
                    // required
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    fullWidth
                    label={"Present address"}
                    name='presentaddr'
                    className='mt-3'
                    value={studentdetails.presentaddr}
                    onChange={handelchange}
                    multiline
                    // required
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    fullWidth
                    label={"Permanent address"}
                    name='permanentaddr'
                    className='mt-3'
                    value={studentdetails.permanentaddr}
                    onChange={handelchange}
                    multiline
                    // required
                    InputLabelProps={{ shrink: true }}
                />
                <div className='d-flex justify-content-end mt-2'>
                    <Button variant='outlined' color='warning' type='submit'>Next</Button>
                </div>
                </form>}
            {step === 2 && <form onSubmit={submitstep2}>
            <div className="row mx-1 mt-3">
                    <TextField
                    className="col"
                    fullWidth
                    label="B.E passing year"
                    value={studentdetails.bepassingyear}
                    name="bepassingyear"
                    error={!!errors.bepassingyear}
                    helperText={errors.bepassingyear}
                    required
                    onChange={handelchange}
                    InputLabelProps={{ shrink: true }}
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
                    value={studentdetails.ccgpa}
                    required
                    onChange={handelchange}   
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    />
                </div>
                <div className="row mx-1 mt-3">
                    <FormControl fullWidth>
                    <InputLabel id="branch-select">Branch</InputLabel>
                    <Select
                        labelId="branch-select" 
                        value={studentdetails.branch}
                        name="branch"
                        onChange={handelchange}
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
                        value={studentdetails.syear}
                        name="syear"
                        onChange={handelchange}
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
                        value={studentdetails.ssem.toString()}
                        label="Studying semester"
                        name="ssem"
                        required
                        onChange={handelchange}
                    >
                    {studentdetails.syear.toString() === "1" && (<MenuItem value={"1"}>1</MenuItem>) }
                    {studentdetails.syear.toString() === "1" && (<MenuItem value={"2"}>2</MenuItem>) }
                    {studentdetails.syear.toString() === "2" && (<MenuItem value={"3"}>3</MenuItem>) }
                    {studentdetails.syear.toString() === "2" && (<MenuItem value={"4"}>4</MenuItem>) }
                    {studentdetails.syear.toString() === "3" && (<MenuItem value={"5"}>5</MenuItem>) }
                    {studentdetails.syear.toString() === "3" && (<MenuItem value={"6"}>6</MenuItem>) }
                    {studentdetails.syear.toString() === "4" && (<MenuItem value={"7"}>7</MenuItem>) }
                    {studentdetails.syear.toString() === "4" && (<MenuItem value={"8"}>8</MenuItem>) }
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
                        value={studentdetails.section}
                        name="section"
                        onChange={handelchange}
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
                        value={studentdetails.etype}
                        name="etype"
                        onChange={handelchange}
                    >
                        <MenuItem value={"regular"}>Regular (12th)</MenuItem>
                        <MenuItem value={"lateral"}>Lateral (Diploma)</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                {studentdetails.etype === "regular" && <>
                    <div className="row mx-1 mt-3">
                    <TextField
                    className="col"
                    label="12th passing year"
                    required
                    variant="outlined"
                    name="twelfthpyear"
                    onChange={handelchange}
                    value={studentdetails.twelfthpyear}
                    error={!!errors.twelfthpyear}
                    helperText={errors.twelfthpyear}
                    />
                </div>
                <div className="row mx-1 mt-3">
                    <TextField
                    className="col"
                    label="12th Percentage"
                    variant="outlined"
                    required
                    name="twelfthper"
                    onChange={handelchange}
                    value={studentdetails.twelfthper}
                    error={!!errors.twelfthper}
                    helperText={errors.twelfthper}
                    />
                </div>
                </>}
                {studentdetails.etype === "lateral" && <>
                <div className="row mx-1 mt-3">
                    <TextField
                    className="col"
                    label="Diploma passing year"
                    required
                    variant="outlined"
                    name="diplomapyear"
                    onChange={handelchange}
                    value={studentdetails.diplomapyear}
                    error={!!errors.diplomapyear}
                    helperText={errors.diplomapyear}
                    />
                </div>
                <div className="row mx-1 mt-3">
                    <TextField
                    className="col"
                    label="Diploma Percentage"
                    required
                    variant="outlined"
                    name="diplomaper"
                    onChange={handelchange}
                    value={studentdetails.diplomaper}
                    error={!!errors.diplomaper}
                    helperText={errors.diplomaper}
                    />
                </div>
                </>}
                <div className="row mx-1 mt-3">
                    <TextField
                    className="col"
                    label="10th passing year"
                    required
                    variant="outlined"
                    name="tenthpyear"
                    onChange={handelchange}
                    InputLabelProps={{ shrink: true }}
                    value={studentdetails.tenthpyear}
                    error={!!errors.tenthpyear}
                    helperText={errors.tenthpyear}
                    />
                </div>
                <div className="row mx-1 mt-3">
                    <TextField
                    className="col"
                    label="10th Percentage"
                    required
                    variant="outlined"
                    name="tenthper"
                    onChange={handelchange}
                    InputLabelProps={{ shrink: true }}
                    value={studentdetails.tenthper}
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
                        value={studentdetails.backlog}
                        name="backlog"
                        onChange={handelchange}
                    >
                        <MenuItem value={"1"}>Yes</MenuItem>
                        <MenuItem value={"0"}>No</MenuItem>
                    </Select>
                    </FormControl>
                </div>
                {/* <div className="row mx-1 mt-3">
                    <TextField
                    className="col"
                    label="Resume link"
                    // required
                    variant="outlined"
                    name="resume"
                    onChange={handelchange}
                    InputLabelProps={{ shrink: true }}
                    value={studentdetails.resume}
                    error={!!errors.resume}
                    helperText={errors.resume}
                    />
                </div> */}
                <div className='d-flex justify-content-between mx-1 mt-3'>
                    <Button color='warning' variant='outlined' onClick={()=>{setStep(1)}}>back</Button>
                    <Button color='warning' variant='contained' type='submit'>update</Button>
                </div>
                </form>}
            </div>}
            </div>
        </div>
        </div>
  )
}

