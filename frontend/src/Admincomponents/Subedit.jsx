import React, { useEffect, useState } from "react";
import { ButtonGroup, Button, CircularProgress } from "@mui/material";
import { Stepper,Step,StepButton } from '@mui/material'
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Alert } from "@mui/material";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import axios from "axios";
import { address } from "../Address";

export default function Subedit({details,branchdetails}){
    const [step, setStep] = useState(1);
    const totalSteps = 3;
    const [companydata, setCompanydata] = useState(details);
    const [branches, setBranches] = useState(branchdetails);
    
    const [arrivaldate, setArrivaldate] = useState(new Date(details.arrivaldate));
    const [lastdate, setLastdate] = useState(new Date(details.lastdate));
    const [errors, setErrors] = useState({
      email: "",
    });
  
    const [salert, setSalert] = useState(false);

    useEffect(()=>{
         setSalert(false);
        // console.log("Changing");
        setCompanydata(details);
        setBranches(branchdetails);
        setArrivaldate(new Date(details.arrivaldate));
        setLastdate(new Date(details.lastdate));
    },[details.jid])
  
    const handelchange = (e) => {
      setCompanydata({ ...companydata, [e.target.name]: e.target.value });
      if (e.target.name === "email") {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!pattern.test(e.target.value)) {
          setErrors({ ...errors, [e.target.name]: "Invalid Email" });
        } else {
          setErrors({ ...errors, [e.target.name]: "" });
        }
      }
      if (e.target.name === "fulltimectc") {
        const perpattern = /[^0-9,.]/g;
        if (e.target.value <= 0) {
          setErrors({
            ...errors,
            [e.target.name]: "Please Enter proper CTC in LPA",
          });
        } else if (perpattern.test(e.target.value)) {
          setErrors({
            ...errors,
            [e.target.name]: "Please Enter proper CTC in LPA",
          });
        } else {
          setErrors({ ...errors, [e.target.name]: "" });
        }
      }
      if (e.target.name === "internship") {
        // console.log(e.target.value);
        if (e.target.value === "0") {
          setCompanydata({
            ...companydata,
            internship: "0",
            stipendpm: "0",
            durationinm: "0",
          });
          setErrors({ ...errors, stipendpm: "", durationinm: "" });
        }
      }
      if (e.target.name === "stipendpm") {
        const perpattern = /[^0-9,.]/g;
        if (e.target.value < 0) {
          setErrors({
            ...errors,
            [e.target.name]: "Please Enter proper Stipend",
          });
        } else if (perpattern.test(e.target.value)) {
          setErrors({
            ...errors,
            [e.target.name]: "Please Enter proper Stipend",
          });
        } else {
          setErrors({ ...errors, [e.target.name]: "" });
        }
      }
      if (e.target.name === "durationinm") {
        const perpattern = /[^0-9]/g;
        if (e.target.value <= 0 || e.target.value > 48) {
          setErrors({
            ...errors,
            [e.target.name]: "Please Enter Duration in Months",
          });
        } else if (perpattern.test(e.target.value)) {
          setErrors({ ...errors, [e.target.name]: "Characters not allowed" });
        } else {
          setErrors({ ...errors, [e.target.name]: "" });
        }
      }
    };
    const handelsubmit = (e) => {
      e.preventDefault();
      // console.log(companydata);
      if (step === 1) {
        if (
          !!!errors.email &&
          !!!errors.fulltimectc &&
          !!!errors.stipend &&
          !!!errors.duration
        ) {
          //console.log(companydata);
          // console.log("Hiii dr");
          setStep(2);
        }
      }
    };
  
    const handelchange2 = (e) => {
      const { name, value } = e.target;
      // console.log(name + value);
      setErrors({ ...errors, [name]: "" });
      setCompanydata({ ...companydata, [name]: value });
    };
  
    const checkcutoff = () => {
      if (companydata.becutoff < 0 || companydata.becutoff > 100) {
        setErrors({ ...errors, becutoff: "Should between 0 - 100" });
        return false;
      }
      if (companydata.twelfthcutoff < 0 || companydata.twelfthcutoff > 100) {
        setErrors({ ...errors, twelfthcutoff: "Should between 0 - 100" });
        return false;
      }
      if (companydata.diplomacutoff < 0 || companydata.diplomacutoff > 100) {
        setErrors({ ...errors, diplomacutoff: "Should between 0 - 100" });
        return false;
      }
      if (companydata.tenthcutoff < 0 || companydata.tenthcutoff > 100) {
        setErrors({ ...errors, tenthcutoff: "Should between 0 - 100" });
        return false;
      }
      return true;
    };
  
    const handelsubmit2 = (e) => {
      e.preventDefault();
      if (checkcutoff()) {
        // console.table(companydata);
        setStep(step + 1);
      }
    };
  
    const handelchange3 = (e) => {
      const { name, value } = e.target;
      setErrors({ ...errors, [name]: "" });
      setCompanydata({ ...companydata, [name]: value });
    };
  
    const handelsubmit3 = (e) => {
      e.preventDefault();
      // console.table(companydata);
      // console.log(arrivaldate[0]);
      // console.log(lastdate[0]);
      // setStep(step + 1);

      // console.log(companydata);
      // console.log(branches);
      // console.log(arrivaldate);
      // console.log(lastdate);
      updatesubmit();
    };

    const updatesubmit = async () => {
      try{
        const response = await axios.post(address+"/editcompany",{companydata:companydata,branches:branches,arrivaldate:`${objecttodate(new Date(arrivaldate))}`,lastdate:`${objecttodate(new Date(lastdate))}`})
        if(response.status===201){
          setStep(1);
          setSalert(true);
          // window.alert("Company updated");
        }
      }
      catch(error){
        // console.log("failed to update");
          window.alert("Failed to update company");
      }
    }
  
    const objecttodate = (dateObject) => {
      const padZero = (num) => num.toString().padStart(2, "0");
  
      const year = dateObject.getUTCFullYear();
      const month = padZero(dateObject.getUTCMonth() + 1); // Months are zero-based
      const day = padZero(dateObject.getUTCDate());
      const hours = padZero(dateObject.getHours());
      const minutes = padZero(dateObject.getMinutes());
      const seconds = padZero(dateObject.getSeconds());
  
      const mysqlDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return mysqlDatetime;
    };
  
    const handelchecked = (e) => {
      const { name, checked } = e.target;
      setBranches({ ...branches, [name]: checked });
    };

    if(companydata === null || branchdetails === null){
        return <>Loading...</>
    }

    if(salert){
      return <div className="m-5">
        <Alert severity="success">Company Updated Successfully</Alert>
      </div>
    }
  
    return (
      <div className="container-fluid">
        <div className="row  d-flex align-items-center justify-content-center">
          <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-5">
            <div className="card m-1">
              <div className="card-header d-flex justify-content-center align-items-center fs-6 fw-bold">
                Edit Company - Company ID : {companydata.jid}
              </div>
              <div className="card-body p-0">
                <div className="d-flex justify-content-center align-items-center fw-bold mt-1">
                  Step {step} of {totalSteps}
                </div>
                  <div>
                    <Stepper nonLinear activeStep={step-1} className="my-4">
                      <Step>
                        <StepButton color="primary">
                          {"Details"}
                        </StepButton>
                      </Step>
                      <Step>
                        <StepButton color="primary">
                          {"Cutoff"}
                        </StepButton>
                      </Step>
                      <Step>
                        <StepButton color="inherit">
                          {"Status"}
                        </StepButton>
                      </Step>
                  </Stepper>
                </div>
                {step === 1 && (
                  <form className="m-3" onSubmit={handelsubmit}>
                    <TextField
                      className="col"
                      label="Company Name"
                      fullWidth
                      variant="outlined"
                      name="cname"
                      // required
                      value={companydata.cname}
                      onChange={handelchange}
                    />
                    <TextField
                      className="col mt-3"
                      label="Company E-mail"
                      fullWidth
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email}
                      // required
                      name="email"
                      value={companydata.email}
                      onChange={handelchange}
                    />
                    <FormControl fullWidth className="mt-3">
                      <InputLabel id="type-select">Company type *</InputLabel>
                      <Select
                        labelId="type-select"
                        value={companydata.type}
                        name="type"
                        label="Company type"
                        required
                        onChange={handelchange}
                      >
                        <MenuItem value={"opendream"}>Open Dream</MenuItem>
                        <MenuItem value={"dream"}>Dream</MenuItem>
                        <MenuItem value={"core"}>Core</MenuItem>
                        <MenuItem value={"mass"}>Mass</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      className="col mt-3"
                      label="Job Role"
                      fullWidth
                      variant="outlined"
                      name="role"
                      // required
                      value={companydata.role}
                      onChange={handelchange}
                    />
                    <TextField
                      className="col mt-3"
                      label="Job Decsription"
                      fullWidth
                      multiline
                      variant="outlined"
                      name="jd"
                      // required
                      value={companydata.jd}
                      onChange={handelchange}
                    />
                    <TextField
                      className="col mt-3"
                      label="Job Location"
                      fullWidth
                      helperText="eg : Bengaluru,Hydrabad"
                      variant="outlined"
                      name="location"
                      // required
                      value={companydata.location}
                      onChange={handelchange}
                    />
                    <TextField
                      className="col mt-3"
                      label="Full time CTC in LPA"
                      fullWidth
                      variant="outlined"
                      name="fulltimectc"
                      error={!!errors.fulltimectc}
                      helperText={errors.fulltimectc}
                      // required
                      value={companydata.fulltimectc}
                      onChange={handelchange}
                    />
                    <FormControl className="mt-3">
                      <FormLabel id="internshipprovideed">
                        Internship provided
                      </FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="internshipprovideed"
                        name="internship"
                        value={companydata.internship}
                        className="ms-3"
                        onChange={handelchange}
                      >
                        <FormControlLabel
                          value="1"
                          required
                          control={<Radio/>}
                          label="Yes"
                        />
                        <FormControlLabel
                          value="0"
                          required
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </FormControl>
                    {/* {companydata.internship === "1" && ( */}
                      <div>
                        <TextField
                          className="col mt-3"
                          label="Internship Stipend per month in Rupees "
                          fullWidth
                          variant="outlined"
                          error={!!errors.stipend}
                          helperText={errors.stipend}
                          name="stipendpm"
                          // helperText="eg : ( 25 = Twenty Five Thousand Only)"
                          // required
                          value={companydata.stipendpm}
                          onChange={handelchange}
                        />
                        <TextField
                          className="col mt-3"
                          label="Internship Duration in Months"
                          fullWidth
                          variant="outlined"
                          name="durationinm"
                          error={!!errors.duration}
                          helperText={errors.duration}
                          // required
                          value={companydata.durationinm}
                          onChange={handelchange}
                        />
                      </div>
                    {/* )} */}
                    <div className="d-flex justify-content-end mt-3">
                      <Button className="col-3" variant="contained" type="submit">
                        Next
                      </Button>
                    </div>
                  </form>
                )}
                {step === 2 && (
                  <form className="m-3" onSubmit={handelsubmit2}>
                    <div className="m-1">
                      <Alert severity="warning">
                        Percent should between 0 - 100
                      </Alert>
                    </div>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Allowed Branches</FormLabel>
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          control={<Checkbox />}
                          label="AIML"
                          checked={branches.AIML}
                          name="AIML"
                          onChange={handelchecked}
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="CSE"
                          checked={branches.CSE}
                          name="CSE"
                          onChange={handelchecked}
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="ISE"
                          checked={branches.ISE}
                          name="ISE"
                          onChange={handelchecked}
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="ECE"
                          checked={branches.ECE}
                          name="ECE"
                          onChange={handelchecked}
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="EEE"
                          checked={branches.EEE}
                          name="EEE"
                          onChange={handelchecked}
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="ME"
                          checked={branches.ME}
                          name="ME"
                          onChange={handelchecked}
                          labelPlacement="end"
                        />
                        <FormControlLabel
                          control={<Checkbox />}
                          label="CV"
                          checked={branches.CV}
                          name="CV"
                          onChange={handelchecked}
                          labelPlacement="end"
                        />
                      </FormGroup>
                    </FormControl>
                    <FormControl fullWidth className="mt-3">
                      <InputLabel id="backlogs-select">
                        Backlogs allowed *
                      </InputLabel>
                      <Select
                        labelId="backlogs-select"
                        value={companydata.backlogs}
                        name="backlogs"
                        label="Backlogs allowed"
                        required
                        onChange={handelchange2}
                      >
                        <MenuItem value={"1"}>Yes</MenuItem>
                        <MenuItem value={"0"}>No</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      className="col mt-3"
                      label="B. E. Cutoff (in percent)"
                      fullWidth
                      variant="outlined"
                      name="becutoff"
                      error={!!errors.becutoff}
                      helperText={errors.becutoff}
                      // required
                      value={companydata.becutoff}
                      onChange={handelchange2}
                    />
                    <TextField
                      className="col mt-3"
                      label="12th Cutoff (in percent)"
                      fullWidth
                      variant="outlined"
                      name="twelfthcutoff"
                      error={!!errors.twelfthcutoff}
                      helperText={errors.twelfthcutoff}
                      // required
                      value={companydata.twelfthcutoff}
                      onChange={handelchange2}
                    />
                    <TextField
                      className="col mt-3"
                      label="Diploma Cutoff (in percent)"
                      fullWidth
                      variant="outlined"
                      name="diplomacutoff"
                      error={!!errors.diplomacutoff}
                      helperText={errors.diplomacutoff}
                      // required
                      value={companydata.diplomacutoff}
                      onChange={handelchange2}
                    />
                    <TextField
                      className="col mt-3"
                      label="10th Cutoff (in percent)"
                      fullWidth
                      variant="outlined"
                      name="tenthcutoff"
                      error={!!errors.tenthcutoff}
                      helperText={errors.tenthcutoff}
                      // required
                      value={companydata.tenthcutoff}
                      onChange={handelchange2}
                    />
                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        className="col-3"
                        variant="outlined"
                        color="warning"
                        onClick={() => {
                          setStep(step - 1);
                        }}
                        type="submit"
                      >
                        Back
                      </Button>
  
                      <Button className="col-3" variant="contained" type="submit">
                        Next
                      </Button>
                    </div>
                  </form>
                )}
                {step === 3 && (
                  <form className="m-3" onSubmit={handelsubmit3}>
                    <TextField
                      className="col"
                      label="Additional information"
                      fullWidth
                      variant="outlined"
                      multiline
                      name="info"
                      // required
                      value={companydata.info}
                      onChange={handelchange3}
                    />
                    <FormControl fullWidth className="mt-3">
                      <InputLabel id="status-select">Status *</InputLabel>
                      <Select
                        labelId="backlogs-select"
                        value={companydata.status}
                        name="status"
                        label="Status"
                        required
                        onChange={handelchange3}
                      >
                        <MenuItem value={"active"}>Active</MenuItem>
                        {/* <MenuItem value={"inactive"}>Inactive</MenuItem>
                            <MenuItem value={"tclosed"}>Temparary closed</MenuItem>
                            <MenuItem value={"list"}>List</MenuItem>
                            <MenuItem value={"hide"}>Hide</MenuItem> */}
                      </Select>
                    </FormControl>
                    <div className="">
                      <label
                        htmlFor="arrivaldate"
                        className="form-label mt-2 mb-0"
                      >
                        Arrival Date
                      </label>
                      <br />
                      <Flatpickr
                        data-enable-time
                        value={arrivaldate}
                        required
                        className="mt-0 p-1 rounded border"
                        onChange={(date) => setArrivaldate(date)}
                        options={{
                          dateFormat: "d-m-Y H:i",
                        }}
                      />
                    </div>
                    <div className="">
                      <label htmlFor="lastdate" className="form-label mt-2 mb-0">
                        Last Date
                      </label>
                      <br />
                      <Flatpickr
                        data-enable-time
                        value={lastdate}
                        className="mt-0 p-1 rounded border"
                        onChange={(date) => setLastdate(date)}
                        options={{
                          dateFormat: "d-m-Y H:i",
                        }}
                      />
                    </div>
                    <div className="d-flex justify-content-between mt-3">
                      <Button
                        className="col-3"
                        variant="outlined"
                        color="warning"
                        onClick={() => {
                          setStep(step - 1);
                        }}
                        type="submit"
                      >
                        Back
                      </Button>
                      <Button className="col-3" variant="contained" color="warning" type="submit">
                        Update
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };