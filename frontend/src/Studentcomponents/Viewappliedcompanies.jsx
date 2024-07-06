import React, { useEffect } from "react";
import { useState } from "react";
import { address } from "../Address";
import axios from 'axios';
import { Button } from "@mui/material";
import Viewcompanydetails from "./Viewcompanydetails";
import {Box,CircularProgress} from "@mui/material";

export default function Viewappliedcompanies({usn}){
    const [companiesdetails,setCompaniesdetails] = useState("");
    const [viewcompany,setViewcompany] = useState("");
    const [nodata,setNodata] = useState(false);

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

    useEffect(()=>{
        const getdetails = async ()=>{
            // console.log("rerendering")
            try{
                const response = await axios.post(address+"/getappliedlist",{usn:usn});
                if(response.data.length<=0){
                    setNodata(true);
                }
                else{
                    setNodata(false);
                    // console.log(response.data);
                    setCompaniesdetails(response.data);
                }
            }
            catch(error){
                console.log("Error while getting company details");
                console.log(error)
            }
        }
        getdetails();
    },[])

    if(nodata){
        return <div className="d-flex justify-content-center m-3">No data or Company may closed the application</div>
    }

    if(!!!companiesdetails){
        return <Box sx={{ display: 'flex',height:"100%" }} className="align-items-center justify-content-center">
        <CircularProgress className='m-5'/>
        </Box>
    }

    if(!!viewcompany){
        return <>
            <Button onClick={()=>{setViewcompany("")}}>Back</Button>
            <Viewcompanydetails jid={viewcompany}/>
        </>
    }

    return <div>
            <div className="d-flex flex-wrap justify-content-center">
            {companiesdetails.length<=0 && <div className='m-3'>No data</div>}
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
                      <b>Job role : </b>
                      {data.role}
                    </div>
                    <div>
                      <b>Arriavl Date : </b>
                      {objecttostring(data.arrivaldate)}
                      {/* {data.arrivaldate} */}
                    </div>
                    <div>
                      <b>Last Date : </b>
                      {objecttostring(data.lastdate)}
                      {/* {data.lastdate} */}
                    </div>
                    <div>
                      <b>Applied at : </b>
                      {objecttostring(data.appliedat)}
                      {/* {data.lastdate} */}
                    </div>
                    <div className='d-flex justify-content-between'>
                      {new Date() <= new Date(data.lastdate) ? <>
                      <Button onClick={()=>{setViewcompany(data.jid)}} variant='outlined' color="warning">View details</Button>
                      </> : <></>}
                    </div>
                  </div>
                </div>
                </div>
            ))}
          </div>
    </div>

}