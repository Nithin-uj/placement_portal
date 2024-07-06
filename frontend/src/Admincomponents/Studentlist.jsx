import * as React from 'react'; 
import {useState,useEffect} from 'react'
import { ButtonGroup,Button } from '@mui/material';
import {PieChart} from '@mui/x-charts/PieChart';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import Registrationbyadmin from './Registrationbyadmin';
import { address } from '../Address';
import Editstudent from './Editstudent';
import Switch from '@mui/material/Switch';

export default function Studetntlist() {
  const [suboption,setSuboption] = useState(1);
  const rendersuboption = ()=>{
    switch(suboption){
      case 1:
        return <Student/>;
      case 2:
        return <Registrationbyadmin/>
      case 3:
        return <Viewstudent/>
      case 4:
        return <Editstudent/>
      case 5:
        return <Studenttable/>
      default:
        return <Student/>
    }
  }
  const Studentmenu = ()=>{
    return <div>
      <div className='d-flex justify-content-center m-1 d-block d-sm-none'>
        <div class="accordion" id="accordionExample" style={{width:"max-content"}}>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button p-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                &nbsp;View options&nbsp;
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="accordion-body p-0" style={{width:"max-content"}}>
              <ButtonGroup variant="outlined" aria-label="Basic button group" orientation='vertical'>
                <Button variant={suboption === 1 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(1)}}>Student</Button>
                <Button variant={suboption === 2 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(2)}}>Add Student</Button>
                <Button variant={suboption === 3 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(3)}}>View Student</Button>
                <Button variant={suboption === 4 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(4)}}>Edit Student</Button>
                <Button variant={suboption === 5 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(5)}}>Student List</Button>
              </ButtonGroup>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='justify-content-center m-1 d-none d-sm-flex'>
      <ButtonGroup variant="outlined" aria-label="Basic button group">
      <Button variant={suboption === 1 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(1)}}>Student</Button>
      <Button variant={suboption === 2 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(2)}}>Add Student</Button>
      <Button variant={suboption === 3 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(3)}}>View Student</Button>
      <Button variant={suboption === 4 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(4)}}>Edit Student</Button>
      <Button variant={suboption === 5 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(5)}}>Student List</Button>
    </ButtonGroup></div>
  </div>
  }
  return (<div style={{minHeight:"50vh"}}>
    <div>{Studentmenu()}</div>
    <div>{rendersuboption()}</div>
    </div>
  )
};

