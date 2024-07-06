import React, { useEffect, useState } from 'react'
import { Button,ButtonGroup } from '@mui/material';
import { address } from '../Address';
import axios from 'axios'
import Viewcompanydetails from './Viewcompanydetails';
import CurrentStatus from './CurrentStatus';
import Upcomingcompanies from './Upcomingcompanies';
import Pastcompanies from './Pastcompanies';
import TableRowsIcon from '@mui/icons-material/TableRows';
import {Box,CircularProgress} from '@mui/material';

export default function Companies({usn}) {
    // console.log(usn);
    const [option,setOption] = useState(1);
    return (
        <div style={{minHeight:"250px"}}>
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
                    Apply for companies
                </Button>
                <Button
                    variant={option === 3 ? "contained" : "outlined"}
                    className="border-primary"
                    onClick={() => {
                    setOption(3);
                    }}
                >
                    Current Status
                </Button>
                </ButtonGroup>
            </div>
            <div>
                {renderoption(option,usn)}
            </div>
        </div>
    )
}

const renderoption = (option,usn)=>{
    switch(option){
        case 1:
            return <Accordation usn={usn}/>
        case 2:
            return <>upcomming companies</>
        case 3:
            return <CurrentStatus usn={usn}/>
        default:
            return <>view companies</>
    }
}

const Accordation = ({usn})=>{
    const [branch,setBranch]=useState("");
    useEffect(()=>{
        const getdetails = async ()=>{
            try{
            const response = await axios.post(address+"/getstudentbranch",{usn:usn});
                // console.log(response.data[0])
                // if(response.status===200){
                //     const response2 = await axios.post(address+"/getappliablelist",{sbranch:response.data[0].branch});
                //     console.log(response2.data)
                // }
                setBranch(response.data[0].branch)
            }
            catch(error){
                console.log("Error while getting student details");
                // console.log(error)
            }
        }
        getdetails();
    },[usn])

    if(!!!branch){
        return <Box sx={{ display: 'flex',height:"100%" }} className="align-items-center justify-content-center">
        <CircularProgress className='m-5'/>
        </Box>;
    }

    return <div className='px-1'>
        <div className="accordion my-3" id="accordionExample">

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button p-2"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    <b>Companies</b>
                  </button>
                </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample"
                  >
                  <div className="accordion-body p-0">
                    <Appliablelist branch={branch} usn={usn}/>
                  </div>
                </div>
              </div>

              {/* <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button collapsed p-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <b>Applied companies</b>
                </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body p-0">
                    <Appliedlist usn={usn}/>
                </div>
                </div>
              </div> */}

              <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button collapsed p-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    <b>Upcoming companies</b>
                </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body p-0">
                    <Upcomingcompanies branch={branch}/>
                </div>
                </div>
            </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                <button className="accordion-button collapsed p-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    <b>Past companies</b>
                </button>
                </h2>
                <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body p-0">
                    <Pastcompanies branch={branch}/>
                </div>
                </div>
            </div>

        </div>
    </div>
}

