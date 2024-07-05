import React, { useEffect, useState } from 'react'
import { address } from '../Address';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { exportToExcel } from './exportToExcel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function Studentspercompany({jid}) {

    const dateformat = (isodate)=>{
        const date = new Date(isodate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
    
    const Displaystudents = ()=>{
        const [studentdetails,setStudentdetails] = useState([]);

        const columns = [
            { field: 'id', headerName: '#', width: 30},
            { field: 'usn', headerName: 'USN', width: 130 },
            { field: 'fullname', headerName: 'Full Name', width: 130 },
            { field: 'gender', headerName: 'Gender', width: 50 },
            { field: 'syear', headerName: 'Studying year', width: 80 },
            { field: 'branch', headerName: 'Branch', width: 80 },
            { field: 'semail', headerName: 'E-mail', width: 150 },
            // { field: 'dob', headerName: 'Date of birth', width: 130, valueGetter: (params) => `${convertdate(params)}`},
            { field: 'pphno', headerName: 'Primary phno', width: 130 },
            // { field: 'sphno', headerName: 'Secondary phno', width: 130 },
            { field: 'bepassingyear', headerName: 'B. E. passing year', width: 80 },
            { field: 'ccgpa', headerName: 'Current CGPA', width: 80 },
            // { field: 'ssem', headerName: 'Studying Sem', width: 80 },
            // { field: 'etype', headerName: 'Entry type', width: 80 },
            // { field: 'twelfthpyear', headerName: 'Twelfth passing year', width: 80 },
            // { field: 'twelfthper', headerName: 'Twelfth percentage', width: 80 },
            // { field: 'diplomapyear', headerName: 'Diploma passing year', width: 80 },
            // { field: 'diplomaper', headerName: 'Diploma percentage year', width: 80, valueGetter: (params) =>{if(params<0) return 0; return params}},
            // { field: 'tenthpyear', headerName: 'Tenth passing year', width: 80 },
            // { field: 'tenthper', headerName: 'Tenth Percentage', width: 80 },
            // { field: 'backlog', headerName: 'Has Backlog', width: 80 },
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

        useEffect(()=>{
            const getstudentdetails = async ()=>{
                const response = await axios.post(address+'/studentspercompany',{jid:jid});
                if(response.status === 200){
                    // console.log(response.data);
                    const studentsWithSerial = response.data.map((student, index) => ({
                        ...student,
                        id: index + 1,
                      }));
                      setStudentdetails(studentsWithSerial);
                }
            }
            getstudentdetails();
        },[])

        const handlesheetclick = () => {
            if(studentdetails.length>0){
                const filteredData = studentdetails.map(({ id,appliedat,usn,fullname,semail,dob,gender,pphno,sphno,presentaddr,permanentaddr,bepassingyear,ccgpa,branch,syear,ssem,section,etype,twelfthpyear,twelfthper,diplomapyear,diplomaper,tenthpyear,tenthper,backlog,resume}) => ({ id,appliedat:dateformat(appliedat),usn,fullname,semail,dob:dateformat(dob),gender,pphno,sphno,presentaddr,permanentaddr,bepassingyear,ccgpa,branch,syear,ssem,section,etype,twelfthpyear,twelfthper,diplomapyear,diplomaper,tenthpyear,tenthper,backlog,resume }));
                exportToExcel(filteredData, studentdetails[0].cname+"_responses");
            }
            else{
                window.alert("No Students found")
            }
        }

        
        return <div style={{width:"100%"}}>
            Download spreadsheet for detailed resopnse
            <div className='d-flex justify-content-end'><Button onClick={handlesheetclick}>Download spread sheet</Button></div>
            <div>
             <DataGrid
            autoHeight
            rows={studentdetails}
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
    }

  return (
        <div>
        <Accordion className='border shadow-none rounded mb-2'>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <b>Applied student details</b>
          </AccordionSummary>
          <AccordionDetails>
            <Displaystudents/>
          </AccordionDetails>
        </Accordion>
      </div>
  )
}

export default Studentspercompany;