import * as React from 'react'; 
import {useState,useEffect} from 'react'
import { ButtonGroup,Button } from '@mui/material';
import {PieChart} from '@mui/x-charts/PieChart';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { DataGrid } from '@mui/x-data-grid';
import Registration from '../Registration';

export default function Studetntlist() {
  const [suboption,setSuboption] = useState(1);
  const rendersuboption = ()=>{
    switch(suboption){
      case 1:
        return <Student/>;
      case 2:
        return <Registration/>
      case 3:
        return <Viewstudent/>
      case 4:
        return <div>case3</div>
      case 5:
        return <Studenttable/>
      default:
        return <Student/>
    }
  }
  const Studentmenu = ()=>{
    return <div className='d-flex justify-content-center m-1'>
    <ButtonGroup variant="outlined" aria-label="Basic button group">
    <Button variant={suboption === 1 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(1)}}>Student</Button>
    {/* <Button variant={suboption === 2 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(2)}}>Add Student</Button> */}
    <Button variant={suboption === 3 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(3)}}>View Student</Button>
    {/* <Button variant={suboption === 4 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(4)}}>Edit Student</Button> */}
    <Button variant={suboption === 5 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(5)}}>Student List</Button>
  </ButtonGroup></div>
  }
  return (<div>
    <div>{Studentmenu()}</div>
    <div>{rendersuboption()}</div>
    </div>
  )
};

const Student = ()=>{
  const [branchdetails,setBranchdetails] = useState([]);
  const [genderdetails,setGenderdetails] = useState([]);
  useEffect(()=>{
    const getbranch = async ()=> {
    try {
      const response = await axios.post('http://localhost:5000/getbranchdetails');
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
      const response = await axios.post('http://localhost:5000/getgenderdetails');
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

  getbranch();
  getgender();
  },[])
  return <div className='m-2 d-flex flex-wrap justify-content-around'>
    <div style={{width:"max-content"}} className='rounded border m-1'>
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
    <div style={{width:"max-content"}} className='rounded border m-1'>
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
          const response = await axios.post('http://localhost:5000/getstudentdetails',{usn:studentusn});

          if(response.data.length === 0){
            setError("No data found");
            return;
          }
          else{
          setError("")
          }

          console.log(response.data);
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
  return <div className='d-flex justify-content-center'>
    <div className="card m-3">
        <form className="card-header d-flex justify-content-center p-3" onSubmit={handelsubmit}>
          <div>
        <TextField
          className="col"
          label="USN"
          variant="outlined"
          name="usn"
          error={!!error}
          helperText={error}
          required
          onChange={handelchange}
          fullWidth        
        />
      </div>
        <Button className="m-2" type="submit" style={{height:"35px"}} variant='contained'>Get Details</Button>
      </form>
      <div className="card-body overflow-scroll" style={{width:"620px"}}>
        {!!!studentdetails ? <div className='d-flex justify-content-center'>Please Enter USN</div> : <div>
          <div className="container-fluid row d-flex justify-content-center">
          <div className='col-12 border rounded p-3 overflow-scroll'>
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
          const response = await axios.post('http://localhost:5000/getstudentlist');
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
    <div className='m-5'>
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