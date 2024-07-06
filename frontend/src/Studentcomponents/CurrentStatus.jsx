import React, { useEffect, useState } from "react"
import Viewappliedcompanies from "./Viewappliedcompanies"
import Box from '@mui/material/Box';
import { address } from "../Address";
import axios from "axios";
import { Alert, TextField } from "@mui/material";
import {Button} from "@mui/material";

export default function CurrentStatus ({usn}){
    const [placed,setPlaced] = useState("")
    const [cdetails,setCdetails] = useState(null);
    useEffect(()=>{
        const getplaceddeetails = async ()=>{
            try {
                const response = await axios.post(address+"/getplaceddetails",{usn:usn});
                // console.log(response.data[0]);
                setCdetails(response.data[0]);
                if(response.data.length>0){
                    setPlaced(true);
                }
                else{
                    setPlaced(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getplaceddeetails();
    },[usn])

    const Feedback = ()=>{
        const [newfeedback,setNewfeedback] = useState("");
        const handelfeedback = async ()=>{
            // console.log(newfeedback);
            try {
                const response = await axios.post(address+'/updatefeedback',{usn:usn,feedback:newfeedback});
                if(response.status === 200){
                    window.alert("Feedback updated");
                    setCdetails({...cdetails,feedback:newfeedback});
                }
            } catch (error) {
                console.log("Error while updating feedback")
            }
        }
        if(!!cdetails.feedback){
            return <div className="m-3"><b style={{width:"max-content"}}><span>Your Feedback : </span></b><div>{cdetails.feedback}</div></div>
        }
        else{
            return <div className="mt-3">
            <Alert severity="warning"><b>Note : </b><span>This is one time feedback / can't be updated in future</span></Alert>    
            <b>Your Feedback : </b>
            <TextField
            fullWidth
            value={newfeedback}
            onChange={
                (e)=>{
                    setNewfeedback(e.target.value);
                }
            }
            multiline
            />
            <div className="d-flex justify-content-end"><Button variant="contained" className="mt-2" onClick={handelfeedback}>Submit</Button></div>outlined
            </div>;
        }
    }


    return  <div>
        <div className="m-2">
        {placed ? <><Placedcompany cdetails={cdetails}/><Feedback/></> : 
        <Box component="section" sx={{ p:2, border: '1px dashed grey' }}>
            <div>No data or Not yet placed in any company</div>
        </Box>}
        </div>
        <div className="accordion my-3 mx-2" id="accordionExample">
        <div className="accordion-item">
        <h2 className="accordion-header">
        <button className="accordion-button collapsed p-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <b>History / Applied companies</b>
        </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
        <div className="accordion-body p-0">
            <Viewappliedcompanies usn={usn}/>
        </div>
        </div>
    </div>
  </div>
  </div>
}

const Placedcompany = ({cdetails})=>{
    return <div className="d-flex justify-content-center">
        <Box component="section" sx={{ p: 2, border: '1px dashed grey',maxWidth:'400px' }}>
        <b>You are placed in the following company</b>
            <div className="card-body p-2">
            <div>
                <b>Job ID : </b>
                {cdetails.jid}
            </div>
            <div>
                <b>Company name : </b>
                <b>{cdetails.cname}</b>
            </div>
            <div>
                <b>Type : </b>
                {cdetails.type}
            </div>
            <div>
                <b>Job role : </b>
                {cdetails.role}
            </div>
            <div>
                <b>Full time CTC : </b>
                <span className="text-success">{cdetails.fulltimectc}</span> LPA
            </div>
            </div>
        </Box>
    </div>
}