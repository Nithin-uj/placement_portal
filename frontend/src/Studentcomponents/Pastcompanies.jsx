import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { address } from '../Address';

export default function Pastcompanies({branch}) {
    const [companiesdetails,setCompaniesdetails] = useState("");
    useEffect(()=>{
        const getdetails = async ()=>{
            const response = await axios.post(address+'/getpastlist',{branch:branch})
            // console.log(response.data);
            setCompaniesdetails(response.data);
        }
        getdetails();
    },[])
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
        return <>Loading</>
      }

  return (
    <div className='d-flex justify-content-center'>
        <div className='d-flex flex-wrap justify-content-center'>
        {companiesdetails.length<=0 && <div className='m-3'>No data</div>}
        {companiesdetails.map((data) => (
              <div key={data.jid}>
                <div className="card m-2 shadow" style={{ width: "300px" }}>
                  {/* <div className="card-header d-flex justify-content-between">
                    <div>
                      <b>Job ID : </b>
                      {data.jid}
                      <br />
                    </div>
                  </div> */}
                  <div className="card-body p-2">
                    <div>
                      <b>Company name : </b>
                      <b>{data.cname}</b>
                    </div>
                    <div>
                      <b>Type : </b>
                      <span>{data.type}</span>
                    </div>
                    <div>
                      <b>Job role : </b>
                      {data.role}
                    </div>
                    {/* <div>
                      <b>Arrival Date : </b>
                      {objecttostring(data.arrivaldate)}
                      {data.arrivaldate}
                    </div> */}
                    <div>
                      <b>Last Date : </b>
                      {objecttostring(data.lastdate)}
                      {/* {data.arrivaldate} */}
                    </div>
                  </div>
                </div>
                </div>
            ))}
        </div>
    </div>
  )
}