const Student = ()=>{
  const [branchdetails,setBranchdetails] = useState([]);
  const [genderdetails,setGenderdetails] = useState([]);
  const [editcontrols,setEditcontrols] = useState(null);
  useEffect(()=>{

  const getbranch = async ()=> {
    try {
      const response = await axios.post(address+'/getbranchdetails');
      // console.log(response.data);
      function convertData(array) {
        return array.map((obj, index) => {
          return {
            id: index, // Assign index as id
            value: obj.value , // Example transformation for value
            label: obj.branch // Use branch property as label
          };
        });
      }
      // console.log(convertData(response.data));
      setBranchdetails(convertData(response.data));
    } catch (error) {
      // console.log(error);
    }
  }
  const getgender = async ()=>{
    try {
      const response = await axios.post(address+'/getgenderdetails');
      // console.log(response.data);
      function convertData(array) {
        return array.map((obj, index) => {
          if(obj.gender === 'M'){
            obj.gender = "Male"
          }
          else if(obj.gender === 'F'){
            obj.gender = "Female"
          }
          else if(obj.gender === 'O'){
            obj.gender = "Others"
          }
          return {
            id: index, // Assign index as id
            value: obj.value , // Example transformation for value
            label: obj.gender // Use branch property as label
          };
        });
      }
      setGenderdetails(convertData(response.data))
    } catch (error) {
      console.log(error);
    }
  }
  const getcontrols = async ()=>{
    try {
      const response = await axios.post(address+"/geteditcontrols")
      setEditcontrols(response.data[0].value)
    } catch (error) {
      console.log("Failed to get controls")
    }
  }

  getbranch();
  getgender();
  getcontrols();

  },[])

  const handlecontrolschange = async (e)=>{
    // console.log(e.target.checked);
    setEditcontrols(e.target.checked);
    try{
      const response = await axios.post(address+"/updatecontrols",{value:e.target.checked})
      // console.log(response.data)
    }
    catch(error){
      console.log(error);
    }
  }
  return <div>
      <div className='card m-2'>
        <b className='card-header'>Contorl panel</b>
        <div className='card-body'>
          Allow students to edit their details : 
          <Switch
          checked={editcontrols}
          onChange={handlecontrolschange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        </div>
      </div>
    <div className='m-2 d-flex flex-wrap justify-content-around'>
      <div style={{width:"max-content"}} className='rounded border m-1 overflow-scroll'>
        <b className='d-flex justify-content-center m-1'>Students by branch</b>
        <PieChart
          series={[
            {
              data: branchdetails,
            },
          ]}
          width={400}
          height={200}
        />
      </div>
      <div style={{width:"max-content"}} className='rounded border m-1 overflow-scroll'>
        <b className='d-flex justify-content-center m-1'>Students by Gender</b>
        <PieChart
          series={[
            {
              data: genderdetails,
            },
          ]}
          width={400}
          height={200}
        />
      </div>
    </div>
  </div>
}

const Viewstudent = ()=>{
  const [studentusn,setStudentusn] = useState("");
  const [error,setError] = useState("");
  const [studentdetails,setStudentdetails] = useState();
  const [studentdob,setStudentdob] = useState();
  const handelchange = (e)=>{
    setStudentusn(e.target.value);
    setStudentdetails("");
        const pattern = /^[4][N][I][2][1-4][A-Z]{2}[0-9]{3}$/;
        if(!pattern.test(e.target.value)){
        setError("Invalid USN");
        }
        else{
        setError("");
        }
  }
  const handelsubmit = (e)=>{
    e.preventDefault();
    if(!!!error){
      // console.log(studentusn);
        const getstudentdetails = async ()=> {
        try {
          const response = await axios.post(address+'/getstudentdetails',{usn:studentusn});
          if(response.data.length === 0){
            setError("No data found");
            return;
          }
          else{
          setError("")
          }

          // console.log(response.data);
          // console.log(convertData(response.data));
          setStudentdetails(response.data[0]);
          const date = new Date(response.data[0].dob);
          // const year = date.getUTCFullYear();
          // const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
          // const day = String(date.getUTCDate()).padStart(2, '0');
          setStudentdob(String(date.getUTCDate()+1).padStart(2, '0')+"-"+String(date.getUTCMonth()+1).padStart(2, '0')+"-"+date.getUTCFullYear())
        } catch (error) {
          // console.log(error);
          console.log(error.response.data);
        }
      }
      getstudentdetails();
    }
  }
  const removestudent = async ()=>{
    try{
      const response = await axios.post(address+"/removestudent",{usn:studentusn});
      if(response.status === 200){
        window.alert("Student removed");
        setStudentusn("")
        setStudentdetails(null)
      }
      }
      catch(error){
        window.alert("Failed to remove, student is 'Applied' or 'Placed' for a Company");
        // console.log(error)
      }
  }
  
  return <div className='d-flex justify-content-center'>
    <div className="card m-3">
        <form className="card-header d-flex justify-content-center p-3" onSubmit={handelsubmit}>
          <div>
        <TextField
          className="col"
          label="USN"
          variant="outlined"
          name="usn"
          value={studentusn}
          error={!!error}
          helperText={error}
          required
          onChange={handelchange}
          fullWidth        
        />
      </div>
        <Button className="m-2" type="submit" variant='contained'>Get Details</Button>
      </form>
      <div className="card-body overflow-scroll">
        {!!!studentdetails ? <div className='d-flex justify-content-center overflow-scroll'>Please Enter USN</div> : <div className='overflow-scroll'>
          <div className="container-fluid row d-flex justify-content-center" style={{width:"620px"}}>
          <div className='col-12 border rounded p-3 overflow-scroll'>
            <div className="d-flex justify-content-end"><Button variant='outlined' color='error' onClick={removestudent}>Remove student</Button></div>
            <div className="row border-bottom py-1">
              <b className="col-4">USN : </b>
              <div className="col-8">{studentdetails.usn}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">Name : </b>
              <div className="col-8">{studentdetails.fullname}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">E-mail : </b>
              <div className="col-8">{studentdetails.email}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">Date of Birth : </b>
              <div className="col-8">{studentdob}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">Gender : </b>
              <div className="col-8">{studentdetails.gender}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">Primary phno : </b>
              <div className="col-8">{studentdetails.pphno}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">Secondary phno : </b>
              <div className="col-8">{studentdetails.sphno}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">Present address : </b>
              <div className="col-8">{studentdetails.presentaddr}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">Permanent address : </b>
              <div className="col-8">{studentdetails.permanentaddr}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">B. E. passing year : </b>
              <div className="col-4">{studentdetails.bepassingyear}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">Current CGPA : </b>
              <div className="col-4">{studentdetails.ccgpa}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">Branch : </b>
              <div className="col-4">{studentdetails.branch}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">Studying year : </b>
              <div className="col-4">{studentdetails.syear}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">Studying semester : </b>
              <div className="col-4">{studentdetails.ssem}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">Studying section : </b>
              <div className="col-4">{studentdetails.section}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">Entry type : </b>
              <div className="col-4">{studentdetails.etype}</div>
            </div>
            {studentdetails.etype === "regular" && <><div>
            <div className="row border-bottom py-1">
              <b className="col-4">12th passing year : </b>
              <div className="col-4">{studentdetails.twelfthpyear}</div>
            </div><div className="row border-bottom py-1">
              <b className="col-4">12th percentage : </b>
              <div className="col-4">{studentdetails.twelfthper}</div>
            </div>
              </div></>}
              {studentdetails.etype === "diploma" && <><div>
            <div className="row border-bottom py-1">
              <b className="col-4">Diploma passing year : </b>
              <div className="col-4">{studentdetails.diplomapyear}</div>
            </div><div className="row border-bottom py-1">
              <b className="col-4">Diploma percentage : </b>
              <div className="col-4">{studentdetails.diplomaper}</div>
            </div>
              </div></>}
            <div className="row border-bottom py-1">
              <b className="col-4">10th passing year : </b>
              <div className="col-4">{studentdetails.tenthpyear}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">10th percentage : </b>
              <div className="col-4">{studentdetails.tenthper}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">Having backlog : </b>
              <div className="col-4">{studentdetails.backlog ? "Yes" : "No"}</div>
            </div>
            <div className="row border-bottom py-1">
              <b className="col-4">Resume Link: </b>
              <a className="col-8" target='_blank' href={studentdetails.resume}>{studentdetails.resume}</a>
            </div>
          </div>
          </div>
          </div>}
      </div>
    </div>
  </div>
}

const Studenttable = ()=>{

    const [studentlist,setStudentlist] = useState([]);
    const [counter,setCounter] = useState(0);

    const convertdate = (olddate) => {
      const date = new Date(olddate);
      // console.log(olddate);
      const newdate = String(date.getUTCDate()+1).padStart(2, '0')+"-"+String(date.getUTCMonth()+1).padStart(2, '0')+"-"+date.getUTCFullYear();
      // console.log(newdate);
      return newdate;
    };

    useEffect(()=>{
      const getstuddents = async ()=>{
        try {
          const response = await axios.post(address+'/getstudentlist');
          // window.alert(response.data);
          // console.log(response.data);
          const studentsWithSerial = response.data.map((student, index) => ({
            ...student,
            id: index + 1, // Adding a serial number
          }));
          setStudentlist(studentsWithSerial);
          // setStudentlist(response.data);
        } catch (error) {
          // console.log(error);
          console.log("error");
        }
      }
      getstuddents();
    },[]);

    // useEffect(() => {
    //   // Update serial numbers when studentlist changes
    //   if (studentlist.length > 0) {
    //     const updatedList = studentlist.map((student, index) => ({
    //       ...student,
    //       serial: index + 1 // Calculate serial number (index + 1)
    //     }));
    //     setStudentlist(updatedList);
    //   }
    // }, [studentlist]);

    const columns = [
    { field: 'id', headerName: '#', width: 30},
    { field: 'usn', headerName: 'USN', width: 130 },
    { field: 'fullname', headerName: 'Full Name', width: 130 },
    { field: 'email', headerName: 'E-mail', width: 150 },
    { field: 'dob', headerName: 'Date of birth', width: 130, valueGetter: (params) => `${convertdate(params)}`},
    { field: 'gender', headerName: 'Gender', width: 50 },
    { field: 'pphno', headerName: 'Primary phno', width: 130 },
    { field: 'sphno', headerName: 'Secondary phno', width: 130 },
    { field: 'bepassingyear', headerName: 'B. E. passing year', width: 80 },
    { field: 'ccgpa', headerName: 'Current CGPA', width: 80 },
    { field: 'branch', headerName: 'Branch', width: 80 },
    { field: 'syear', headerName: 'Studying year', width: 80 },
    { field: 'ssem', headerName: 'Studying Sem', width: 80 },
    { field: 'etype', headerName: 'Entry type', width: 80 },
    { field: 'twelfthpyear', headerName: 'Twelfth passing year', width: 80 },
    { field: 'twelfthper', headerName: 'Twelfth percentage', width: 80 },
    { field: 'diplomapyear', headerName: 'Diploma passing year', width: 80 },
    { field: 'diplomaper', headerName: 'Diploma percentage year', width: 80, valueGetter: (params) =>{if(params<0) return 0; return params}},
    { field: 'tenthpyear', headerName: 'Tenth passing year', width: 80 },
    { field: 'tenthper', headerName: 'Tenth Percentage', width: 80 },
    { field: 'backlog', headerName: 'Has Backlog', width: 80 },
    // { field: 'resume', headerName: 'Resume', width: 80 },
    {
      field: 'resume',
      headerName: 'Resume',
      width: 200,
      renderCell: (params) => (
        <a href={params.value} target="_blank">
          {params.value}
        </a>
      ),
    },
  ];
  

  return (
    <div className='m-3'>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={studentlist}
        columns={columns}
        getRowId={(row) => row.usn}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
      />
    </div>
    </div>
    
  );
}