const Appliablelist = ({branch,usn})=>{

    const [companiesdetails,setCompaniesdetails] = useState("");
    const [studentdetails,setStudentdetails] = useState("");
    const [viewcompany,setViewcompany] = useState("");
    const [toogle,setToogle] = useState(false);

    const getdetails = async ()=>{
        try{
            const response = await axios.post(address+"/getappliablelist",{sbranch:branch,usn:usn});
            const response2 = await axios.post(address+"/getstudentdetails",{usn:usn});
            // console.log(response.data);
            setCompaniesdetails(response.data);
            setStudentdetails(response2.data[0]);
        }
        catch(error){
            console.log("Error while getting details");
            console.log(error)
        }
    }

    useEffect(()=>{
      const getinitdetails = async ()=>{
        try{
            const response = await axios.post(address+"/getappliablelist",{sbranch:branch,usn:usn});
            const response2 = await axios.post(address+"/getstudentdetails",{usn:usn});
            // console.log(response.data);
            setCompaniesdetails(response.data);
            setStudentdetails(response2.data[0]);
        }
        catch(error){
            console.log("Error while getting details");
            console.log(error)
        }
    }
        getinitdetails();
    },[branch,usn])

    const applyforcompany = (jid)=>{
        // console.log(jid);
        const applyforjob =  async()=>{
          try{
            const response = await axios.post(address+'/applyforjob',{jid:jid,usn:usn});
            // console.log(response.data);
            if(response.data === 'Applied'){
              setToogle(!toogle);
              getdetails();
            }
          }
          catch(error){
            console.log("Failed to apply")
          }
        }
        applyforjob();
    }

    const objecttostring = (oldutcdate) => {
        const date = new Date(oldutcdate);
        const options = {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
    
        return date.toLocaleString("en-IN", options).replaceAll("/", "-");
      };

    if(!!!companiesdetails){
        return <Box sx={{ display: 'flex',height:"100%" }} className="align-items-center justify-content-center">
        <CircularProgress className='m-5'/>
        </Box>
    }

    if(!!!studentdetails){
      return <>Loading...</>
  }

    if(!!viewcompany){
        return <>
            <Button onClick={()=>{setViewcompany("")}}>Back</Button>
            <Viewcompanydetails jid={viewcompany}/>
        </>
    }

    return <div>
            <div className="d-flex flex-wrap justify-content-center">
            {companiesdetails.length<=0 && <div className='m-5'>
          <div className="d-flex justify-content-center"><TableRowsIcon color="disabled" sx={{ fontSize: 40 }}/></div>
          <div class="text-secondary">No Data</div>
          </div>}
            {/* {console.table(studentdetails)}
            {console.log(companiesdetails)} */}
            {companiesdetails.map((data) => (
              <div key={data.jid}>
                {/* {data.jid} */}
                <div className="card m-2 shadow" style={{ width: "300px" }}>
                  <div className="card-header d-flex justify-content-between">
                    <div>
                      <b>Job ID : </b>
                      {data.jid}
                      <br />
                    </div>
                  </div>
                  <div className="card-body p-2">
                    <div>
                      <b>Company name : </b>
                      <b>{data.cname}</b>
                    </div>
                    <div>
                      <b>Type : </b>
                      {data.type}
                    </div>
                    <div>
                      <b>Job role : </b>
                      {data.role}
                    </div>
                    <div>
                      <b>Full time CTC : </b>
                      <span className='text-success'>{data.fulltimectc}</span> LPA
                    </div>
                    <div>
                      <b>Arrival Date : </b>
                      {objecttostring(data.arrivaldate)}
                      {/* {data.arrivaldate} */}
                    </div>
                    <div>
                      <b>Last Date : </b>
                      {objecttostring(data.lastdate)}
                      {/* {data.lastdate} */}
                    </div>
                    <div className='d-flex justify-content-between'>
                      <Button size="small" onClick={()=>{setViewcompany(data.jid)}} variant='outlined' color="warning">View details</Button>

                      {checkeligible(data,studentdetails) === "Eligible" ? (
                        <div>
                          {data.astatus === 'not applied' && <Button size="small" variant='contained' onClick={()=>{applyforcompany(data.jid)}}>Apply</Button>}
                          {data.astatus === 'applied' && <div className='text-success'>Applied</div>}
                        </div>
                      ):<div className='text-danger'>Not Eligible</div>}
                      
                    </div>
                  </div>
                </div>
                </div>
            ))}
          </div>
    </div>
}

function checkeligible(data,studentdetails) {
    if(studentdetails.ccgpa*10<data.becutoff){
      return "Not eligible / CGPA";
    }
    else if(studentdetails.tenthper<data.tenthcutoff){
      return "Not eligible / 10th";
    }
    else{
      if(studentdetails.etype === "regular"){
        if(studentdetails.twelfthper<data.twelfthcutoff){
          return "Not eligible / 12th";
        }
      }
      else{
      if(studentdetails.diplomaper<data.diplomacutoff){
          return "Not eligible / Diploma";
        }
      }
    }
    return "Eligible";
}

