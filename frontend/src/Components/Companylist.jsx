import React,{useEffect, useState} from 'react'
import { ButtonGroup,Button, CircularProgress} from '@mui/material'
import { TextField,FormControl,InputLabel,Select,MenuItem,FormLabel,RadioGroup,FormGroup,Checkbox,FormControlLabel,Radio } from '@mui/material';
import {Alert} from '@mui/material';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import axios from 'axios';
import SearchableDropdown from './Searchabledropdown';

function Companylist() {

    const [suboption,setSuboption] = useState(2);

    const Rendermenu = () =>{
        switch(suboption){
            case 1:
                return <>c1</>
            case 2:
                return <Addcompany/>;
            case 3:
                return <Viewcompany/>
            case 4:
                return <>c4</>
            case 5:
                return <>c5</>
            default:
                return <>def</>
        }
    }

    const Companymenu = ()=>{
        return <div className='d-flex justify-content-center m-1'>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
        <Button variant={suboption === 1 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(1)}}>Company</Button>
        <Button variant={suboption === 2 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(2)}}>Add Company</Button>
        <Button variant={suboption === 3 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(3)}}>View Company</Button>
        <Button variant={suboption === 4 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(4)}}>Edit Company</Button>
        <Button variant={suboption === 5 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(5)}}>Companies List</Button>
      </ButtonGroup></div>
    }

  return (
    <div style={{minHeight:"50vh"}}>
    <div>{Companymenu()}</div>
    <div>{Rendermenu()}</div>
    </div>
  )
}

export default Companylist;

