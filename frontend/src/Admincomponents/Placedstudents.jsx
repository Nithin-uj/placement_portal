import { Alert, Button } from '@mui/material'
import React, { useEffect,useState } from 'react'
import SearchableDropdown from './Searchabledropdown'
import Studentdropdown from './Studentdropdown'
import axios from 'axios'
import { address } from '../Address'
import {ButtonGroup} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

export default function Placedstudents() {

  const [option,setOption] = useState(1);

  const renderoption = (option)=>{
    switch(option){
      case 1:
        return <Updateplacedstudents/>
      case 2:
        return <Placedstudentslist/>
      default :
      return <Updateplacedstudents/>
    }
  }

  return (
    <div>
       <div style={{minHeight:"350px"}}>
            <div className="d-flex justify-content-center m-1">
                <ButtonGroup
                variant="outlined"
                // style={{ width: "550px" }}
                //   className="d-none d-sm-block"
                aria-label="Basic button group"
                >
                <Button
                    variant={option === 1 ? "contained" : "outlined"}
                    className="border-primary"
                    onClick={() => {
                    setOption(1);
                    }}
                >
                    Update placed details
                </Button>
                <Button
                    variant={option === 2 ? "contained" : "outlined"}
                    className="border-primary"
                    onClick={() => {
                    setOption(2);
                    }}
                >
                    Placed student list
                </Button>
                </ButtonGroup>
            </div>
            <div>
                {renderoption(option)}
            </div>
        </div>
    </div>
  )
}

const Updateplacedstudents = ()=>{
  const [cnamelist, setCnamelist] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const [studentlist, setStudentlist] = useState(null);
  const [searchTerm2, setSearchTerm2] = useState("");
  const [selectedOption2, setSelectedOption2] = useState(null);

  const [alreadyplaced,setAlreadyplaced] = useState(false);
  const [placed,setPlaced] = useState(false);

  useEffect(() => {
    const getlist = async () => {
      try {
        const response = await axios.post(
          address+"/getjobidandname"
        );
        // console.log(response.data);
        setCnamelist(response.data);
      } catch (error) {
        console.log("Error while getting list");
      }
    };
    getlist();
  },[]);

  useEffect(() => {
    const getstudentlist = async () => {
      try {
        const response = await axios.post(
          address+"/getstudentforjid",{jid:selectedOption}
        );
        // console.log(response.data);
        setStudentlist(response.data);
      } catch (error) {
        console.log("Error while getting applied list");
      }
    };
    getstudentlist();
  },[selectedOption]);

  if(cnamelist === null){
    return <>Loading...</>
  }

  const updateplaced = async ()=>{
    console.log(selectedOption);
    console.log(selectedOption2);
    try{
      const response = await axios.post(address+'/addplacedstudent',{jid:selectedOption,usn:selectedOption2});
      // console.log(response.data);
      if(response.status === 200){
        setSelectedOption2(null)
        setSelectedOption(null)
        // console.log("Added");
        setPlaced(true);
        setTimeout(()=>{
          setPlaced(false);
        },3000)
      }
    }
    catch(error){
      if(error.response.data.code === 'ER_DUP_ENTRY'){
        setAlreadyplaced(true);
        setTimeout(()=>{
          setAlreadyplaced(false);
        },3000)
      }
    }
  }

  return (
    <div className='d-flex justify-content-center'>
      <div>
      <Alert className="m-2" severity='warning'><b>Note : </b><span>The Student must applied for the company to view in list</span></Alert>
      <b className='mx-3 mt-1'>Update placed student</b>
      <div className='d-block d-sm-flex m-2'>
        <div className='m-1'>
          <b>Select Company</b>
        <SearchableDropdown
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          options={cnamelist}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        /></div>
        {studentlist!==null && studentlist.length>0 ? 
        <div className='m-1'>
          <b>Select Student</b>
        <Studentdropdown
          searchTerm={searchTerm2}
          setSearchTerm={setSearchTerm2}
          options={studentlist}
          selectedOption={selectedOption2}
          setSelectedOption={setSelectedOption2}
        /></div> : <div className='d-flex jusstify-content-center align-items-center m-2 mt-4'>No students applied</div>}
        <div className='m-1 mt-4 d-flex justify-content-bottom'><Button variant='contained' onClick={updateplaced}>Mark student placed</Button></div>
      </div>
      {alreadyplaced && <Alert className='m-2' severity='warning'>Student already placed</Alert>}
      {placed && <Alert className='m-2'>Student placed details added</Alert>}
      </div>
    </div>
  )
}

const Placedstudentslist = ()=>{
  // getplacedstudents
  const [placeddetails,setPlaceddetails] = useState([]);
  const [studentremoved,setStudentremoved] = useState(false);

  useEffect(()=>{
    const getdetails = async ()=>{
        const response = await axios.post(address+'/getplacedstudents');
        const studentsWithSerial = response.data.map((student, index) => ({
          ...student,
          id: index + 1, // Adding a serial number
        }));
        setPlaceddetails(studentsWithSerial);
        // console.log(response.data);
    }
    getdetails();
  },[studentremoved])

  const convertdate = (olddate) => {
    const date = new Date(olddate);
    // console.log(olddate);
    const newdate = String(date.getUTCDate()+1).padStart(2, '0')+"-"+String(date.getUTCMonth()+1).padStart(2, '0')+"-"+date.getUTCFullYear();
    // console.log(newdate);
    return newdate;
  };

  const columns = [
    { field: 'id', headerName: '#', width: 20},
    { field: 'usn', headerName: 'USN', width: 100 },
    { field: 'fullname', headerName: 'Name', width: 130 },
    { field: 'cname', headerName: 'Company name', width: 130 },
    { field: 'type', headerName: 'Type', width: 60 },
    { field: 'fulltimectc', headerName: 'Fulltime CTC', width: 30 },
    { field: 'feedback', headerName: 'Feedback', width: 250 },
    { field: 'placedon', headerName: 'Placed on', width: 130,valueGetter: (params) => `${convertdate(params)}` },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleButtonClick(params)}
        >
          Remove
        </Button>
      ),
    },
  ]

  const handleButtonClick = async (params) => {
    // alert(`Button clicked for ${params}`);
    if(window.confirm("Are you sure to remove")){
      try{
        const response = await axios.post(address+'/removeplacedstudent',{usn:params.row.usn});
        if(response.status === 200){
          setStudentremoved(true);
          setTimeout(()=>{
            setStudentremoved(false);
          },3000)
        }
      }
      catch(error){
        console.log(params.row.usn);
      }
    }
  };

  return <div>
      { studentremoved && <Alert severity='error' className='m-3 mb-1'>Student removed</Alert> }
       <div className='p-2'>
        <div style={{width:"100%",height:350}}>
          <DataGrid
            rows={placeddetails}
            columns={columns}
            getRowId={(row) => row.usn}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5,10,20]}
            // checkboxSelection
          />
         </div>
       </div>
     </div>
}