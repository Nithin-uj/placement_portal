import React,{ useState,useEffect } from "react";
import { address } from "../Address";
import axios from "axios";
import { Box,CircularProgress } from "@mui/material";

export default function Studentprofile ({usn}){
    const [studentdetails,setStudentdetails] = useState(null);
    const objecttostring = (oldutcdate) => {
        const date = new Date(oldutcdate);
    
        const options = {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        //   hour: "2-digit",
        //   minute: "2-digit",
        };
    
        return date.toLocaleString("en-IN", options).replaceAll("/", "-");
      };

    useEffect(()=>{
        const getstudentdetails = async ()=> {
            try {
              const response = await axios.post(address+'/getstudentdetails',{usn:usn});
                  setStudentdetails(response.data[0])
            //   console.log(response.data[0]);
            } catch (error) {
              console.log("Failed to get data");
            }
          }
          getstudentdetails();
    },[usn])

    if(studentdetails === null){
        return <Box sx={{ display: 'flex',height:"100%" }} className="align-items-center justify-content-center">
        <CircularProgress className='m-5'/>
        </Box>;
    }
    
    return <div className='d-flex container-fluid justify-content-center p-3'>
        <div className="col col-12 col-sm-8 shadow">
            <div className="row m-0 p-0">
                <div className="card m-0 p-0">
                    <b className="card-header d-flex justify-content-center p-2" >
                        Your details
                    </b>
                    <div className="card-body overflow-scroll p-0">
                    <div className='overflow-scroll'>
                        <div className="container-fluid row d-flex justify-content-center m-0 p-0" style={{minWidth:"530px"}}>
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
                            <div className="col-8">{objecttostring(studentdetails.dob)}</div>
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
                            {studentdetails.etype === "lateral" && <><div>
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
                            <a className="col-8" target='_blank' rel="noreferrer" href={studentdetails.resume}>{studentdetails.resume}</a>
                        </div>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  }