const Addcompany = () => {
    const [step, setStep] = useState(1);
    const totalSteps = 4; 
    const [companydata,setCompanydata] = useState({
        cname : "",
        email : "",
        type : "",
        role : "",
        jd : "",
        location : "",
        fulltimectc : "",
        internship : null,
        stipend : "0",
        duration : "0",
        backlogs : "1",
        becutoff : "40",
        twelfthcutoff : "40",
        diplomacutoff : "40",
        tenthcutoff : "40",
        info : "",
        status : "active",
        // arrivaldate : "",
        // lastdate : "",
        cpassword : "",
    })
    const [password,setPassword] = useState("");
    const [branches,setBranches] = useState({
        AIML : false,
        CSE : false,
        ISE : false,
        ECE : false,
        EEE : false,
        CV : false,
        ME : false
    })
    const [arrivaldate, setArrivaldate] = useState(new Date());
    const [lastdate, setLastdate] = useState(new Date());
    const [errors,setErrors] = useState({
        email : "",
    })

    const [salert, setSalert] = useState(false);

    const handelchange = (e)=>{
        setCompanydata({...companydata,[e.target.name]:e.target.value});
        if(e.target.name === "email"){
            const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if(!pattern.test(e.target.value)){
            setErrors({...errors,[e.target.name]:"Invalid Email"});
            }
            else{
            setErrors({...errors,[e.target.name]:""});
            }
        }
        if(e.target.name === "fulltimectc"){
            const perpattern = /[^0-9,.]/g;
            if(e.target.value<=0){
                setErrors({...errors,[e.target.name]:"Please Enter proper CTC in LPA"});
            }
            else if(perpattern.test(e.target.value)){
                setErrors({...errors,[e.target.name]:"Please Enter proper CTC in LPA"});
            }
            else{
                setErrors({...errors,[e.target.name]:""});
            }
        }
        if(e.target.name==="internship"){
            // console.log(e.target.value);
            if(e.target.value === '0'){
                setCompanydata({...companydata,internship:"0",stipend:"0",duration:"0"});
                setErrors({...errors,stipend:"",duration:""});
            }
        }
        if(e.target.name === "stipend"){
            const perpattern = /[^0-9,.]/g;
            if(e.target.value<0){
                setErrors({...errors,[e.target.name]:"Please Enter proper Stipend"});
            }
            else if(perpattern.test(e.target.value)){
                setErrors({...errors,[e.target.name]:"Please Enter proper Stipend"});
            }
            else{
                setErrors({...errors,[e.target.name]:""});
            }
        }
        if(e.target.name === "duration"){
            const perpattern = /[^0-9]/g;
            if(e.target.value<=0 || e.target.value>48){
                setErrors({...errors,[e.target.name]:"Please Enter Duration in Months"});
            }
            else if(perpattern.test(e.target.value)){
                setErrors({...errors,[e.target.name]:"Characters not allowed"});
            }
            else{
                setErrors({...errors,[e.target.name]:""});
            }
        }
    }
    const handelsubmit = (e)=>{
        e.preventDefault();
        // console.log(companydata);
        if(step===1){
            if(!!!errors.email && !!!errors.fulltimectc && !!!errors.stipend && !!!errors.duration){
                //console.log(companydata);
                // console.log("Hiii dr");
                setStep(2);
            }
        }
    }

    const handelchange2 = (e)=>{
        const {name,value} = e.target;
        console.log(name+value);
        setErrors({...errors,[name]:""});
        setCompanydata({...companydata,[name]:value});
    }

    const checkcutoff = ()=>{
        if(companydata.becutoff < 0 || companydata.becutoff>100){
            setErrors({...errors,becutoff:"Should between 0 - 100"});
            return false;
        }
        if(companydata.twelfthcutoff < 0 || companydata.twelfthcutoff>100){
            setErrors({...errors,twelfthcutoff:"Should between 0 - 100"});
            return false;
        }
        if(companydata.diplomacutoff < 0 || companydata.diplomacutoff>100){
            setErrors({...errors,diplomacutoff:"Should between 0 - 100"});
            return false;
        }
        if(companydata.tenthcutoff < 0 || companydata.tenthcutoff>100){
            setErrors({...errors,tenthcutoff:"Should between 0 - 100"});
            return false;
        }
        return true;
    }

    const handelsubmit2 = (e)=>{
        e.preventDefault();
        if(checkcutoff()){
        // console.table(companydata);
        setStep(step+1);
        }
    }

    const handelchange3 = (e)=>{
        const {name,value} = e.target;
        setErrors({...errors,[name]:""});
        setCompanydata({...companydata,[name]:value});
    }

    const handelsubmit3 = (e)=>{
        e.preventDefault();
        // console.table(companydata);
        // console.log(arrivaldate[0]);
        // console.log(lastdate[0]);
        setStep(step+1);
    }

    const handelchange4 = (e)=>{
        const {name,value} = e.target;
        setErrors({...errors,[name]:""});
        setCompanydata({...companydata,[name]:value});
        if(name==="cpassword"){
            if(value !== password){
                setErrors({...errors,cpassword:"Password not matching"});
            }
            else{
                setErrors({...errors,cpassword:""});
            }
        }
    }

    const handelsubmit4 = (e)=>{
        e.preventDefault();
        if(!!!errors.cpassword){
            formsubmit();
        }
    }

    const objecttodate = (dateObject)=>{
        const padZero = (num) => num.toString().padStart(2, '0');

        const year = dateObject.getUTCFullYear();
        const month = padZero(dateObject.getUTCMonth() + 1);  // Months are zero-based
        const day = padZero(dateObject.getUTCDate());
        const hours = padZero(dateObject.getHours());
        const minutes = padZero(dateObject.getMinutes());
        const seconds = padZero(dateObject.getSeconds());

        const mysqlDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        //   const mysqlDatetime = `${year}-${month}-${day}`;
        //   const mysqlDatetime = `${hours}:${minutes}:${seconds}`;
          return mysqlDatetime;
    }

    const handelchecked = (e)=>{
        const {name,checked} = e.target;
        // console.log(e.target);
        setBranches({...branches,[name]:checked});
    }

    const formsubmit = async ()=>{
        // console.table(companydata);
        // console.log(arrivaldate);
        // console.log(lastdate);
        // console.table(branches);
        try {
            const response = await axios.post('http://localhost:5000/addcompany',{"companydata":companydata,"branches":branches,"arrivaldate":objecttodate(new Date(arrivaldate)),"lastdate":objecttodate(new Date(lastdate))});
            // console.log(response.data);
            setSalert(true);
            setPassword("");
            setArrivaldate(new Date());
            setLastdate(new Date())
            setStep(1);
            setCompanydata({
                cname : "",
                email : "",
                type : "",
                role : "",
                jd : "",
                location : "",
                fulltimectc : "",
                internship : null,
                stipend : "0",
                duration : "0",
                backlogs : "1",
                becutoff : "40",
                twelfthcutoff : "40",
                diplomacutoff : "40",
                tenthcutoff : "40",
                info : "",
                status : "active",
                cpassword : "",
            });
            setBranches({
                AIML : false,
                CSE : false,
                ISE : false,
                ECE : false,
                EEE : false,
                CV : false,
                ME : false
            })
            setTimeout(()=>{
                setSalert(false)
            },3000)
          } catch (error) {
            if(error.response.data.code === "ER_DUP_ENTRY"){
                // window.alert("Email already exist");
                setErrors({...errors,email:"Email already exist"});
                setStep(1);
            }
            // console.log(error.response.data);
          }
    }

    return(
    <div className="container-fluid">
        <div className="row  d-flex align-items-center justify-content-center">
          <div className="col-12 col-xs-12 col-sm-6 col-md-6 col-lg-5">
            {salert && <div><Alert severity='success'>Company added Successfully</Alert></div>}
            <div className="card m-1">
              <div className="card-header d-flex justify-content-center align-items-center fs-6 fw-bold">
                Add Company
              </div>
              <div className="card-body p-0">
              <div className="d-flex justify-content-center align-items-center fw-bold mt-1">
                  Step {step} of {totalSteps}
                </div>
                {step === 1 && <form className='m-3' onSubmit={handelsubmit}>
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
                    <FormControl fullWidth className='mt-3'>
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
                    <FormControl className='mt-3'>
                        <FormLabel id="internshipprovideed">Internship provided</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="internshipprovideed"
                            name="internship"
                            className='ms-3'
                            onChange={handelchange}
                        >
                            <FormControlLabel value="1" required control={<Radio />} label="Yes" />
                            <FormControlLabel value="0" required control={<Radio />} label="No" />
                        </RadioGroup>
                    </FormControl>
                    {companydata.internship === "1" && 
                    <div>
                        <TextField
                        className="col mt-3"
                        label="Internship Stipend per month in Rupees "
                        fullWidth
                        variant="outlined"
                        error={!!errors.stipend}
                        helperText={errors.stipend}
                        name="stipend"
                        // helperText="eg : ( 25 = Twenty Five Thousand Only)"
                        // required
                        value={companydata.stipend}
                        onChange={handelchange}
                        />
                        <TextField
                        className="col mt-3"
                        label="Internship Duration in Months"
                        fullWidth
                        variant="outlined"
                        name="duration"
                        error={!!errors.duration}
                        helperText={errors.duration}
                        // required
                        value={companydata.duration}
                        onChange={handelchange}
                        />
                    </div>
                    }
                    <div className='d-flex justify-content-end mt-3'>
                        <Button
                        className="col-3"
                        variant="contained"
                        type="submit"
                      >Next</Button></div>
                </form>}
                {step === 2 && <form className='m-3' onSubmit={handelsubmit2}>
                <div className='m-1'><Alert severity="warning">Percent should between 0 - 100</Alert></div>
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
                <FormControl fullWidth className='mt-3'>
                        <InputLabel id="backlogs-select">Backlogs allowed *</InputLabel>
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
                <div className='d-flex justify-content-between mt-3'>
                <Button
                    className="col-3"
                    variant="outlined"
                    color='warning'
                    onClick={()=>{setStep(step-1)}}
                    type="submit"
                    >Back</Button>

                        <Button
                        className="col-3"
                        variant="contained"
                        type="submit"
                      >Next</Button></div>
                </form>}
                {step === 3 && <form className='m-3' onSubmit={handelsubmit3}>
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
                    <FormControl fullWidth className='mt-3'>
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
                    <label htmlFor="arrivaldate" className="form-label mt-2 mb-0">Arrival Date</label><br/>
                    <Flatpickr
                    data-enable-time
                    value={arrivaldate}
                    required
                    className='mt-0 p-1 rounded border'
                    onChange={(date) => setArrivaldate(date)}
                    options={{
                        dateFormat: 'd-m-Y H:i',
                      }}
                />
                </div>
                <div className="">
                    <label htmlFor="lastdate" className="form-label mt-2 mb-0">Last Date</label><br/>
                    <Flatpickr
                    data-enable-time
                    value={lastdate}
                    className='mt-0 p-1 rounded border'
                    onChange={(date) => setLastdate(date)}
                    options={{
                        dateFormat: 'd-m-Y H:i'
                      }}
                />
                </div>
                <div className='d-flex justify-content-between mt-3'>
                <Button
                    className="col-3"
                    variant="outlined"
                    color='warning'
                    onClick={()=>{setStep(step-1)}}
                    type="submit"
                    >Back</Button>
                        <Button
                        className="col-3"
                        variant="contained"
                        type="submit"
                      >Next</Button></div>
                </form>}
                {step === 4 && <form className='m-3' onSubmit={handelsubmit4}>
                <div><Alert severity='warning'>Please share Entered E-mail and password with Company</Alert></div>
                <TextField
                    className="col mt-3"
                    label="Password"
                    fullWidth
                    variant="outlined"
                    type='password'
                    name="password"
                    // required
                    value={password}
                    onChange={(e)=>{setCompanydata({...companydata,cpassword:""});setErrors({...errors,cpassword:""});setPassword(e.target.value)}}
                    />
                <TextField
                    className="col mt-3"
                    label="Confirm password"
                    fullWidth
                    variant="outlined"
                    name="cpassword"
                    error={!!errors.cpassword}
                    helperText={errors.cpassword}
                    // required
                    value={companydata.cpassword}
                    onChange={handelchange4}
                    />
                <div className='d-flex justify-content-between mt-3'>
                <Button
                    className="col-3"
                    variant="outlined"
                    color='warning'
                    onClick={()=>{setStep(step-1)}}
                    type="submit"
                    >Back</Button>

                        <Button
                        className="col-3"
                        variant="contained"
                        type="submit"
                      >Submit</Button></div>
                </form>}
              </div>
            </div>
          </div>
        </div>
    </div>
    )
}

