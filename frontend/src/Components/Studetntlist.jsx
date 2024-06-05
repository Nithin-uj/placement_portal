import * as React from 'react'; 
import {useState,useEffect} from 'react'
import { ButtonGroup,Button } from '@mui/material';
import {PieChart} from '@mui/x-charts/PieChart';
import axios from 'axios';
import TextField from '@mui/material/TextField';

export default function Studetntlist() {
  const [suboption,setSuboption] = useState(1);
  const rendersuboption = ()=>{
    switch(suboption){
      case 1:
        return <Student/>;
      case 2:
        return <Viewstudent/>
      case 3:
        return <div>case3</div>
      case 4:
        return <div>case4</div>
      default:
        return <Student/>
    }
  }
  const Studentmenu = ()=>{
    return <div className='d-flex justify-content-center m-1'>
    <ButtonGroup variant="outlined" aria-label="Basic button group">
    <Button variant={suboption === 1 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(1)}}>Student</Button>
    <Button variant={suboption === 2 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(2)}}>View Student</Button>
    <Button variant={suboption === 3 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(3)}}>Edit Student</Button>
    <Button variant={suboption === 4 ? 'contained' : 'outlined'} onClick={()=>{setSuboption(4)}}>Student List</Button>
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
  const handelchange = (e)=>{
    setStudentusn(e.target.value);
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
      console.log(studentusn);
    }
  }
  return <div>
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
      <div className="card-body">
        Hello
      </div>
    </div>
  </div>
}
const Studenttable = ()=>{
  return <div>Studenttable</div>
}