const Companydetails = (props) => {

    const objecttostring = (oldutcdate)=>{
        const date = new Date(oldutcdate);

        const options = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        };

        return date.toLocaleString('en-IN', options).replaceAll('/', '-');
    }
    
    const [details,setDetails] = useState(null);
    useEffect(()=>{
        const getdetails = async ()=>{
            try{
                const response = await axios.post("http://localhost:5000/getcompanydetails",{cid : props.cid});
                // console.log(response.data[0]);
                setDetails(response.data[0]);
            }
            catch(error){
                console.log(error);
            }
        }
        getdetails();
    },[props.cid])
    return <>
        {!!details && <>
            <div className='d-flex justify-content-center'>
            <div className="card m-3 w-50">
            <div className="card-header d-flex justify-content-center"><b>Company details</b></div>
            <div className='card-body p-0'>
                <div className="container-fluid row d-flex justify-content-center">
                    <div className="row border-bottom py-1">
                        <b className="col-5">Company ID : </b>
                        <div className="col-7">{details.jid}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Company Name : </b>
                        <div className="col-7">{details.cname}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Company E-mail : </b>
                        <div className="col-7">{details.email}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Company Type : </b>
                        <div className="col-7">{details.type}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Job Role : </b>
                        <div className="col-7">{details.role}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Job Description : </b>
                        <div className="col-7">{details.jd}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Temp. Job Location : </b>
                        <div className="col-7">{details.location}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Full time CTC : </b>
                        <div className="col-7">{details.fulltimectc}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Backlogs allowed : </b>
                        <div className="col-7">{details.backlogs}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">B. E. Cutoff : </b>
                        <div className="col-7">{details.becutoff}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">12th Cutoff : </b>
                        <div className="col-7">{details.twelfthcutoff}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Diploma Cutoff : </b>
                        <div className="col-7">{details.diplomacutoff}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">10th Cutoff : </b>
                        <div className="col-7">{details.tenthcutoff}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Internship provided : </b>
                        <div className="col-7">{details.internship === 1 ? "Yes" : "No"}</div>
                    </div>
                    {
                        details.internship === 1 && <>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Internship Stipend : </b>
                                <div className="col-7">{details.stipendpm}</div>
                            </div>
                            <div className="row border-bottom py-1">
                                <b className="col-5">Internship Duration : </b>
                                <div className="col-7">{details.durationinm}</div>
                            </div>
                        </>
                    }
                    <div className="row border-bottom py-1">
                        <b className="col-5">Additional info : </b>
                        <div className="col-7">{details.info}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Status : </b>
                        <div className="col-7">{details.status}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Arrival date & Time: </b>
                        <div className="col-7">{objecttostring(details.arrivaldate)}</div>
                    </div>
                    <div className="row border-bottom py-1">
                        <b className="col-5">Last date & Time: </b>
                        <div className="col-7">{objecttostring(details.lastdate)}</div>
                    </div>
                    {/* <div className="row d-flex justify-content-end border-bottom py-1">
                        <Button variant='outlined' className='w-25' color="warning">Edit</Button>
                    </div> */}
                </div>
            </div>
            </div>
            </div>
        </>}
    </>
}

const Viewcompany = () => {
    const [cnamelist, setCnamelist] = useState([]);

    useEffect(()=>{
        const getlist = async () => {
        try{
            const response = await axios.post("http://localhost:5000/getjobidandname");
            // console.log(response.data);
            setCnamelist(response.data);
        }
        catch(error){
            console.log("Error while getting list")
        }
    }
    getlist();
    },[])

    // console.log(cnamelist);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    return <>
    {cnamelist.length > 0 ? 
        <div className="container-fluid d-flex justify-content-center">
            <div className="col col-6">
                <div className="row mt-3">Search and Select by Company id or Company Name</div>
                <div className="row"><SearchableDropdown searchTerm={searchTerm} setSearchTerm={setSearchTerm} options={cnamelist} selectedOption={selectedOption} setSelectedOption={setSelectedOption}/></div>
            </div>
        </div>
        : <div className='d-flex justify-content-center align-items-center' style={{ height: '25vh' }}><CircularProgress></CircularProgress></div>}
        {!!selectedOption && <div>
        <Companydetails cid={selectedOption}/>
        </div>}
    </>
}